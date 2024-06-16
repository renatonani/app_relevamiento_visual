import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SacarFoto2Page } from './sacar-foto2.page';

describe('SacarFoto2Page', () => {
  let component: SacarFoto2Page;
  let fixture: ComponentFixture<SacarFoto2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SacarFoto2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
