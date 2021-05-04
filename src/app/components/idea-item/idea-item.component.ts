import { filter, take, tap } from "rxjs/operators";
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Idea } from 'src/app/models/idea';
import { IdeaService } from 'src/app/services/idea.service';

@Component({
  selector: 'app-idea-item',
  templateUrl: './idea-item.component.html',
  styleUrls: ['./idea-item.component.scss']
})
export class IdeaItemComponent implements OnInit, AfterViewInit {
  private readonly _colors = ['#10B981', '#EAB308', '#F97316',
    '#f59e0b', '#ef4444', '#EF4444', '#3B82F6', '#6366F1', '#8B5CF6', '#F43F5E', '#0EA5E9', '#14B8A6'];
  private _showWarning: boolean = false;

  constructor(private _ideaService: IdeaService) { }

  @ViewChild('item')
  public item: ElementRef;

  @ViewChild('description')
  public descriptionInput: ElementRef;

  @Input()
  public idea: Idea;

  public charsCountText: string = '';

  public get showWarning(): boolean {
    return this._showWarning;
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.selectRandomColor();
    this._ideaService.ideaAdded
      .pipe(
        filter(idea => idea === this.idea),
        tap(i => this.setFocus()),
        take(1),
      ).subscribe();
  }

  public close(): void {
    this._ideaService.removeIdea(this.idea);
  }

  public descriptionChanged(event: any): void {
    const newDescription = (<HTMLElement>event.target).textContent ?? '';
    if (newDescription.length > 140) {
      this._showWarning = true;
      this.charsCountText = newDescription.length > 120 ? `Chars too many ${-140 + newDescription.length}` : '';
      return;
    }
    this._showWarning = false;
    // show the countdown if over 120 chars
    this.charsCountText = newDescription.length > 120 ? `Chars remaining ${140 - newDescription.length}` : '';
  }

  public updateDescription(event: Event): void {
    this._showWarning = false;
    this.charsCountText = '';
    let newDescription = (<HTMLElement>event.target).textContent ?? '';
    newDescription = newDescription.substring(0, 140);

    console.log('previous description ' + this.idea.description);
    if (newDescription !== this.idea.description) {
      console.log('setting new description to ' + newDescription);
      this.idea.description = newDescription;
      this.idea.createdAt = new Date();
      this._ideaService.updateIdea(this.idea);
    }
    (<HTMLElement>event.target).textContent = newDescription;
  }

  private selectRandomColor(): void {
    const colorIndex = Math.floor(Math.random() * this._colors.length);
    console.log('color index ' + colorIndex);
    // set background colour as a variable so that it can be used throughout the style sheet
    this.item?.nativeElement?.parentElement?.style.setProperty('--background-color', this._colors[colorIndex]);
  }

  private setFocus() {
    this.descriptionInput?.nativeElement?.focus();
  }
}

