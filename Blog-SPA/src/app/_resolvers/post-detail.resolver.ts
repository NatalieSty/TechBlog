import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Post } from '../_models/Post';
import { PostService } from '../_services/post.service';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PostDetailResolver implements Resolve<Post> {
    constructor(private postService: PostService, private route: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Post> {
        return this.postService.getPost(route.params['id']).pipe(
            catchError(error => {
                console.log('error retrieving data');
                this.route.navigate(['/blog']);
                return of(null);
            })
        );
    }
}