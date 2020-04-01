import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Post } from 'src/app/_models/Post';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/_services/post.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  post: Post;

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize'],
      ['textColor'],
    ]
};

  constructor(private route: ActivatedRoute, private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.post = data['post'];
    });
  }

  updatePost() {
    this.postService.updatePost(this.post.id, this.post).subscribe(next => {
      console.log('Post updated successfully');
      this.editForm.reset(this.post);
      this.router.navigate(['/post/', this.post.id]);
    }, error => {
      console.log(error);
    });
  }
  

}
