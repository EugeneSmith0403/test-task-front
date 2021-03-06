import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  }
)
export class LocalStorageService {
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  remove(item: string): void {
    try {
      localStorage.removeItem(item);
    } catch (e) {
      console.error('Error remove data from localStorage', e);
    }
  }
}
