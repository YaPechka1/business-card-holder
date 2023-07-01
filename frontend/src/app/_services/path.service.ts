import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathService {
  path: string = 'http://localhost:5000/'
  constructor() { }
}
