import * as path from 'path'
import * as cdk from '@aws-cdk/core'
import { MainEcsCluster } from './constructs/ecsCluster'

export class MainStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    new MainEcsCluster(this, 'mainEcsCluster', {
      clusterName: 'ecs-starter',
      taskDefintionName: 'ecs-starter-task',
      taskDefinitionCpu: 256,
      taskDefinitionMem: 2048,
      mainClusterRepoName: 'gilbertly/ecs-starter',
      mainClusterImageDir: path.resolve(__dirname, '../'),
      mainTaskCpu: 256,
      mainTaskMem: 2048,
    })
  }
}
