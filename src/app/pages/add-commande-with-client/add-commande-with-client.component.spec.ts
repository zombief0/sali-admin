import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommandeWithClientComponent } from './add-commande-with-client.component';

describe('AddCommandeWithClientComponent', () => {
  let component: AddCommandeWithClientComponent;
  let fixture: ComponentFixture<AddCommandeWithClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommandeWithClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCommandeWithClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
