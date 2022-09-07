import * as cdk from 'aws-cdk-lib';
import * as codebuild from "aws-cdk-lib/aws-codebuild";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import * as codepipeline_actions from "aws-cdk-lib/aws-codepipeline-actions";
import { APP_NAME, CODESTAR_CONNECTION_ARN, GH_BRANCH, GH_REPO_NAME, GH_USERNAME } from "./configuration";
import { FargateService } from "aws-cdk-lib/aws-ecs";

export default function setupPipeline(stack: cdk.Stack, project: codebuild.Project) {
    const sourceOutput = new codepipeline.Artifact();
    const buildOutput = new codepipeline.Artifact();

    const sourceAction = new codepipeline_actions.CodeStarConnectionsSourceAction({
        actionName: 'VCS_Source',
        output: sourceOutput,
        connectionArn: CODESTAR_CONNECTION_ARN,
        owner: GH_USERNAME,
        repo: GH_REPO_NAME,
        branch: GH_BRANCH,
        triggerOnPush: true
    });

    const buildAction = new codepipeline_actions.CodeBuildAction({
        actionName: 'CodeBuild',
        project: project,
        input: sourceOutput,
        outputs: [buildOutput],
    });

    const manualApprovalAction = new codepipeline_actions.ManualApprovalAction({
        actionName: 'Approve',
    });

    const pipeline = new codepipeline.Pipeline(stack, `${APP_NAME}-Pipeline`, {
        stages: [
            {
                stageName: 'Source',
                actions: [sourceAction],
            },
            {
                stageName: 'Build',
                actions: [buildAction],
            },
            {
                stageName: 'Approval-Workflow',
                actions: [manualApprovalAction],
            }
        ]
    });

    return pipeline;
}
