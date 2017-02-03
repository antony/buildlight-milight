'use strict'

const config = require('../config.json')

const CircleCI = require('circleci')
const ci = new CircleCI({
  auth: config.apiKey
})

const username = config.vcs.user
const monitored = config.vcs.projects

module.exports.update = function * () {
  let pending = false
  let negative = false

  for (let project of monitored) {
    const builds = yield ci.getBranchBuilds({ username, project, branch: 'master', limit: 1 })
    pending = pending || builds[0].status === 'running'
    negative = negative || builds[0].status === 'failed'
  }

  if (pending) { 
    return 'yellow'
  } else {
    return negative ? 'red' : 'green'
  }
}