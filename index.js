'use strict'

const co = require('co')
const { update } = require('./lib/poller')
const { control } = require('./lib/light')

function again () {
  co(update()).then((colour) => {
    control(colour)
    setTimeout(again, 15 * 1000)
  })
}

again()