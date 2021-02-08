module.exports = function (router) {
  // Company number
  router.get('/company-lookup/company-number', function (req, res) {
    res.render('company-lookup/company-number', {
    })
  })
  // Code for company lookup and confirming company
  router.post('/company-lookup/company-number', function (req, res) {
    // Capture the entered company number using req.body.number the 'number' should match the ID of the input. The uppercase is to deal with company numbers that have letters as it needs to be all uppercase
    var errors = []
    var companyNumber = req.body.number.toUpperCase().trim()
    req.session.number = companyNumber
    var apiKey = process.env.CHS_API_KEY
    var n = companyNumber.length
    if (req.session.data['number'] === '') {
      errors.push({
        text: 'Enter the company number',
        href: '#number'
      })
      res.render('company-lookup/company-number', {
        errorNum: true,
        errorList: errors
      })
    } else if (n !== 8) {
      errors.push({
        text: 'Company number must be 8 characters',
        href: '#number'
      })
      res.render('company-lookup/company-number', {
        errorNum: true,
        errorList: errors
      })
    } else {
      // Require the request node module, you may need to install this if it's a new prototype
      var request = require('request')
      // Construct the API request
      // This will only pull back the company data found here: https://developer.company-information.service.gov.uk/api/docs/company/company_number/companyProfile-resource.html
      var options = {
        'method': 'GET',
        'url': 'https://api.company-information.service.gov.uk/company/' + companyNumber + '',
        'headers': {
          'Authorization': apiKey
        },
        'json': true
      }
      request(options, function (error, response) {
        if (error) throw new Error(error)
        // With the response put that as a session variable so it can be used across all pages
        req.session.company = response.body
        // Format date of incorporation
        const dayOfIncorporation = req.session.company.date_of_creation.slice(-2)
        const monthOfIncorporation = req.session.company.date_of_creation.slice(5, 7)
        const yearOfIncorporation = req.session.company.date_of_creation.slice(0, 4)
        req.session.companyIncorp = dayOfIncorporation + ' ' + monthOfIncorporation + ' ' + yearOfIncorporation
        // Redirect to the confirm company page
        res.redirect('/company-lookup/confirm-company')
      })
    }
  })
  router.get('/company-lookup/confirm-company', function (req, res) {
    // Render the confirm company page
    res.render('company-lookup/confirm-company', {
      // To use the company data on that page use the following
      company: req.session.company,
      companyIncorp: req.session.companyIncorp
    })
  })
  router.post('/company-lookup/confirm-company', function (req, res) {
    var request = require('request')
    var apiKey = process.env.CHS_API_KEY
    var companyNumber = req.session.number
    var options = {
      'method': 'GET',
      'url': 'https://api.company-information.service.gov.uk/company/' + companyNumber + '/persons-with-significant-control',
      'headers': {
        'Authorization': apiKey
      },
      'json': true
    }
    request(options, function (error, response) {
      if (error) throw new Error(error)
      req.session.psc = response.body
      console.log(req.session.psc)
      res.redirect('../discrepancy-details/psc-names')
    })
  })
  router.get('/discrepancy-details/psc-names', function (req, res) {
    res.render('discrepancy-details/psc-names', {
      psc: req.session.psc,
      company: req.session.company
    })
  })
}
