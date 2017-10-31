/**
 * Created by edwinkato on 10/31/17.
 */
import {
	Headers
} from '@angular/http';


export function formatDate(date: Date) {
  let dd: any = date.getDate();
  let mm: any = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  return yyyy + '-' + mm + '-' + dd;
}

export function getHeaders() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  return headers;
}

export function getWeekDateRange() {
  const today = new Date();
  const previousDay = new Date(today);
  previousDay.setDate(today.getDate() - 7);
  return formatDate(previousDay) + '/' + formatDate(today);
}
