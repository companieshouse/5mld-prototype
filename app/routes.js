const express = require('express')
const router = express.Router()

// Company lookup
require('./routes/company-lookup.js')(router)

// Add your routes here - above the module.exports line
router.get('/', function (req, res) {
  req.session.destroy()
  res.render('index', {
  })
})

router.post('/sign-in', function (req, res) {
  var errors = []
  var emailHasError = false
  var passwordHasError = false

  if (req.session.data['email'] === '') {
    emailHasError = true
    errors.push({
      text: 'Enter your email address',
      href: '#email-error'
    })
  }
  if (req.session.data['password'] === '') {
    passwordHasError = true
    errors.push({
      text: 'Enter your password',
      href: '#password-error'
    })
  }

  if (emailHasError || passwordHasError) {
    res.render('sign-in', {
      errorEmail: emailHasError,
      errorPassword: passwordHasError,
      errorList: errors
    })
  } else {
    res.redirect('obliged-entity-type')
  }
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

router.get('/discrepeancy-details/psc-names', function (req, res) {
  res.render('/discrepeancy-details/psc-names', {
  })
})

router.post('/discrepancy-details/psc-names', function (req, res) {
  var errors = []
  if (typeof req.body.psc === 'undefined') {
    errors.push({
      text: 'Select the PSC with the incorrect information',
      href: '#psc'
    })
    res.render('discrepancy-details/psc-names', {
      errorPSC: true,
      errorList: errors
    })
    return
  } if (req.body.psc.includes('duplicate')) {
    res.redirect('/discrepancy-details/psc-duplicate')
    return
  } if (req.body.psc.includes('other')) {
    res.redirect('/discrepancy-details/psc-missing')
    return
  } else {
    res.redirect('/discrepancy-details/psc-person')
    return
  }
})

// PSC Person
router.get('/discrepeancy-details/psc-person', function (req, res, next) {
  res.render('/discrepeancy-details/psc-person', {
  })
})

router.post('/discrepancy-details/psc-person', function (req, res, next) {
  var errors = []
  if (typeof req.body.pscname === 'undefined') {
    errors.push({
      text: 'Select the PSC with the incorrect information',
      href: '#pscname'
    })
    res.render('discrepancy-details/psc-person', {
      errorPSC: true,
      errorList: errors
    })
  } else {
    res.redirect('../check-your-answers')
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

router.get('/confirmation', function (req, res) {
  res.render('confirmation', {
  })
})

module.exports = router
