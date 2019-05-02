import { Component, OnInit } from '@angular/core';
import { DatabaseService, Meal } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {
  user = {};
  constructor(private db: DatabaseService, private router: Router) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
         this.db.getUserInfo().then((data) => {
            console.log(JSON.stringify(data));
            this.user = data;
         });
      }
    });
  }

  save() {
    console.log(JSON.stringify(this.user));
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
         this.db.updateUserInfo(this.user).then(() => {
          this.load();
         });
      }
    });
  }

}
