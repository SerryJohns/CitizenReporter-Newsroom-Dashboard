import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit {

  constructor() { }

  showProgressBar: boolean;
  title: String;
  author: String;
  location: String;
  describe: String;
  featureImage: File;

  ngOnInit() {
    this.showProgressBar = false;
  }

  createAssignment(): void {
    console.log('creating');
    console.log(this.featureImage);
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.featureImage = fileList[0];
    }
    console.log(this.featureImage);
  }

}
