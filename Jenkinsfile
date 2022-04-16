node {
    def commit_id
    def to = emailextrecipients([
              [$class: 'CulpritsRecipientProvider'],
              [$class: 'DevelopersRecipientProvider'],
              [$class: 'RequesterRecipientProvider']
      ])

    try{
       stage('Preparation') {
           checkout scm
           sh "git rev-parse --short HEAD > .git/commit-id"
           commit_id = readFile('.git/commit-id').trim()
       }

       stage('App Build') {
           nodejs(nodeJSInstallationName: 'nodejs'){
              sh 'npm install'
              sh 'ng build --prod'
           }
       }

       stage('Docker build/push') {
          def app = docker.build "zombief0/sali-admin:${commit_id}"
          app.push()
       }

       stage('Docker run') {
//           sh "docker container stop recipe-web"
//           sh "docker container rm recipe-web"
          sh "docker container run -d -e VIRTUAL_HOST=adminsali.normanmbouende.com --name sali-admin zombief0/sali-admin:${commit_id}"
          sh "docker image prune -a -f"
       }


    } catch(e) {
        currentBuild.result = "FAILURE";
        def subject = "${env.JOB_NAME} - Build #${env.BUILD_NUMBER} ${currentBuild.result}"
        def content = '${JELLY_SCRIPT,template="html"}'

        if(to != null && !to.isEmpty()) {
          emailext(body: content, mimeType: 'text/html',
             replyTo: '$DEFAULT_REPLYTO', subject: subject,
             to: to, attachLog: true )
        }

        throw e;
      }

}
