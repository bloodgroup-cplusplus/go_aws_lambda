import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from "aws-cdk-lib/aws-lambda"
import {RestApi,LambdaIntegration} from "aws-cdk-lib/aws-apigateway"
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class GoAwsLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'GoAwsLambdaQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
    const myFucntion = new lambda.Function(this,"MyLambda",{
      code:lambda.Code.fromAsset("lambdas"),
      handler:"main",
      runtime:lambda.Runtime.GO_1_X,
    });

    // build our apigateway between 

    const gateway = new RestApi (this,"myGateway",{
      defaultCorsPreflightOptions:{
        allowOrigins:["*"],
        allowMethods:["GET","POST","OPTIONS","DELETE","PUT"],
      },
    });

    const integration = new LambdaIntegration(myFucntion)
    const testResource = gateway.root.addResource("test");
    testResource.addMethod("GET",integration);
    // once you get you will get route /"test" will have the main.go
    // this is where you can add different route
  }
}
