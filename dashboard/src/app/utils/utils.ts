/**
 * Created by edwinkato on 10/31/17.
 */
import {
  Headers,
  Http
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
  const token = 'eyJhbGciOiJIUzI1NiIsImtpZCI6ImZsdXJyeS56dXVsLnByb2Qua2V5c3RvcmUua2V5LjIifQ.eyJpc3MiOiJodHRwczovL3p1dWwuZmx1cnJ5LmNvbTo0NDMvdG9rZW4iLCJpYXQiOjE1MTE5NjA1NDQsImV4cCI6MzMwNjg4NjkzNDQsInN1YiI6IjQwOTc4NyIsImF1ZCI6IjQiLCJ0eXBlIjo0LCJqdGkiOiIyODE1In0.tjwrc23z1-kc3jQXR8bLzUYGvm3De6ms4VZWYatFSnU';
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Access-Control-Allow-Origin', '*');
  headers.set('Authorization', `Bearer ${token}`);
  return headers;
}

export function getWeekDateRange() {
  const today = new Date();
  const previousDay = new Date(today);
  previousDay.setDate(today.getDate() - 7);
  return formatDate(previousDay) + '/' + formatDate(today);
}

export function getMonthDateRange() {
  const today = new Date();
  const previousDay = new Date(today);
  previousDay.setDate(today.getDate() - 30);
  return formatDate(previousDay) + '/' + formatDate(today);
}

export function getDayOfTheWeek(day: number) {
  if (day === 0) {
    return 'Mon';
  } else if (day === 1) {
    return 'Tue';
  } else if (day === 2) {
    return 'Wed';
  } else if (day === 3) {
    return 'Thu';
  } else if (day === 4) {
    return 'Fri';
  } else if (day === 5) {
    return 'Sat';
  } else {
    return 'Sun';
  }
}

export function makeGetHttpRequest (http: Http, url: string) {
  return http.get(url, {
    headers: getHeaders()
  }).map((response) => response.json());
}


export function getTodaysDateRange() {
  const today = new Date();
  const previousDay = new Date(today);
  previousDay.setDate(today.getDate() - 1);
  return formatDate(previousDay) + '/' + formatDate(today);
}

export function shuffleColors(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffleColors...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
