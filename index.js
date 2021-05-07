const core = require('@actions/core')
const licenseChecker = require('license-checker')

const getMultilineInput = (name) => core.getInput(name).split('\n');

const checkLicenses = (path) => {
  return new Promise((resolve) => {
    const allowedLicenses = getMultilineInput('allow-only')
    const excludePackages = getMultilineInput('exclude-packages')
    try {
      licenseChecker.init({
        start: path,
        onlyAllow: allowedLicenses.join(';'),
        excludePackages: excludePackages.join(';')
      }, err => {
        resolve(err);
      })
    } catch (error) {
      resolve(error);
    }
  });
}

try {
  const paths = getMultilineInput('paths');

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
