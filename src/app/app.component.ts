import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ideas-board';

  public clicked(){
    var test = JSON.parse(localStorage.getItem('my_item') || '{}');
    test.count ++;
    localStorage.setItem('my_item', JSON.stringify({test:'test', count: test.count}));
    console.log(test.count);
  }

  /**
   *
   */
  constructor() {
    var test = JSON.parse(localStorage.getItem('my_item') || '{}');
    test.count ++;
    console.log(test.count);
  }

 
}
