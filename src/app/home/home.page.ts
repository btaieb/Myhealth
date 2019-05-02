import { Component, OnInit } from '@angular/core';
import { DatabaseService, Meal } from '../services/database.service';
import { Router } from '@angular/router';
import { load } from '@angular/core/src/render3';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  implements OnInit {
  today: String = new Date().toLocaleDateString();
  meals: Meal[] = [];
  todayMeals: Meal[] = [];
  caloriesGoal: number = 0;
  caloriesToday: number = 0;
  

  constructor(private db: DatabaseService, private router: Router) {
  }

  ngOnInit() {
    this.load();

    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
       
         this.db.getNeededCalories().then((data) => {
            console.log(JSON.stringify(data));
            if (data.gender === 1) {
              this.caloriesGoal = ((66.5 + (13.75 * data.weightgoal) + (5 * (data.height ))) - (6.77 * data.age)) * 1.2;
            } else {
              this.caloriesGoal = ((655 + (9.56 * data.weightgoal) + (1.85 * (data.height ))) - (4.67  * data.age)) * 1.2;
            }
         });
      }
    });
  }

  ionViewWillEnter() {
    this.load();
  }
  load() {
    console.log('refresh data...');
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getCurrentDayMeals().subscribe(p => {
          this.meals = p;
         });

         this.db.getCurrentMealsCalories().subscribe(p => {
          this.caloriesToday = 0;
          for (let i = 0; i < p.length; i++) {
            this.caloriesToday = this.caloriesToday + (p[i].calories * p[i].quantity)
            
          }

         
        });
      }
    });
    
  }
  remove(id) {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
         this.db.removeMealFromCurrentDay(id);
         this.load();
      }
    });
  }

  navigateToSearchMeal() {
    this.router.navigateByUrl('/search');
  }

}
