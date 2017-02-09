'use strict'

const Hoek = require('hoek')
const config = require('../config.json')
const { MilightController, commands2 } = require('node-milight-promise')

const light = new MilightController({
  ip: config.light.bridge,
  delayBetweenCommands: 75,
  commandRepeat: 2
})
const zone = config.light.zone

const bulbStates = {
  red: { state: 'on', hue: 170 },
  green: { state: 'off' },
  yellow: { state: 'on', hue: 150 }
}

let colour = null

module.exports.control = function (nextColour) {
  console.log('Build is', nextColour)
  if (colour === nextColour) { return }
  colour = nextColour

  const bulbState = bulbStates[nextColour]
  const { state, hue } = bulbState || bulbStates.red

  light.sendCommands(commands2.rgbw[state](zone))

  if (state === 'off') {
    return
  }

  commands2.rgbw.brightness(100)

  for (var x = 0; x < hue; x += 5) {
    light.sendCommands(commands2.rgbw.hue(x))
    light.pause(10)
  }
  
  light.pause(1000)
} 