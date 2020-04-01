import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/_models/Photo';
import {FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { AuthService } from 'src/app/_services/auth.service';
import { Post } from 'src/app/_models/Post';
import { PostService } from 'src/app/_services/post.service';
import { findIndex } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Input() postId;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  constructor(private authService: AuthService, private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  deletePhoto(id) {
    this.postService.deletePhoto(this.postId, id).subscribe(() => {
      this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
    });
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'post/' + this.postId + '/photo',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;}

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description
        };
        this.photos.push(photo);
      }
    };
  }

}
