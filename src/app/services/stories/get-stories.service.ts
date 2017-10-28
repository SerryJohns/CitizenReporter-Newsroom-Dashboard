import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import { Observable } from 'rxjs/Observable';

import { Story } from './../../components/stories/story.model';

@Injectable()
export class GetStoriesService {
  getStories(): Observable<Story> {
    const storiesObj: any = Parse.Object.extend('Story');
    const query: any = new Parse.Query(storiesObj);
    return Observable.create(
      observer => {
        const toStory = (anyStory: any) => this.toStory(anyStory);
        query.find().then(function(stories) {
          stories.forEach(item => {
            observer.next(toStory(item));
          });
          observer.complete();
        }, function(error) {
          observer.error(`Error: ${error}`);
        });
      }
    );
  }

  toStory(story: any): Story {
    return <Story>({
      id: story.id,
      uploaded: story.get('uploaded'),
      media: story.get('media'), // TODO assign array
      localID: story.get('localID'),
      summary: story.get('summary'),
      author: story.get('author'),
      assignment: story.get('assignment'),
      updatedAt: story.get('updatedAt'),
      cachedLocation: story.get('cachedLocation'),
      title: story.get('title'),
      when: <Date>story.get('when'),
      createdAt: <Date>story.get('createdAt'),
      sourceApp: story.get('source_app'),
      who: story.get('who')
    });
  }
}
