import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Story } from './../../models/story.model';
import { toStory } from './story-utils';

@Injectable()
export class GetStoriesService {

  getStories(limit: number, offset: number): Observable<Story> {
    const storiesObj: any = Parse.Object.extend('Story');
    const query: any = new Parse.Query(storiesObj);
    query.descending('createdAt');
    query.skip(offset);
    query.limit(limit);
    return Observable.create(
      observer => {
        query.find().then((stories) => {
          stories.map(item => observer.next(toStory(item)))
          .catch(err => observer.error(`Error: ${err}`));
          observer.complete();
        }, (error) => {
          observer.error(`Error: ${error}`);
        });
      }
    );
  }

  countStories(): Promise<number> {
    const storiesObj: any = Parse.Object.extend('Story');
    const query: any = new Parse.Query(storiesObj);
    return new Promise((resolve, reject) => {
      query.count({
        success: (count) => resolve(count),
        error: (err) => reject(err)
      });
    });
  }
}
