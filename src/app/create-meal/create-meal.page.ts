import { Component, OnInit } from '@angular/core';
import { DatabaseService, Meal } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-meal',
  templateUrl: './create-meal.page.html',
  styleUrls: ['./create-meal.page.scss'],
})
export class CreateMealPage implements OnInit {
  meal = {};
  constructor(private db: DatabaseService, private router: Router) { }

  ngOnInit() {
  }
  add() {
    console.log(JSON.stringify(this.meal));
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
         this.db.addMeal(this.meal);
         this.router.navigateByUrl('/meals');
      }
    });
  }

}
