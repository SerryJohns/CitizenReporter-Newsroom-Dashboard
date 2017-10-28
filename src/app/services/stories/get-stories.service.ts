import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Story } from './../../components/stories/story.model';
import { toStory } from './story-utils';

@Injectable()
export class GetStoriesService {
  getStories(): Observable<Story> {
    const storiesObj: any = Parse.Object.extend('Story');
    const query: any = new Parse.Query(storiesObj);
    return Observable.create(
      observer => {
        query.find().then(function(stories) {
          stories.map(item => observer.next(toStory(item)))
          .catch(err => observer.error(`Error: ${ err }`));
          observer.complete();
        }, function(error) {
          observer.error(`Error: ${ error }`);
        });
      }
    );
  }
}
