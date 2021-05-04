import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject } from 'rxjs';
import { take, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { Idea } from 'src/app/models/idea';
import { IdeaService } from 'src/app/services/idea.service';

@Component({
  selector: 'app-idea-board',
  templateUrl: './idea-board.component.html',
  styleUrls: ['./idea-board.component.scss']
})
export class IdeaBoardComponent implements OnInit, OnDestroy {
  private _destroy = new Subject<boolean>();

  constructor(private _ideaService: IdeaService) { 
  }

  public message: string = 'No changes have been made.';
  public showWelcome: boolean = false;
  public changedIdea: Observable<Idea>;
  public showHideMessage: string = 'show';

  public ngOnInit(): void {
    if(this._ideaService.ideas.length === 0) {
      this.showWelcome = true;
      this._ideaService.ideaAdded
      .pipe(
        tap(idea => this.showWelcome = false),
        take(1)
      ).subscribe();
    }

    this.changedIdea = this._ideaService.ideaChanged;
    
    // this._ideaService.ideaChanged
    // .pipe(
    //   tap(idea => this.showMessage(idea)),
    //   takeUntil(this._destroy)
    // ).subscribe();
  }

  public ngOnDestroy(): void {
    this._destroy.next();
  }

  private showMessage(idea: Idea){
    this.message = `Your "${idea.title}" idea was updated at ${idea.createdAt.toTimeString()}.`;
    this.showHideMessage = 'show';
    interval(2000).pipe(take(1)).subscribe(i => this.showHideMessage = '');
  }


}
