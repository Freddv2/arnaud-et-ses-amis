import {CfnOutput, Construct, RemovalPolicy, Stack, StackProps} from "@aws-cdk/core";
import {BucketDeployment, Source} from "@aws-cdk/aws-s3-deployment";
import {ARecord, HostedZone, RecordTarget} from "@aws-cdk/aws-route53";
import {Certificate} from "@aws-cdk/aws-certificatemanager";
import {CloudFrontTarget} from "@aws-cdk/aws-route53-targets";
import {CloudFrontWebDistribution, OriginProtocolPolicy, SecurityPolicyProtocol, SSLMethod} from "@aws-cdk/aws-cloudfront";
import {Bucket} from "@aws-cdk/aws-s3";

export class ArnaudEtSesAmisStack extends Stack {

  domainName = 'www.arnaudetsesamis.com'
  hostedZoneId = 'Z00385751ORUOL1JJ9APG'
  certificateArn = 'arn:aws:acm:us-east-1:369282510238:certificate/de5d134f-6d61-42de-9f97-b97872423ea6'

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // We lookup the hosted zone into which we will cerate all DNS entries
    const zone = HostedZone.fromHostedZoneAttributes(this, 'MyZone', {
      zoneName: this.domainName,
      hostedZoneId: this.hostedZoneId,
    });

    new CfnOutput(this, 'Site', {value: 'https://' + this.domainName});

    // Content bucket
    const siteBucket = new Bucket(this, 'SiteBucket', {
      bucketName: this.domainName,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
    });
    new CfnOutput(this, 'Bucket', {value: siteBucket.bucketName});

    // TLS certificate
    const cert = Certificate.fromCertificateArn(this, 'Cert', this.certificateArn)
    new CfnOutput(this, 'Certificate', {value: cert.certificateArn});

    // CloudFront distribution that provides HTTPS
    const distribution = new CloudFrontWebDistribution(this, 'SiteDistribution', {
      aliasConfiguration: {
        acmCertRef: cert.certificateArn,
        names: [this.domainName],
        sslMethod: SSLMethod.SNI,
        securityPolicy: SecurityPolicyProtocol.TLS_V1_1_2016,
      },
      originConfigs: [
        {
          customOriginSource: {
            domainName: siteBucket.bucketWebsiteDomainName,
            originProtocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
          },
          behaviors: [{isDefaultBehavior: true}],
        }
      ]
    });
    new CfnOutput(this, 'DistributionId', {value: distribution.distributionId});

    // Route53 alias record for the CloudFront distribution
    new ARecord(this, 'SiteAliasRecord', {
      recordName: this.domainName,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
      zone
    });

    // Deploy site contents to S3 bucket
    new BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [Source.asset('./../ui/dist')],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ['/*'],
    });
  }
}
