#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import {ArnaudEtSesAmisStack} from '../lib/arnaud-et-ses-amis-stack';

const app = new cdk.App();
new ArnaudEtSesAmisStack(app, 'ArnaudEtSesAmisStack', {
    env: {
        // Stack must be in us-east-1, because the ACM certificate for a
        // global CloudFront distribution must be requested in us-east-1.
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: 'us-east-1'
    }
})
