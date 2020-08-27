import * as cdk from '@aws-cdk/core'
import { MainStack } from './aws/mainStack'

const app = new cdk.App()
new MainStack(app, 'mainStack', {
  stackName: 'ecs-starter-ts',
  description: 'Starterkit for containerized Typescript apps.'
})