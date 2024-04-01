import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FileValidators } from 'ngx-file-drag-drop';
import { ImgurApiService } from 'src/app/core/services/imgur-api.service';

@Component({
  selector: 'app-create-trip-modal',
  templateUrl: './create-trip-modal.component.html',
  styleUrl: './create-trip-modal.component.scss',
  providers: [provideNativeDateAdapter(), ImgurApiService],
})
export class CreateTripModalComponent implements OnInit {

  cities3 = [
    { id: 'VietMQ', name: 'Mai Quốc Việt', avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x' },
    { id: 'TrieuNHD', name: 'Nguyễn Huỳnh Đông Triều', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15' },
    { id: 'ThaiNQ', name: 'Nguyễn Quốc Thái', avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15' },
    { id: 'ThuyPTK', name: 'Phạm Trương Kiến Thụy', avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15' },
    { id: 'AnLTM', name: 'Lê Trương Minh An', avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15' },
  ];

  fileControl = new FormControl(
    [],
    [FileValidators.required, FileValidators.maxFileCount(10)]
  );
  uploadedFiles: { file: File, preview: string }[] = [];

  selectedCity: any;
  selectedCityIds: string[];
  selectedCityName = 'Vilnius';
  selectedCityId: number;
  selectedUserIds: number[];

  constructor(
    private imgurService: ImgurApiService
  ) {
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  addCustomUser = (term: any) => ({ id: term, name: term });

  onValueChange(files: File[]) {
    this.uploadedFiles = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    console.log('Files changed!');
  }




}
