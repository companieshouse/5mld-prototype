module.exports = function (router) {
  // List of all PSC's
  router.get('/discrepancy-details/psc-names', function (req, res) {
    res.render('discrepancy-details/psc-names', {
      psc: req.session.psc,
      company: req.session.company
    })
  })

  router.post('/discrepancy-details/psc-names', function (req, res) {
    var errors = []
    var pscType = req.body.psc

    if (typeof req.body.psc === 'undefined') {
      errors.push({
        text: 'Select the PSC with the discrepancy, or if a PSC is missing',
        href: '#psc'
      })
      res.render('discrepancy-details/psc-names', {
        errorPSC: true,
        errorList: errors,
        psc: req.session.psc,
        company: req.session.company
      })
      return
    } else {
      var request = require('request')
      var apiKey = process.env.CHS_API_KEY
      var options = {
        'method': 'GET',
        'url': 'https://api.company-information.service.gov.uk' + pscType,
        'headers': {
          'Authorization': apiKey
        },
        'json': true
      }
      request(options, function (error, response) {
        if (error) throw new Error(error)
        req.session.pscSingle = response.body
        if (req.session.pscSingle.kind === 'corporate-entity-person-with-significant-control') {
          res.redirect('/discrepancy-details/psc-company')
          return
        } else {
          res.redirect('psc-person')
          return
        }
      })
    }
  })
}
