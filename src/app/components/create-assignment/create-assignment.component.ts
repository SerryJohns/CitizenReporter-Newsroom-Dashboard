import { Component, OnInit } from '@angular/core';
import { CreateAssignmentService } from '../../services/assignments/create-assignment.service';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css'],
  providers: [ CreateAssignmentService ]
})
export class CreateAssignmentComponent implements OnInit {

  constructor( private createAssignmentService: CreateAssignmentService ) { }

  showProgressBar: boolean;
  title: String;
  author: String;
  location: String;
  description: String;
  featureImage: File;

  ngOnInit() {
    this.showProgressBar = false;
  }

  createAssignment(): void {
    this.createAssignmentService.createAssignment({
      title: this.title,
      author: this.author,
      location: this.location,
      description: this.description,
      featureImage: this.featureImage
    }).subscribe(
      () => console.log('Assignment created successfully'),
      (err) => console.log(`Error: ${ err }`)
    );
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.featureImage = fileList[0];
    }
    console.log(this.featureImage);
  }

}
