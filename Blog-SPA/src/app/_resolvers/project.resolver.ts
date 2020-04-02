import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Post } from '../_models/Post';
import { PostService } from '../_services/post.service';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { Project } from '../_models/Project';

@Injectable()
export class ProjectResolver implements Resolve<Project> {
    // pageNumber = 1;
    // pageSize = 4;
    constructor(private postService: PostService, private route: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Project> {
        return this.postService.getProjects().pipe(
            catchError(error => {
                console.log('error retrieving project data');
                this.route.navigate(['/blog']);
                return of(null);
            })
        );
    }
}