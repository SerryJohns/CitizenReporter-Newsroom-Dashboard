import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CreateAssignmentService } from '../../services/assignments/create-assignment.service';
import { AlertMsg } from '../../models/alert-msg.model';
import { States } from '../../models/states.enum';

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
  deadline: string;
  featureImage: File;

  @Output() outputMsg: EventEmitter<AlertMsg> = new EventEmitter<AlertMsg>();

  ngOnInit() {
    this.showProgressBar = false;
  }

  resetFields(): void {
    this.title = this.author = this.description = this.deadline = this.location = null;
  }

  createAssignment(): void {
    this.showProgressBar = true;
    this.createAssignmentService.createAssignment({
      title: this.title,
      author: this.author,
      location: this.location,
      description: this.description,
      deadline: new Date(this.deadline),
      featureImage: this.featureImage
    }).subscribe(
      (assignment) => {
        this.outputMsg.emit(<AlertMsg>({
          type: States[States.success],
          msg: 'Assignment Created successfully!',
          data: assignment
        }));
      }, (err) => {
        this.outputMsg.emit(<AlertMsg>({
          type: States[States.danger],
          msg: `Error: ${ err }`
        }));
        this.showProgressBar = false;
      },
      () => {
        this.resetFields();
        this.showProgressBar = false;
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
