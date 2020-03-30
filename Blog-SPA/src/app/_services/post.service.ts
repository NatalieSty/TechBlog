import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../_models/Post';

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

getPosts(): Observable<Post[]> {
  return this.http.get<Post[]>(this.baseUrl + 'post');
}

getPost(id): Observable<Post>{
  return this.http.get<Post>(this.baseUrl + 'post/' + id);
}

}
