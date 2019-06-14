import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiKeyService {
  public apiKey = new BehaviorSubject<string>(this.getApiKeyFromLocalStorage());

  constructor() {

  }

  public setApiKey(apikey: string) {
    localStorage.setItem('apikey', apikey);
    this.apiKey.next(apikey);         // powoduje aktualizowanie w każdej późniejszej subskrypcji
  }

  public getApiKey(): Observable<string> {
    return this.apiKey.asObservable();
  }

  private getApiKeyFromLocalStorage() {
    const localStorageItem = JSON.parse(localStorage.getItem('apikey'));
    return localStorageItem == null ? null : localStorageItem;
  }

  removeApiKey() {
    localStorage.removeItem('apikey');
    this.apiKey.next(null);
  }
}
