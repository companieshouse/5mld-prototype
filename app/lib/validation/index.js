const errorManifest = require(`${serverRoot}/lib/errors/error_manifest`).validation;
const logger = require(`${serverRoot}/config/winston`);

class Validator {

  constructor() {
    this.errors = {};
    this.payload = {};
  }

  _getErrorSignature () {
    return {
      status: 400,
      code: 'VALIDATION_ERRORS',
      message: errorManifest.default.summary,
      stack: {}
    }
  }

  isValidObligedEntityType(payload, validTypes) {
    logger.info(`Request to validate selected obliged entity type: ${payload}`);
    let errors = this._getErrorSignature();
    return new Promise((resolve, reject) => {
      if(typeof payload.obligedEntityType === 'undefined' ||  !validTypes.includes(payload.obligedEntityType)){
        errors.stack.obligedEntityType = errorManifest.obligedEntityType.blank;
        reject(errors);
      } else {
        resolve(true);
      }
    });
  }

  isValidEmail(email) {
    logger.info(`Request to validate email: ${email}`);
    let errors = this._getErrorSignature();
    return new Promise((resolve, reject) => {
      let validEmailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]+$/);
      if(typeof email === 'undefined' || email === null || email.length === 0){
        errors.stack.email = errorManifest.email.blank;
        reject(errors);
      } else if(!validEmailRegex.test(email)) {
        errors.stack.email = errorManifest.email.incorrect;
        reject(errors);
      } else {
        resolve(true);
      }
    });
  }

  isTextareaNotEmpty(text) {
    logger.info(`Request to validate discrepancy details: ${text}`);
    let errors = this._getErrorSignature();
    return new Promise((resolve, reject) => {
      let notEmptyRegex = new RegExp(/[a-zA-Z]+/);
      if(typeof text === "undefined" || text === null || !notEmptyRegex.test(text)) {
        errors.stack.details = errorManifest.details;
        reject(errors);
      } else {
        resolve(true);
      }
    });
  }

  isCompanyNumberFormatted(number, statusCode) {
    logger.info(`Request to validate company number: ${number}`);
    let errors = this._getErrorSignature();
    return new Promise((resolve, reject) => {
      if(typeof number === "undefined" || number === null || number.length === 0) {
        errors.stack.number = errorManifest.number.empty;
        reject(errors);
      } else if (number.length !== 8) {
        errors.stack.number = errorManifest.number.incorrect;
        reject(errors);
      } else if (statusCode === 404) {
        errors.stack.number = errorManifest.number.doesntExist;
        reject(errors);
      } else {
        resolve(true);
      }
    });
  }

  isValidContactName(contactName) {
    logger.info(`Request to validate contact name: ${contactName}`);
    let errors = this._getErrorSignature();
    return new Promise((resolve, reject) => {
      let validNameRegex = new RegExp(/^[AÀÁÂÃÄÅĀĂĄǺaàáâãäåāăąǻÆǼæǽBbCcçćĉċčDÞĎĐdþďđEÈÉÊËĒĔĖĘĚeèéêëēĕėęěFfGĜĞĠĢgĝğġģHĤĦhĥħIÌÍÎÏĨĪĬĮİiìíîïĩīĭįJĴjĵKĶkķLĹĻĽĿŁlĺļľŀłMmNÑŃŅŇŊnñńņňŋOÒÓÔÕÖØŌŎŐǾoòóôõöøōŏőǿŒœPpQqRŔŖŘrŕŗřSŚŜŞŠsśŝşšTŢŤŦtţťŧUÙÚÛÜŨŪŬŮŰŲuùúûüũūŭůűųVvWŴẀẂẄwŵẁẃẅXxYỲÝŶŸyỳýŷÿZŹŻŽzźżž&@£$€¥*=#%+‘ʼ'()\/\[\]{}<>!«»?“ˮ\"0123456789.,:;\–\-  \\r\\n]*$/);
      if(typeof contactName === 'undefined' || contactName === null || contactName.trim().length === 0) {
        errors.stack.fullName = errorManifest.fullName.empty;
        reject(errors);
      } else if(!validNameRegex.test(contactName)) {
        errors.stack.fullName = errorManifest.fullName.incorrect;
        reject(errors);
      } else {
        resolve(true);
      }
    });
  }

  isValidOrganisationName(organisationName) {
    logger.info(`Request to validate contact name: ${organisationName}`);
    let errors = this._getErrorSignature();
    return new Promise((resolve, reject) => {
      let validNameRegex = new RegExp(/^[AÀÁÂÃÄÅĀĂĄǺaàáâãäåāăąǻÆǼæǽBbCcçćĉċčDÞĎĐdþďđEÈÉÊËĒĔĖĘĚeèéêëēĕėęěFfGĜĞĠĢgĝğġģHĤĦhĥħIÌÍÎÏĨĪĬĮİiìíîïĩīĭįJĴjĵKĶkķLĹĻĽĿŁlĺļľŀłMmNÑŃŅŇŊnñńņňŋOÒÓÔÕÖØŌŎŐǾoòóôõöøōŏőǿŒœPpQqRŔŖŘrŕŗřSŚŜŞŠsśŝşšTŢŤŦtţťŧUÙÚÛÜŨŪŬŮŰŲuùúûüũūŭůűųVvWŴẀẂẄwŵẁẃẅXxYỲÝŶŸyỳýŷÿZŹŻŽzźżž&@£$€¥*=#%+'ʼ'()\/\[\]{}<>!«»?"ˮ\"0123456789.,:;\–\-  \\r\\n]{1,160}$/);
      if(typeof organisationName === 'undefined' || organisationName === null || organisationName.trim().length === 0) {
        errors.stack.organisationName = errorManifest.organisationName.empty;
        reject(errors);
      } else if(!validNameRegex.test(organisationName)) {
        errors.stack.organisationName = errorManifest.organisationName.incorrect;
        reject(errors);
      } else {
        resolve(true);
      }
    });
  }

  isValidPscName (payload, pscs) {
    logger.info(`Request to validate PSC name with hash key: ${payload.pscName}`);
    let errors = this._getErrorSignature();
    errors.stack.pscName = errorManifest.pscName.empty;
    return new Promise((resolve, reject) => {
      try {
        if(typeof payload.pscName === 'undefined') {
          reject(errors);
        } else if(payload.pscName === 'PSC missing') {
          resolve(true);
        } else if(typeof pscs[payload.pscName] === 'undefined') {
          reject(errors);
        } else {
          resolve(true);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Validator;
