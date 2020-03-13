pipeline {
  agent any
  stages {
    stage('ConfigUpload') {
      steps {
        SWEAGLEUpload(actionName: 'uploadConfig', fileLocation: '*.json', format: 'json', nodePath: 'JenkinsCD', allowDelete: true, filenameNodes: true, showResults: true, tag: '${BUILD_ID}')
        SWEAGLEUpload(actionName: 'Sweagle Upload props', fileLocation: '*.props', format: 'properties', nodePath: 'JenkinsCD', filenameNodes: true, showResults: true, subDirectories: true, tag: '${BUILD_ID}')
      }
    }

    stage('Validate') {
      steps {
        SWEAGLEValidate(actionName: 'ValidateConfig', mdsName: 'JenkinsCD', errMax: 1, retryInterval: 3, showResults: true, warnMax: 3)
        SWEAGLESnapshot(actionName: 'Snapshot', mdsName: 'JenkinsCD', showResults: true, tag: '${BUILD_ID}')
      }
    }

  }
}