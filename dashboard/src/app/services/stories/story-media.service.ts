import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Parse } from 'parse';

@Injectable()
export class StoryMediaService {

  getMediaFiles(storyId: String): Observable<String> {
    const storyObj: any = Parse.Object.extend('Story');
    const mediaObj: any = Parse.Object.extend('mediaFile');
    const query: any = new Parse.Query(mediaObj);
    const story: any = new storyObj();

    story.id = storyId;
    query.equalTo('parent', story);
    query.descending('createdAt');

    return Observable.create(
      observer => {
        query.find().then((mediaFiles) => {
          mediaFiles.map( mediaFile => observer.next(mediaFile.get('remoteFile').url()) );
          observer.complete();
        }, (error) => {
          observer.error(`Error: ${error}`);
        });
      }
    );
  }

}
