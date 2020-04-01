import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../_models/Post';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getPosts(page?, itemsPerPage?): Observable<PaginatedResult<Post[]>> {
  const paginatedResult: PaginatedResult<Post[]> = new PaginatedResult<Post[]>();
  let params = new HttpParams();

  if(page != null && itemsPerPage != null){
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }
  return this.http.get<Post[]>(this.baseUrl + 'post', {observe : 'response', params})
    .pipe(
      map(res => {
        paginatedResult.result = res.body;
        if(res.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(res.headers.get('Pagination'))
        }
        return paginatedResult;
      })
    )
}

getPost(id): Observable<Post>{
  return this.http.get<Post>(this.baseUrl + 'post/' + id);
}

updatePost(id, post) {
  return this.http.put(this.baseUrl + 'post/' + id, post, httpOptions);
}

createPost(post) {
  return this.http.post(this.baseUrl + 'post/', post, httpOptions);
}

deletePhoto(postId, photoId) {
  return this.http.delete(this.baseUrl + 'post/' + postId + '/photo/' + photoId, httpOptions);
}

}
