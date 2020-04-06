import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {IConfig} from '../models/config.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configUrl = `${environment.apiUrl}config.json`;
  constructor(private _http: HttpClient) { }

  getConfig(): Observable<IConfig> {
    return this._http.get<IConfig>(this.configUrl);
  }
}
