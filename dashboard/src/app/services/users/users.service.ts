import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.model';

@Injectable()
export class UsersService {

  countUsers(): Promise<number> {
    const userObj: any = Parse.Object.extend('User');
    const query: any = new Parse.Query(userObj);
    return new Promise((resolve, reject) => {
      query.count({
        success: (count) => resolve(count),
        error: (err) => reject(err)
      });
    });
  }

  getUsers(limit: number, offset: number): Observable<User> {
    const userObj: any = Parse.User;
    const query: any = new Parse.Query(userObj);
    query.descending('createdAt');
    query.skip(offset);
    query.limit(limit);
    return Observable.create(
      observer => {
        query.find().then((users) => {
          users.map(user => observer.next(this.toUser(user)))
          .catch(err => observer.error(`Error: ${err}`));
          observer.complete();
        }, (error) => observer.error(`Error: ${error}`));
      }
    );
  }

  toUser(user: any): User {
    return <User>({
      id: user.id,
      name: user.get('name'),
      firstname: user.get('first_name'),
      lastname: user.get('last_name'),
      username: user.get('username'),
      email: user.getEmail(),
      emailVerified: user.get('emailVerified'),
      createdAt: <Date>user.get('createdAt')
    });
  }
}
