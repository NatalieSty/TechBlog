import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Project } from 'src/app/_models/Project';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css']
})
export class ProjectModalComponent implements OnInit {
  list: any[] = [];
  project: any = {};
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.project.title = this.list[0]["title"];
    this.project.created = this.list[0]["created"];
    this.project.context = this.list[0]["context"];
    this.project.description = this.list[0]["description"];
  }

}
