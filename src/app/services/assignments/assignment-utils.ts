import { Assignment } from './../../components/assignments/assignment.model';

export function toAssignment(story: any): Assignment {
    return <Assignment>({
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
