import {Injectable} from '@angular/core';
import { Resolve, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Post } from '../_models/Post';
import { PostService } from '../_services/post.service';
import { Observable, of} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { Project } from '../_models/Project';

@Injectable()
export class ProjectEditResolver implements Resolve<Project> {
    constructor(private postService: PostService, private route: Router, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Project> {
        return this.postService.getProject(route.params['id']).pipe(
            catchError(error => {
                console.log('error retrieving project data');
                this.route.navigate(['/project']);
                return of(null);
            })
        );
    }
}