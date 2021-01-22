/*
 * Session wrapper around the CH Session Handler
 */
const Redis = require('ioredis');
const { Session, SessionStore } = require('ch-node-session-handler');
const logger = require(`${serverRoot}/config/winston`);
const Utility = require(`${serverRoot}/lib/Utility`);

class AppSession {
  constructor (req, res) {
    this.req = req;
    this.res = res;
    this._setUp();
  }

  /**
   * Remember to switch to the __SID cookie once the service is behind Login
   */
  _setUp () {
    try {
      if (typeof this.req.cookies.PSC_SID !== 'undefined') {
        this.id = this.req.cookies.PSC_SID;
      } else if (typeof this.res.locals.session !== 'undefined') {
        this.id = this.res.locals.session.id;
      } else {
        this.id = `PSC_${Utility.getRandomString(24, 36)}`;
        this.res.cookie('PSC_SID', this.id, { httpOnly: true, domain: `${process.env.NODE_COOKIE_DOMAIN}`, path: '/' });
      }
      this.cookie = { sessionId: this.id, signature: `${process.env.COOKIE_SECRET}` };
    } catch (err) {
      Utility.logException(err);
    }
  }

  getSessionStore () {
    if (!this.sessionStore) {
      this.sessionStore = new SessionStore(new Redis(`redis://${process.env.CACHE_SERVER}`));
    }
    return this.sessionStore;
  }

  /**
   * Read in session data
   *
   * @return {Promise<any, any>}
   */
  read () {
    logger.info('Request to read from session');
    return new Promise((resolve, reject) => {
      try {
        const s = this.getSessionStore();
        s.load(this.cookie).run()
          .then(data => {
            const session = new Session(data.extract());
            const r = session.getExtraData(this.id);
            const p = typeof r.__value === 'undefined' || typeof r.__value[this.id] === 'undefined' ? {} : r.__value[this.id];
            // accountData to be added when the app is behind sign in
            const d = Object.keys(p).length !== 0 ? p : { id: this.id, appData: {}, accountData: {} };
            return resolve(d);
          }).catch(err => {
            Utility.logException(err);
            return reject(err);
          });
      } catch (err) {
        Utility.logException(err);
        reject(err);
      }
    });
  }

  /**
   * Write to the session object
   *
   * @param {object} value - the value to save against the App session key
   * @return {Promise<any, any>}
   */
  write (value) {
    logger.info('Request to write to session, with data: ', value);
    return new Promise((resolve, reject) => {
      try {
        const s = this.getSessionStore();
        s.load(this.cookie).run()
          .then(data => {
            const session = new Session(data.extract());
            session.saveExtraData(this.id, value);
            s.store(this.cookie, session.data).run()
              .then(_ => {
                return resolve(true);
              }).catch(err => {
                Utility.logException(err);
                return reject(err);
              });
          }).catch(err => {
            Utility.logException(err);
            return reject(err);
          });
      } catch (err) {
        Utility.logException(err);
        reject(err);
      }
    });
  }
}
module.exports = AppSession;
