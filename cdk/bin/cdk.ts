#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import {ArnaudEtSesAmisStack} from '../lib/arnaud-et-ses-amis-stack';

const app = new cdk.App();
new ArnaudEtSesAmisStack(app, 'ArnaudEtSesAmisStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION
    }
})
