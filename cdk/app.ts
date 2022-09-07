import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ConfiguredFargateLoadBalancedApplicationWithSSL } from "./ConfiguredFargateLoadBalancedApplicationWithSSL";
import {
  APP_NAME,
   PROD_SUBDOMAIN,
  RESOURCE_DEPLOYMENT_REGION,
  STAGING_SUBDOMAIN, taskExecutionIamPoliciesJSON
} from "./configuration";
import { HostedZone } from "aws-cdk-lib/aws-route53";
import { DnsValidatedCertificate } from "aws-cdk-lib/aws-certificatemanager";
import * as iam from "aws-cdk-lib/aws-iam";
import setupCodeBuild from "./setupCodeBuild";
import setupPipeline from "./setupPipeline";


export class App extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new cdk.aws_s3.Bucket(this, 's3bucket');

    const {codebuildProject} = setupCodeBuild(this);

    setupPipeline(this, codebuildProject);
  };
}
