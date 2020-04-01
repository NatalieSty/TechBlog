import {Routes} from '@angular/router';
import { BlogComponent } from './blog-post/blog/blog.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { PostComponent } from './blog-post/post/post.component';
import { PostDetailResolver } from './_resolvers/post-detail.resolver';
import { PostEditComponent } from './blog-post/post-edit/post-edit.component';
import { PostCreateComponent } from './blog-post/post-create/post-create.component';
import { PostEditResolver } from './_resolvers/post-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved.guard';
import { PostResolver } from './_resolvers/post.resolver';

export const appRoutes: Routes = [
    { path: 'blog', component: BlogComponent, resolve: {posts: PostResolver}},
    { path: 'about', component: AboutComponent},
    { path: 'post/new', component: PostCreateComponent},
    { path: 'post/:id', component: PostComponent, resolve: {post: PostDetailResolver}},
    { path: 'post/edit/:id', component: PostEditComponent, resolve: {post: PostEditResolver}, canDeactivate: [PreventUnsavedChanges]},
    { path: 'project', component: ProjectsComponent},
    { path: '**', redirectTo: 'blog', pathMatch: 'full'},
];
