import { Component, OnInit } from '@angular/core';
import { Idea } from 'src/app/models/idea';
import { IdeaService } from 'src/app/services/idea.service';

@Component({
  selector: 'app-idea-list',
  templateUrl: './idea-list.component.html',
  styleUrls: ['./idea-list.component.scss']
})
export class IdeaListComponent implements OnInit {
  constructor(private _ideaService: IdeaService) { 
 
  }

  public get ideas(): Idea[] {
    return this._ideaService.ideas;
  }

  public ngOnInit(): void {
  }

}
