import { Injectable } from '@angular/core';
import { Parse } from 'parse';

import { Story } from './../../components/stories/story.model';

@Injectable()
export class GetStoriesService {

  getStories(): Story[] {
    // tslint:disable-next-line:prefer-const
    let storyList: Story[];
    let ss: Story;
    const storiesObj: any = Parse.Object.extend('Story');
    const query: any = new Parse.Query(storiesObj);
    query.find({
      success: function(stories) {
        stories.forEach(story => {
          ss = <Story>({
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
          this.storyList.push(ss);
        });
      },
      error: function(object, error) {
        console.log(`error: ${ error }`);
      }
    });
    return storyList;
  }

  toStory(story): Story {
    let myStory: Story = <Story>({
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
    return myStory;
  }

}
