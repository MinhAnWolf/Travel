import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTripModalComponent } from 'src/app/pages/ui-components/modal/create-trip-modal/create-trip-modal.component';
import {Utils} from "../../../shared/common/Utils";

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/" style="position: relative; display: inline-block;">
        <img
          src="./assets/images/logos/logo.png"
          class="align-middle m-2"
          alt="logo"
          width="60px"
          height="44px"
        />
        <span style="position: absolute; top: 10px; left: 80px; font-size: 20px;  font-weight: bold;color: #EF7A6F;">Waker</span>
      </a>

      <a
        mat-flat-button
        color="primary"
        target="_blank"
        class="d-flex justify-content-center m-t-20"
        style="margin-right: 10px; background-color: #F97316; color: #ffffff;"
        (click)="openModal()"
      >
        Tạo chuyến đi
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor(
    private dialog: MatDialog,
  ) {}

  /**
   * Open modal CreateTripModalComponent.
   * */
  public openModal() {
    Utils.openModal(this.dialog, CreateTripModalComponent);
  }
}
