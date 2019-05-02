import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMealPage } from './create-meal.page';

describe('CreateMealPage', () => {
  let component: CreateMealPage;
  let fixture: ComponentFixture<CreateMealPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMealPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMealPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
