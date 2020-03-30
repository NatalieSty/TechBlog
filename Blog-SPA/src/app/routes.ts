import {Routes} from '@angular/router';
import { BlogComponent } from './blog-post/blog/blog.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { PostComponent } from './blog-post/post/post.component';

export const appRoutes: Routes = [
    { path: 'blog', component: BlogComponent},
    { path: 'about', component: AboutComponent},
    { path: 'post/:id', component: PostComponent},
    { path: 'project', component: ProjectsComponent},
    { path: '**', redirectTo: 'blog', pathMatch: 'full'},
];
