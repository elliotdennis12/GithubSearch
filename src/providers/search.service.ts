import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { GithubUserResult, User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    baseUrl: string = 'https://api.github.com/search/users';

    constructor(
        private http: HttpClient
    ) {}

    getUsers(criteria, page, sort): Observable<any> {
        return this.http.get<any>(this.baseUrl + '?q=' + criteria + '&per_page=10&page=' + page + sort);
    }

    getUserInfo(criteria): Observable<User> {
        return this.http.get<User>(criteria);
    }
}