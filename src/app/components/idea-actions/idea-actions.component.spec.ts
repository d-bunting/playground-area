import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeaActionsComponent } from './idea-actions.component';

describe('IdeaActionsComponent', () => {
  let component: IdeaActionsComponent;
  let fixture: ComponentFixture<IdeaActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeaActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeaActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
