import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CreateAssignmentService } from '../../services/assignments/create-assignment.service';
import { AlertMsg } from '../../models/alert-msg.model';

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
  deadline: Date;
  featureImage: File;

  @Output() outputMsg: EventEmitter<AlertMsg> = new EventEmitter<AlertMsg>();

  ngOnInit() {
    this.showProgressBar = false;
  }

  createAssignment(): void {
    this.createAssignmentService.createAssignment({
      title: this.title,
      author: this.author,
      location: this.location,
      description: this.description,
      deadline: this.deadline,
      featureImage: this.featureImage
    }).subscribe(
      (assignment) => {
        this.outputMsg.emit(<AlertMsg>({
          type: 'success',
          msg: 'Assignment Created successfully!'
        }));
      }, (err) => {
        this.outputMsg.emit(<AlertMsg>({
          type: 'danger',
          msg: `Error: ${ err }`
        }));
      }
    );
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.featureImage = fileList[0];
    }
  }

}
