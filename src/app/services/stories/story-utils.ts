import { Story } from './../../models/story.model';
import { Parse } from 'parse';
import { Observable } from 'rxjs/Observable';

export function toStory(story: any): Story {
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

export function setName(authorId: String): String {
  let authorName: String;
  getAuthorName(authorId).subscribe(
    name => { authorName = name;  console.log(authorName); },
    err => console.log(err)
  );
  return authorName;
}

function getAuthorName(authorId: String): Observable<String> {
  const userObj: any = Parse.Object.extend('User');
  const query: any = new Parse.Query(userObj);
  return Observable.create(observer => {
    query.get(authorId).then(function(author) {
      observer.next(`${ author.get('first_name') } ${ author.get('last_name') }`);
      observer.complete();
    }, function(err) { console.log(`Error: ${err}`); });
  });
}
