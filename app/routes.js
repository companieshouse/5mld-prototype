const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

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
    res.redirect('/discrepancy-details/company-number')
  }
})

router.get('/discrepeancy-details/company-number', function (req, res) {
  res.render('/discrepeancy-details/company-number', {
  })
})

router.post('/discrepancy-details/company-number', function (req, res) {
  var errors = []
  if (req.session.data['company-number'] === '') {
    errors.push({
      text: 'Enter the company number',
      href: '#company-number'
    })
    res.render('discrepancy-details/company-number', {
      errorNum: true,
      errorList: errors
    })
  } if (req.session.data['company-number'] === '00445790') {
    res.redirect('/unable-to-use')
  } else {
    res.redirect('/discrepancy-details/psc-names')
  }
})

router.get('/discrepeancy-details/psc-names', function (req, res) {
  res.render('/discrepeancy-details/psc-names', {
  })
})

router.post('/discrepancy-details/psc-names', function (req, res) {
  var errors = []
  if (typeof req.session.data['psc'] === 'undefined') {
    errors.push({
      text: 'Select the PSC with the incorrect information',
      href: '#psc'
    })
    res.render('discrepancy-details/psc-names', {
      errorPSC: true,
      errorList: errors
    })
  } else {
    res.redirect('/discrepancy-details/other-info')
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
    res.redirect('/confirmation')
  }
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation', {
  })
})

module.exports = router
