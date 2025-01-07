import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteeventComponent } from './deleteevent.component';

describe('DeleteeventComponent', () => {
  let component: DeleteeventComponent;
  let fixture: ComponentFixture<DeleteeventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteeventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
