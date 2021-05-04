import { Component, OnInit } from '@angular/core';
import { IdeaService } from 'src/app/services/idea.service';

@Component({
  selector: 'app-idea-create',
  templateUrl: './idea-create.component.html',
  styleUrls: ['./idea-create.component.scss']
})
export class IdeaCreateComponent implements OnInit {

  constructor(private _ideaService: IdeaService) { }

  public title: string;
  public description: string;
  public createdAt: string;

  public ngOnInit(): void {
  }

  public titleChange(event: any) {
    this.title = (<HTMLInputElement>event.target).value;
  }

  public descriptionChange(event: any) {
    this.description =  (<HTMLInputElement>event.target).value;
  }

  public add(): void {
    this._ideaService.addIdea({ title: this.title, description: this.description, createdAt: new Date() });
  }

}
