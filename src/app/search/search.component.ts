import { Component } from '@angular/core';
import { SearchService } from './../../providers/search.service';
import { User, GithubUserResult } from 'src/models/user';
import { mergeMap, concatMap, switchMap, map, tap } from 'rxjs/operators';
import { Observable, from, forkJoin } from 'rxjs';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService]
})
export class SearchComponent {
    searchText: string = '';
    count: number = 0;
    pages: number = 0;
    users = new Array<User>();
    p: number = 1;
    searchStarted: boolean = false;

    sortOptions: Array<{ name: string, value: string }> = [
        { name: "Best Match", value: "" },
        { name: "Followers: Most", value: "&sort=followers&order=desc" },
        { name: "Followers: Least", value: "&sort=followers&order=asc" },
        { name: "Repositories: Most", value: "&sort=repositories&order=desc" },
        { name: "Repositories: Least", value: "&sort=repositories&order=asc" },
        { name: "Recently Joined", value: "&sort=joined&order=asc" },
        { name: "Least Recently Joined", value: "&sort=joined&order=desc" }
    ];

    sortSelected: string = "";

    constructor(private searchService: SearchService)
    { }

    search(page: number) {
        this.searchService.getUsers(this.searchText, page, this.sortSelected).pipe(
            tap(gitData => this.count = gitData.total_count),
            switchMap(gitData => forkJoin(gitData.items.map(item => this.searchService.getUserInfo(item.url))))  
        )
        .subscribe(final => this.finishSearch(final));
    }

    finishSearch(final) {
        this.users = final as User[];

        this.searchStarted = true;
        this.pages = (this.count > 1000) ? 1000 : this.count;
        console.log(this.pages);
    }

    async getPage(page: number) {
        this.p = page;
        this.search(page);
    }
}