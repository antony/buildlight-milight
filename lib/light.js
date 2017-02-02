'use strict'

const config = require('../config.json')
const { MilightController, commands2 } = require('node-milight-promise')

const light = new MilightController({
  ip: config.light.bridge,
  delayBetweenCommands: 75,
  commandRepeat: 2
})
const zone = config.light.zone

const hues = {
  red: 170,
  green: 120,
  yellow: 150
}

let colour = null

module.exports.control = function (nextColour) {
  if (colour === nextColour) { return }
  const newHue = hues[colour] || hues.red

  light.sendCommands(commands2.rgbw.on(zone))

  for (var x = 0; x < newHue; x += 5) {
    light.sendCommands(commands2.rgbw.hue(x))
    if (x === 0) {
      commands2.rgbw.brightness(100)
    }
    light.pause(10)
  }
  light.pause(1000)
} 