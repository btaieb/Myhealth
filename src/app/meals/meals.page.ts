import { Component, OnInit } from '@angular/core';
import { DatabaseService, Meal } from '../services/database.service';


@Component({
  selector: 'app-meals',
  templateUrl: './meals.page.html',
  styleUrls: ['./meals.page.scss'],
})
export class MealsPage implements OnInit {

  private selectedItem: any;
  meals: Meal[] = [];

  constructor(private db: DatabaseService) {}

  ngOnInit() {

    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
         this.db.getMeals().subscribe(p => {
          this.meals = p;
         });
      }
    });
  }

}
