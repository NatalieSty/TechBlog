import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/_models/Post';
import { PostService } from 'src/app/_services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post;

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadPost();
  }

  loadPost() {
    this.postService.getPost(+this.route.snapshot.params['id'])
      .subscribe((res: Post) => {
        this.post = res;
      }, error => {
        console.log('error loading post');
      });
  }

}
