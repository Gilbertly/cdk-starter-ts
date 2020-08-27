import * as cdk from '@aws-cdk/core'
import * as ec2 from '@aws-cdk/aws-ec2'
import * as ecs from '@aws-cdk/aws-ecs'
import * as ecr from '@aws-cdk/aws-ecr-assets'
import * as eventsTargets from '@aws-cdk/aws-events-targets'

interface MainEcsClusterProps {
  clusterName: string,

  taskDefintionName: string,
  taskDefinitionCpu: number,
  taskDefinitionMem: number,

  mainClusterRepoName: string,
  mainClusterImageDir: string,

  mainTaskCpu: number,
  mainTaskMem: number
}

export class MainEcsCluster extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, props: MainEcsClusterProps) {
    super(scope, id)

    const mainClusterVpc = new ec2.Vpc(this, 'mainClusterVpc', {
      maxAzs: 2
    })

    const mainCluster = new ecs.Cluster(this, 'mainCluster', {
      clusterName: props.clusterName,
      vpc: mainClusterVpc
    })

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'mainTaskDefinition', {
      family: props.taskDefintionName,
      cpu: props.taskDefinitionCpu,
      memoryLimitMiB: props.taskDefinitionMem
    })

    const mainClusterImage = new ecr.DockerImageAsset(this, 'mainClusterImage', {
      repositoryName: props.mainClusterRepoName,
      directory: props.mainClusterImageDir,
    })

    taskDefinition.addContainer('mainTask', {
      image: ecs.ContainerImage.fromEcrRepository(mainClusterImage.repository),
      cpu: props.mainTaskCpu,
      memoryLimitMiB: props.mainTaskMem
    })

    new eventsTargets.EcsTask({
      cluster: mainCluster,
      taskDefinition: taskDefinition
    })
  }
}