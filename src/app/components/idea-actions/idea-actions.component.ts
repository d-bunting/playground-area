import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SortOption } from 'src/app/models/sort-option';
import { IdeaService } from 'src/app/services/idea.service';

@Component({
  selector: 'app-idea-actions',
  templateUrl: './idea-actions.component.html',
  styleUrls: ['./idea-actions.component.scss']
})
export class IdeaActionsComponent implements OnInit, AfterViewInit {

  constructor(private _ideaService: IdeaService) { }

  @ViewChild('titleInput')
  public titleInput: ElementRef;

  public selectedDescription: string = 'none';
  public title: string = '';

  public get sortOptions(): SortOption[] {
    return this._ideaService.sortOptions();
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.titleInput?.nativeElement?.focus();
  }

  public add(): void {
    this.addIdea();
  }

  public clear(): void {
    this._ideaService.clear();
  }

  public sort(event: Event): void {
    this.selectedDescription = (<HTMLInputElement>event.target).value;
   this._ideaService.sort(this.sortOptions.find(so => so.description === this.selectedDescription));
  }

  public titleChange(event: Event): void {
    this.title = (<HTMLInputElement>event.target).value;
  }

  public titleEnter(_event: Event): void {
    this.addIdea();
  }

  private get titleOrDefault(): string {
    if(this.title !== '' && this.title !== undefined) {
      return this.title;
    }

    const now =  new Date();
    const weekDay = now.toLocaleDateString(undefined,  { weekday: 'long'})
    return `New idea ${weekDay} @ ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  }

  private addIdea(): void {
    this._ideaService.addIdea({ title: this.titleOrDefault, description: ``, createdAt: new Date() });
    if(this.selectedDescription !== this.sortOptions[0].description) {
      this.selectedDescription = 'none';
    }
    this.title = '';
  }
}
