// Put your app name here. For example if you're building Acme Co's Centralized User Data Service codenamed Logos,
// which will at run on logos.acmecorp.com, you might put LogosService here. This string is used all over the place
// to identify your cfn resources. Must contain only alphanumeric characters.
import * as iam from "aws-cdk-lib/aws-iam";

// These settings MUST change
export const ACCOUNT_ID = '694488202997';
export const GH_USERNAME = 'jwoehrle';
export const GH_REPO_NAME = 'nodejs-typescript-fargate-starter'; // repo name under YOUR account
export const CODESTAR_CONNECTION_ARN = 'arn:aws:codestar-connections:eu-west-1:694488202997:connection/10338062-f8e0-49ab-926e-9320469772f8';

/**
 * Settings below here don't have to change, but you might want to
 */
export const APP_NAME = 'KratosService';
export const GH_BRANCH = 'main';
export const STAGING_SUBDOMAIN = 'staging-api';
export const PROD_SUBDOMAIN = 'api';
// This region controls where your CDK resources are created and also separately controls where the ACM cert gets created.
export const RESOURCE_DEPLOYMENT_REGION = 'eu-west-1'; // or chosen region from step 5

// permissions your fargate task will have
export const taskExecutionIamPoliciesJSON = [
    {
        effect: iam.Effect.ALLOW,
        resources: ['*'],
        actions: [
            "ecr:GetAuthorizationToken",
            "ecr:BatchCheckLayerAvailability",
            "ecr:GetDownloadUrlForLayer",
            "ecr:BatchGetImage",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
        ]
    }
];
