import { Story } from '../../components/stories/story.model';
import { Parse } from 'parse';

export function toStory(story: any): Story {
    return <Story>({
      id: story.id,
      uploaded: story.get('uploaded'),
      media: story.get('media'), // TODO assign array
      localID: story.get('localID'),
      summary: story.get('summary'),
      author: getAuthorName(story.get('author')),
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

function getAuthorName(authorId: String): String {
  const userObj: any = Parse.Object.extend('User');
  const query: any = new Parse.Query(userObj);
  query.get(authorId).then(
    function(author){
      return `${ author.get('first_name') } ${ author.get('last_name') }`;
    }, function(object, error) {
      console.log(`Error: ${ object } : ${ error }`);
    });
  return;
}
