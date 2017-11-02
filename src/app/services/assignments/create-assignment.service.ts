import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import { Observable } from 'rxjs/Observable';
import { toAssignment } from './assignment-utils';
import { Assignment } from './../../components/assignments/assignment.model';

@Injectable()
export class CreateAssignmentService {

  createAssignment(formData: any): Observable<Assignment> {
    const assignemntsObj: any = Parse.Object.extend('Assignment');
    const featureImage = new Parse.File(formData.featureImage.name, formData.featureImage);
    const newAssignment = new assignemntsObj();
    return Observable.create(
      observer => {
        newAssignment.save(
          {
            featured_image: featureImage,
            title: formData.title,
            author: formData.author,
            location: formData.location,
            description: formData.location,
            deadline: formData.deadline,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          (assignment) => {
            console.log('created successfully');
            observer.next(toAssignment(assignment));
            observer.complete();
          }, (obj, err) => observer.error(`Error: ${err}`)
        );
      }
    );
  }

}