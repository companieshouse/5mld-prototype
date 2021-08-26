module.exports = function (router) {
  router.get('/obliged-entity-type', function (req, res) {
    res.render('obliged-entity-type', {
      currentUrl: req.originalUrl
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
      currentUrl: req.originalUrl
    })
  })

  router.post('/obliged-entity-details-name', function (req, res) {
    var errors = []
    if (req.session.data['full-name'] === '') {
      errors.push({
        text: 'Enter your name',
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
      currentUrl: req.originalUrl
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
      currentUrl: req.originalUrl
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
}
