pipeline {
    agent any
    environment {
        SONAR_HOME = tool name: 'SonarQube', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
    }
    stages {
        stage("Clone Code from GitHub") {
            steps {
                git url: 'https://github.com/574n13y/wanderlust.git', branch: 'via-docker'
            }
        }
        stage("SonarQube Quality Analysis") {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh "${SONAR_HOME}/bin/sonar-scanner -Dsonar.projectName=wanderlust -Dsonar.projectKey=wanderlust"
                }
            }
        }
        stage("OWASP Dependency Check") {
            steps {
                dependencyCheck additionalArguments: '--scan ./', odcInstallation: 'OWASP Dependency Check'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
            }
        }
        stage("Sonar Quality Gate Scan") {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: false
                }
            }
        }
        stage("Trivy File System Scan") {
            steps {
                sh 'trivy fs --format table -o trivy-fs-report.html .'
            }
        }
        stage("Deploy using Docker Compose") {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
