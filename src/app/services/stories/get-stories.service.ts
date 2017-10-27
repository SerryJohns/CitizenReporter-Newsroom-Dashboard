import { Injectable } from '@angular/core';
import { Parse } from 'parse';

@Injectable()
export class GetStoriesService {

  constructor() { }

  getStories(): void {
    console.log('Get stories service');
    const GameScore = Parse.Object.extend('Story');
    const query = new Parse.Query(GameScore);
    query.get('6ujZGnJquq', {
      success: function(gameScore) {
        // The object was retrieved successfully.
        console.log(`Got result: ${gameScore.get('title')}`);
        console.log(gameScore);
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
        console.log('Ooops, an error occurred!');
      }
    });
  }
}
