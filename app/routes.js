const express = require('express')
const router = express.Router()

// Company lookup
require('./routes/company-lookup.js')(router)
// Sign in
require('./routes/sign-in.js')(router)

// Add your routes here - above the module.exports line
router.get('/', function (req, res) {
  req.session.destroy()
  res.render('index', {
  })
})

router.get('/obliged-entity-type', function (req, res) {
  res.render('obliged-entity-type', {
  })
})

router.post('/obliged-entity-type', function (req, res) {
  var errors = []
  if (typeof req.session.data['obliged-type'] === 'undefined') {
    errors.push({
      text: 'Select what type of obliged entity you are',
      href: '#obliged-type'
    })
    res.render('obliged-entity-type', {
      errorType: true,
      errorList: errors
    })
  } else {
    res.redirect('obliged-entity-details-organisation')
  }
})

router.get('/obliged-entity-name', function (req, res) {
  res.render('obliged-entity-name', {
  })
})

router.post('/obliged-entity-details-name', function (req, res) {
  var errors = []
  if (req.session.data['full-name'] === '') {
    errors.push({
      text: 'Enter your full name',
      href: '#full-name'
    })
    res.render('obliged-entity-details-name', {
      errorName: true,
      errorList: errors
    })
  } else if (req.session.data['full-name'] === '@') {
    errors.push({
      text: 'Full name must only include letters a to z, hyphens, spaces and apostrophes',
      href: '#full-name'
    })
    res.render('obliged-entity-details-name', {
      errorNametwo: true,
      errorList: errors
    })
  } else {
    res.redirect('obliged-entity-email')
  }
})

router.get('/obliged-entity-organisation', function (req, res) {
  res.render('obliged-entity-organisation', {
  })
})

router.post('/obliged-entity-details-organisation', function (req, res) {
  var errors = []
  if (req.session.data['your-organisation-name'] === '') {
    errors.push({
      text: 'Enter your organisation name',
      href: '#your-organisation-name'
    })
    res.render('obliged-entity-details-organisation', {
      errorTelephoneNumber: true,
      errorList: errors
    })
  } else {
    res.redirect('obliged-entity-details-name')
  }
})

router.get('/obliged-entity-email', function (req, res) {
  res.render('obliged-entity-email', {
  })
})

router.post('/obliged-entity-email', function (req, res) {
  var errors = []
  if (req.session.data['email'] === '') {
    errors.push({
      text: 'Enter your email address',
      href: '#email'
    })
    res.render('obliged-entity-email', {
      errorEmail: true,
      errorList: errors
    })
  } else {
    res.redirect('/company-lookup/company-number')
  }
})

// PSC Person
router.get('/discrepancy-details/psc-person', function (req, res) {
  res.render('discrepancy-details/psc-person', {
  })
})

router.post('/discrepancy-details/psc-person', function (req, res) {
  var errors = []
  if (typeof req.session.data['pscperson'] === 'undefined') {
    errors.push({
      text: 'Select the type of discrepancy you are reporting',
      href: '#pscname'
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
  })
})

router.post('/discrepancy-details/psc-company', function (req, res, next) {
  var errors = []
  if (typeof req.body.pscperson === 'undefined') {
    errors.push({
      text: 'Select the PSC with the incorrect information',
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
    company: req.session.company
  })
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation', {
  })
})

module.exports = router
