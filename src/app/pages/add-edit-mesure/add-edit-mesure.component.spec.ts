import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMesureComponent } from './add-edit-mesure.component';

describe('AddEditMesureComponent', () => {
  let component: AddEditMesureComponent;
  let fixture: ComponentFixture<AddEditMesureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMesureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditMesureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
