import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.page.html',
  styleUrls: ['./create-meal.page.scss'],
})
export class CreateMealPage implements OnInit {
  meal = {};
  constructor() { }

  ngOnInit() {
  }
  add(){
    console.log(JSON.stringify(this.meal));
  }

}
