import { Injectable } from '@nestjs/common';
import aws from 'aws-sdk';

@Injectable()
export class UploadService {
  space() {
    return new aws.S3({
      endpoint: new aws.Endpoint(process.env.SPACES_ENDPOINT),
      accessKeyId: process.env.SPACES_ACCESS_KEY_ID,
      signatureVersion: 'v4',
      secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY,
      region: process.env.SPACES_REGION,
    });
  }

  async uploadImage(res) {
    const key = `${Date.now()}`;
    const uploadParameters = {
      Bucket: process.env.SPACES_BUCKET_NAME,
      Expires: 1800,
      ACL: 'public-read',
      Key: key,
    };

    const uploadURL = await this.space().getSignedUrlPromise('putObject', uploadParameters);

    return res.json({
      url: uploadURL,
      name: key,
    });
  }

  async getImageName(res, key) {
    const s3Param = {
      Bucket: process.env.SPACES_BUCKET_NAME,
      Key: key,
      ACL: 'public-read',
    };

    const getURL = await this.space().getSignedUrlPromise('putObject', s3Param);
    return res.json({
      url: getURL,
    });
  }
}
