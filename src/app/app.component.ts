import { Component } from '@angular/core';
import AWSS3UploadAshClient from 'aws-s3-upload-ash';
import { UploadResponse } from 'aws-s3-upload-ash/dist/types';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'record-aws';
  url:any = ''
  fileSelected: any = null;
  config = {
    bucketName: 'canary-staging',
    dirName: 'media',
    region: 'eu-west-1',
    accessKeyId: environment.AWS_ACCESS_KEY,
    secretAccessKey: environment.AWS_SECRET_KEY,
    s3Url: 'http://canary-staging.s3.eu-west-1.amazonaws.com/'
  }
  S3CustomClient: AWSS3UploadAshClient = new AWSS3UploadAshClient(this.config);

  onChangeFile(event: any) {
    this.fileSelected = event.target.files[0]
  }

  async handleSendFile() {
    await this.S3CustomClient
      .uploadFile(this.fileSelected, this.fileSelected.type, undefined, this.fileSelected.name, "private")
      .then((data: UploadResponse) => {
        // URL FILE
        this.url = data.location
      })
      .catch((err: any) => console.error(err))
  }

}
