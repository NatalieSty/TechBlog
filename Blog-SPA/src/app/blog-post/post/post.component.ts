import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/_models/Post';
import { PostService } from 'src/app/_services/post.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { AuthService } from 'src/app/_services/auth.service';
import { Photo } from 'src/app/_models/Photo';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post;
  postPhotos: Photo[];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private postService: PostService, private authService: AuthService ,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.post = data['post'];
    });
    this.postPhotos = this.post.photos;
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 3,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();

  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.post.photos) {
      imageUrls.push({
        url: photo.url,
        
        description: photo.description
      });
    }

    // for (const photo of this.post.photos) {
    //   imageUrls.push({
    //     small: photo.url,
    //     medium: photo.url,
    //     big: photo.url,
    //     description: photo.description
    //   });
    // }
    return imageUrls;
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  // loadPost() {
  //   this.postService.getPost(+this.route.snapshot.params['id'])
  //     .subscribe((res: Post) => {
  //       this.post = res;
  //     }, error => {
  //       console.log('error loading post');
  //     });
  // }

}
