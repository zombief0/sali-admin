import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeItemComponent } from './commande-item.component';

describe('CommandeItemComponent', () => {
  let component: CommandeItemComponent;
  let fixture: ComponentFixture<CommandeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
