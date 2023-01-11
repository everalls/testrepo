import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopControlComponent } from './top-control.component';

describe('TopControlComponent', () => {
  let component: TopControlComponent;
  let fixture: ComponentFixture<TopControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
