import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SacarFotoPage } from './sacar-foto.page';

describe('SacarFotoPage', () => {
  let component: SacarFotoPage;
  let fixture: ComponentFixture<SacarFotoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SacarFotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
