const express = require('express')
const router = express.Router()

// Company lookup
require('./routes/company-lookup.js')(router)
// PSC lookup
require('./routes/psc-lookup.js')(router)
// Sign in
require('./routes/sign-in.js')(router)
// Obliged entity details
require('./routes/obliged-entity-details.js')(router)

// Add your routes here - above the module.exports line
router.get('/', function (req, res) {
  req.session.destroy()
  res.render('index', {
  })
})

// PSC Person
router.get('/discrepancy-details/psc-person', function (req, res) {
  res.render('discrepancy-details/psc-person', {
    pscSingle: req.session.pscSingle,
    currentUrl: req.originalUrl
  })
})

router.post('/discrepancy-details/psc-person', function (req, res) {
  var errors = []
  if (typeof req.session.data['pscperson'] === 'undefined') {
    errors.push({
      text: 'Select the type of discrepancy you are reporting',
      href: '#pscperson'
    })
    res.render('discrepancy-details/psc-person', {
      errorPSC: true,
      errorList: errors
    })
  } else {
    res.redirect('other-info')
  }
})

// PSC Company
router.get('/discrepeancy-details/psc-company', function (req, res, next) {
  res.render('/discrepeancy-details/psc-company', {
    currentUrl: req.originalUrl
  })
})

router.post('/discrepancy-details/psc-company', function (req, res, next) {
  var errors = []
  if (typeof req.body.pscperson === 'undefined') {
    errors.push({
      text: '  Select the PSC with the discrepancy, or if a PSC is missing',
      href: '#pscname'
    })
    res.render('discrepancy-details/psc-company', {
      errorPSC: true,
      errorList: errors
    })
  } else {
    res.redirect('other-info')
  }
})

router.get('/discrepeancy-details/other-info', function (req, res) {
  res.render('/discrepeancy-details/other-info', {
    currentUrl: req.originalUrl
  })
})

router.post('/discrepancy-details/other-info', function (req, res) {
  var errors = []
  if (req.session.data['more-detail'] === '') {
    errors.push({
      text: 'Enter the information that is incorrect for the PSC',
      href: '#more-detail'
    })
    res.render('discrepancy-details/other-info', {
      errorOther: true,
      errorList: errors
    })
  } else {
    res.redirect('/check-your-answers')
  }
})

// Check your answers page
router.post('/check-your-answers', function (req, res) {
  res.redirect('confirmation')
})

router.get('/check-your-answers', function (req, res) {
  res.render('check-your-answers', {
    // To use the company data on that page use the following
    company: req.session.company,
    pscSingle: req.session.pscSingle
  })
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation', {
  })
})

module.exports = router
