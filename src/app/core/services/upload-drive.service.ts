import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UploadDriveService {
    private readonly DRIVE_UPLOAD_URL = 'https://script.google.com/macros/s/AKfycbzhrcuz9mmHzRgSmPTSeLVfDO0neSzOmuXaV8n3UK0K9BhJYahdj2lmXhFDVPkTqYFegw/exec';

    constructor(
        private http: HttpClient
    ) {
    }

    upload(b64Image: any) {
        const uuid = this.generateUUID();
        const payload = {
            data : b64Image,
            type : 'image/png',
            name : uuid+'.png',
        }
        return this.http.post(`${this.DRIVE_UPLOAD_URL}`, payload, {
            headers: {
              "Content-Type": "text/plain",
            },
          });
    }

    private generateUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


}