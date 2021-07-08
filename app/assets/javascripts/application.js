/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}
function setCookie (name, value, days) {
  var expires = ''
  if (days) {
    var date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}
function getCookie (name) {
  var nameEQ = name + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}
function eraseCookie (name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()

  var getCookieAccept

  getCookieAccept = getCookie('cookiepolicy')
  if (getCookieAccept != 'accept') {
    $('.govuk-cookie-banner').show()
  }

  $('.cookie-button').click(function () {
    $('.govuk-cookie-banner').hide()
    var expire = new Date()
    // Setting cookie expiry after 6 months
    expire = new Date(expire.getTime() + 15552000000)
    document.cookie = 'cookiepolicy=accept; expires=' + expire
  })
})

var ColorPicker = (function () {
  'use strict'

  var COLORS = [
    '#B4AADB',
    '#FFE397',
    '#B5D1A7'
  ]
  var CLASS_SELECTED = 'selected'

  function ColorPicker (el) {
    var self = this
    this.color = COLORS[0]
    this.selected = null

    COLORS.forEach(function (color) {
      var div = document.createElement('div')
      div.style.backgroundColor = color

      if (self.color === color) {
        div.className = CLASS_SELECTED
        self.selected = div
      }

      div.addEventListener('click', function () {
        if (color !== self.color) {
          self.color = color

          if (self.selected) {
            self.selected.className = ''
          }
          self.selected = div
          self.selected.className = CLASS_SELECTED

          if (typeof self.callback === 'function') {
            self.callback.call(self, color)
          }
        }
      }, false)

      el.appendChild(div)
    })
  }

  ColorPicker.prototype.onColorChange = function (callback) {
    this.callback = callback
  }

  return ColorPicker
})()
