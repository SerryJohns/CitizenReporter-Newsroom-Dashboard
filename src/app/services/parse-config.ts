import { Parse } from 'parse';
import { environment } from './../../environments/environment';

Parse.initialize(environment.APP_ID);
Parse.masterKey = environment.MASTER_KEY;
Parse.serverURL = environment.SERVER_URL;

export class ParseConfig { }
