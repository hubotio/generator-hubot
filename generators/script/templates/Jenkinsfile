def pipelineRepo = 'https://github.com/eedevops/he-jenkins-ci.git'
def pipeline = fileLoader.fromGit('integration-flow',
    pipelineRepo, 'master', null, '')

pipeline.runPipeline(pipelineRepo)