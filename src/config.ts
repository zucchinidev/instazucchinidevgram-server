import * as aws from 'aws-sdk'
export interface ConfigurationApp {
  s3ClientConfiguration: aws.S3.Types.ClientConfiguration,
  bucketName: string,
  acl: string
}

const s3ClientConfiguration: aws.S3.Types.ClientConfiguration = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  apiVersion: '2006-03-01'
}

export const config: ConfigurationApp = {
  s3ClientConfiguration,
  bucketName: 'instazucchinidevgram',
  acl: 'public-read'
}
