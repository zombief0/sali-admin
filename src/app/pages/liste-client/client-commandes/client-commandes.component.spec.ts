import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCommandesComponent } from './client-commandes.component';

describe('ClientCommandesComponent', () => {
  let component: ClientCommandesComponent;
  let fixture: ComponentFixture<ClientCommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCommandesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
