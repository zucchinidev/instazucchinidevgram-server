import * as aws from 'aws-sdk'

export class S3FactoryClient {
  public static create (configuration: aws.S3.Types.ClientConfiguration): aws.S3 {
    return new aws.S3(configuration)
  }
}
