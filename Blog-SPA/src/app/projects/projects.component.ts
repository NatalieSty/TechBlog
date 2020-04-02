import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PostService } from '../_services/post.service';
import { Project } from 'src/app/_models/Project';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { AuthService } from '../_services/auth.service';
import { ProjectCreateComponent } from './project-create/project-create.component';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  project: Project;
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private authService: AuthService,
      private route: ActivatedRoute, private postService: PostService, private router: Router) {}
 
  openModal(p) {
    const initialState = {
      list: [
        {"description": p.description,
         "created": p.created,
         "context": p.context,
         "title": p.title}
      ]
    };
    this.modalRef = this.modalService.show(ProjectModalComponent, {initialState});
  }


  ngOnInit() {
    this.route.data.subscribe(data => {
      this.projects = data['projects'];
    });
  }

  loggedIn(): boolean {
    return this.authService.loggedIn();
  }

  deleteProject(p) {
    this.postService.deleteProject(p.id).subscribe(()=>{
      this.router.navigate(['/project']);
    })
  }

}
