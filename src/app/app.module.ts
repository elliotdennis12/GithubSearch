import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';

import { SearchComponent } from './search/search.component';
import { SearchService } from 'src/providers/search.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      { path: '', component: SearchComponent }
    ])
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
