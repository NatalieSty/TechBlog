import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {NgxGalleryModule} from '@kolkov/ngx-gallery';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FileUploadModule } from 'ng2-file-upload';
import { PaginationModule } from 'ngx-bootstrap/pagination';



import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { BlogComponent } from './blog-post/blog/blog.component';
import { PostComponent } from './blog-post/post/post.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { PostDetailResolver } from './_resolvers/post-detail.resolver';
import { PostEditComponent } from './blog-post/post-edit/post-edit.component';
import { PostCreateComponent } from './blog-post/post-create/post-create.component';
import { PostEditResolver } from './_resolvers/post-edit.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved.guard';
import { PhotoEditorComponent } from './blog-post/photo-editor/photo-editor.component';
import { PostResolver } from './_resolvers/post.resolver';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      BlogComponent,
      PostComponent,
      AboutComponent,
      ProjectsComponent,
      PostEditComponent,
      PostCreateComponent,
      PhotoEditorComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      NgxGalleryModule,
      FormsModule,
      RouterModule.forRoot(appRoutes),
      CommonModule,
      AngularEditorModule,
      ModalModule.forRoot(),
      CarouselModule.forRoot(),
      FileUploadModule,
      PaginationModule.forRoot()

   ],
   providers: [
      AuthService,
      PostDetailResolver,
      PostEditResolver,
      PostResolver,
      AuthGuard,
      PreventUnsavedChanges,
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
