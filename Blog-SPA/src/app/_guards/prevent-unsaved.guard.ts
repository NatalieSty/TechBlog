import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { PostEditComponent } from '../blog-post/post-edit/post-edit.component';
import { PostEditResolver } from '../_resolvers/post-edit.resolver';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChanges implements CanDeactivate<PostEditComponent> {

  canDeactivate(component: PostEditComponent) {
      if (component.editForm.dirty) {
          return confirm('Are you sure you want to leave? Unsaved changes will be lost');
      }
      return true;
  }

}
