import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/_models/Post';
import { PostService } from 'src/app/_services/post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: Post[];

  constructor(private postServive: PostService) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postServive.getPosts().subscribe((res: Post[]) => {
      this.posts = res;
    }, error => {
      console.log('error loading posts');
    });
  }

}
