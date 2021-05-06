const core = require('@actions/core')
const licenseChecker = require('license-checker')

const checkLicenses = (path) => {
  return new Promise((resolve) => {
    const allowedLicenses = core.getInput('allow-only')
    const excludePackages = core.getInput('exclude-packages')
    try {
      licenseChecker.init({
        start: path,
        onlyAllow: allowedLicenses,
        excludePackages: excludePackages
      }, err => {
        resolve(err);
      })
    } catch (error) {
      resolve(error);
    }
  });
}

try {
  const paths = core.getInput('paths').split(';');

  Promise.all(paths.map(checkLicenses)).then((pathsErrors) => {
    if (pathsErrors.filter(Boolean).length) {
      pathsErrors.forEach((pathCheckErrors, index) => {
        if (pathErrors) {
          console.log(`Found errors while check path "${paths[index]}"`);
          console.log(pathCheckErrors);
        }
      })
      core.setFailed('Licenses check has been failed')
    }
  })
} catch (error) {
  core.setFailed(error.message)
}
