import cloudfront = require('@aws-cdk/aws-cloudfront');
import route53 = require('@aws-cdk/aws-route53');
import s3 = require('@aws-cdk/aws-s3');
import s3deploy = require('@aws-cdk/aws-s3-deployment');
import acm = require('@aws-cdk/aws-certificatemanager');
import cdk = require('@aws-cdk/core');
import targets = require('@aws-cdk/aws-route53-targets');

export class ArnaudEtSesAmisStack extends cdk.Stack {

  domainName = 'www.arnaudetsesamis.com'

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const zone = new route53.PublicHostedZone(this, 'Zone', {zoneName: this.domainName});

    new cdk.CfnOutput(this, 'Site', {value: 'https://' + this.domainName});

    // Content bucket
    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      bucketName: this.domainName,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    new cdk.CfnOutput(this, 'Bucket', {value: siteBucket.bucketName});

    // TLS certificate
    const certificateArn = new acm.DnsValidatedCertificate(this, 'SiteCertificate', {
      domainName: this.domainName,
      hostedZone: zone,
      region: 'us-east-1', // Cloudfront only checks this region for certificates.
    }).certificateArn;
    new cdk.CfnOutput(this, 'Certificate', {value: certificateArn});

    // CloudFront distribution that provides HTTPS
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'SiteDistribution', {
      aliasConfiguration: {
        acmCertRef: certificateArn,
        names: [this.domainName],
        sslMethod: cloudfront.SSLMethod.SNI,
        securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_1_2016,
      },
      originConfigs: [
        {
          customOriginSource: {
            domainName: siteBucket.bucketWebsiteDomainName,
            originProtocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
          },
          behaviors: [{isDefaultBehavior: true}],
        }
      ]
    });
    new cdk.CfnOutput(this, 'DistributionId', {value: distribution.distributionId});

    // Route53 alias record for the CloudFront distribution
    new route53.ARecord(this, 'SiteAliasRecord', {
      recordName: this.domainName,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
      zone
    });

    // Deploy site contents to S3 bucket
    new s3deploy.BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [s3deploy.Source.asset('./../ui/dist')],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'],
    });
  }
}
