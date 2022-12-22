@Library('ceiba-jenkins-library') _
  pipeline {
    agent {
        label 'Slave_Induccion'
  }

  tools {
        jdk 'JDK11_Centos'
  }

  options {
      buildDiscarder(logRotator(numToKeepStr: '5'))
      disableConcurrentBuilds()
      gitLabConnection('GitCeiba')
  }

  triggers {
      // @yearly, @annually, @monthly, @weekly, @daily, @midnight, and @hourly o definir un intervalo ejemplo H */4 * * 1-5
      pollSCM('@daily') //define un intervalo regular en el que Jenkins debería verificar los cambios de fuente nuevos
   }

  stages {

      stage('Checkout'){
        steps {
	      	echo "-----------------checkout-----------------"
				      checkout scm
        }
      }


      stage('NPM Install') {
        steps {
          withEnv(['NPM_CONFIG_LOGLEVEL=warn']) {
            sh 'npm install'
          }
        }
      }

      stage('Test Unit') {
        steps{
          echo "------------Test------------"
          sh 'npm run test -- --watch=false --browsers ChromeHeadless'
        }
      }

        
  /*      stage('Test end-to-end') {
            steps{
                echo "------------>Testing Protractor<------------"
                sh 'npm run e2e --'
            }
        }*/

      stage('Analisis de codigo estatico'){
        steps{
          echo '-----------------Analisis de codigo estatico-----------------'
            withSonarQubeEnv('Sonar'){
              //Coge las propiedades del sonarQube y las ejecuta
              sh "${tool name: 'SonarScanner', type:'hudson.plugins.sonar.SonarRunnerInstallation'}/bin/sonar-scanner -Dproject.settings=./sonar-project.properties"
            }
         }
      }


  }

  post {
    always {
      echo 'This will always run'
    }
    success {
      echo 'This will run only if successful'
    }
    failure {
      echo 'This will run only if failed'
      mail (to: 'andres.lopez@ceiba.com.co',subject: "Failed Pipeline:${currentBuild.fullDisplayName}",body: "Something is wrong with ${env.BUILD_URL}")
    }
    unstable {
      echo 'This will run only if the run was marked as unstable'
    }
    changed {
      echo 'This will run only if the state of the Pipeline has changed'
      echo 'For example, if the Pipeline was previously failing but is now successful'
    }
  }  

}