import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageeventsComponent } from './manageevents.component';

describe('ManageeventsComponent', () => {
  let component: ManageeventsComponent;
  let fixture: ComponentFixture<ManageeventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageeventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
