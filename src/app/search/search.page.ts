import { Component, OnInit } from '@angular/core';
import { DatabaseService, Meal } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  name: String = '';
  meals: Meal[] = [];
  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit() {
  }
  search() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
         this.db.searchMeals(this.name).subscribe(p => {
          this.meals = p;
         });
      }
    });
  }

  add(id) {
    console.log(id);
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
         this.db.addOrUpdateMealToCurrentDay(id);
         this.router.navigateByUrl('/home');
      }
    });
  }
}
