import { Assignment } from './../../models/assignment.model';

export function toAssignment(assignment: any): Assignment {
    return <Assignment>({
      id: assignment.id,
      featuredImage: assignment.get('featured_image').url(),
      author: assignment.get('author'),
      updatedAt: <Date>assignment.get('updatedAt'),
      location: assignment.get('location'),
      title: assignment.get('title'),
      deadline: <Date>assignment.get('deadline'),
      createdAt: <Date>assignment.get('createdAt'),
      description: assignment.get('description')
    });
  }
