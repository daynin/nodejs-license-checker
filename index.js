const core = require('@actions/core')
const github = require('@actions/github')
const licenseChecker = require('license-checker')

try {
  const allowedLicenses = core.getInput('allow-only')

  licenseChecker.init({
    start: './',
    onlyAllow: allowedLicenses,
  }, err => err && core.setFailed(err.message))
} catch (error) {
  core.setFailed(error.message)
}
