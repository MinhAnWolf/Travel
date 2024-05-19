import {CreateTripModalComponent} from "../../pages/ui-components/modal/create-trip-modal/create-trip-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {FormGroup} from "@angular/forms";

/**
 * Support method common.
 * */
export class Utils {

  /**
   * Check null data
   * */
  public static checkObjNull(data:any) {
    return data == null;
  }

  /**
   * Function to format the date to yyyy-mm-dd format
   * */
  public static formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${this.padZero(date.getMonth() + 1)}-${this.padZero(date.getDate())}`;
  }

  /**
   * Function to add zero padding if needed
   * */
  private static padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  /**
   * blob convert base64
   * */
  public static async blobToBase64(blobUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = () => {
          reject('Error occurred while reading the blob as base64.');
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = () => {
        reject('Error occurred while fetching the blob.');
      };
      xhr.open('GET', blobUrl);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  /**
   * Check null everywhere.
   * */
  public static checkStrNull(obj:string):boolean {
     return obj == null || obj === "";
  }

  /**
   * Open modal.
   * */
  public static openModal(dialog: MatDialog, modalComponent:any ): void {
    const dialogRef = dialog.open(modalComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
}
