import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { Idea } from '../models/idea';

@Directive({
  selector: '[appShowForDuration]'
})
export class ShowForDurationDirective implements OnChanges {
  private _elementRef: ElementRef;


  @Input()
  public text: string;

  constructor(el: ElementRef) {
    if(!el) {
      return;
    }
    this._elementRef = el;
    (<HTMLElement>this._elementRef.nativeElement).style.visibility = 'hidden';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.text) {
      console.log('description changed');

      (<HTMLElement>this._elementRef?.nativeElement).style.visibility = 'visible';
      interval(2000).pipe(take(1)).subscribe(i => (<HTMLElement>this._elementRef?.nativeElement).style.visibility = 'hidden');
    }
  }

}
