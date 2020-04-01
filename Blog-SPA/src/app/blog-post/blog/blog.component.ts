import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/_models/Post';
import { PostService } from 'src/app/_services/post.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: Post[];
  newPost: any = {};
  pagination: Pagination;

  constructor(private postService: PostService, private authService: AuthService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.posts = data['posts'].result;
      this.pagination = data['posts'].pagination;
    });
  }

  loadPosts() {
    this.postService.getPosts(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Post[]>) => {
        this.posts = res.result;
        this.pagination = res.pagination;
     }, error => {
        console.log('error loading posts');
      });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  createPost() {
    this.postService.createPost(this.newPost).subscribe((res: Post) => {
      console.log('post is created');
      this.router.navigate(['/post/edit/', res.id]);
    }, error => {
      console.log(error);
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadPosts();
  }

}
