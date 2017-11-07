import { Injectable } from '@angular/core';
import { Parse } from 'parse';

import { Assignment } from './../../models/assignment.model';
import { Observable } from 'rxjs/Observable';
import { toAssignment } from './assignment-utils';

@Injectable()
export class GetAssignmentsService {

  getAssignments(limit: number, offset: number): Observable<Assignment> {
    const assignemntsObj: any = Parse.Object.extend('Assignment');
    const query: any = new Parse.Query(assignemntsObj);
    query.descending('createdAt');
    query.skip(offset);
    query.limit(limit);
    return Observable.create(
      observer => {
        query.find().then((stories) => {
          stories.map(item => observer.next(toAssignment(item)))
          .catch(err => observer.error(`Error: ${err}`));
          observer.complete();
        }, (error) => {
          observer.error(`Error: ${error}`);
        });
      }
    );
  }

  countAssignments(): Promise<number> {
    const assignmentsObj: any = Parse.Object.extend('Assignment');
    const query: any = new Parse.Query(assignmentsObj);
    return new Promise((resolve, reject) => {
      query.count({
        success: (count) => resolve(count),
        error: (err) => reject(err)
      });
    });
  }

}
