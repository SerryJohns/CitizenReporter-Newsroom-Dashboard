import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryMediaComponent } from './story-media.component';

describe('StoryMediaComponent', () => {
  let component: StoryMediaComponent;
  let fixture: ComponentFixture<StoryMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoryMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
