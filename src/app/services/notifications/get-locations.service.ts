import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GetLocationsService {

  getLocations(): Observable<String> {
    const locations = [
      'Africa/Kampala',
      'Africa/Nairobi'
    ];
    return Observable.create(
      observer => {
        locations.forEach((location) => observer.next(location));
        observer.complete();
      }
    );
  }

}
