import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Meal {
  id: number;
  name: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  fibers: number;
}
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  meals = new BehaviorSubject([]);

  constructor(
    private plt: Platform,
    private sqlitePorter: SQLitePorter,
    private sqlite: SQLite,
    private http: HttpClient
  ) {
    console.log('[INFO] Initialize Database service....');
    this.plt.ready().then(() => {
      this.sqlite
        .create({
          name: 'myhealth.db',
          location: 'default'
        })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
        });
    });
  }

  seedDatabase() {
    console.log('[INFO] Seed Database....');
    this.http
      .get('assets/data.sql', { responseType: 'text' })
      .subscribe((sql) => {
        this.sqlitePorter
          .importSqlToDb(this.database, sql)
          .then((_) => {
            this.loadMeals();
            this.dbReady.next(true);
          })
          .catch((e) => console.error(e));
      });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getMeals(): Observable<any[]> {
    console.log('[INFO] Get meals....');

    this.meals.forEach(function (value) {
      console.log(JSON.stringify(value));
    });

    return this.meals.asObservable();
  }

  loadMeals() {
    console.log('[INFO] Load meals....');
    const query = 'SELECT meals.id As id, meals.name AS name, meals.calories AS calories FROM meals';
    return this.database.executeSql(query, []).then((data) => {
      let p = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          p.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            calories: data.rows.item(i).calories
          });
        }
      }
      this.meals.next(p);
    });
  }

  addMeal(name) {
    let data = [name];
    return this.database
      .executeSql('INSERT INTO meals (name) VALUES (?)', data)
      .then((data) => {
        this.loadMeals();
      });
  }

  deleteMeal(id) {
    return this.database
      .executeSql('DELETE FROM meals WHERE id = ?', [id])
      .then((_) => {
        this.loadMeals();
      });
  }
  updateMeal(p: Meal) {
    let data = [p.name];
    return this.database
      .executeSql(`UPDATE meals SET name = ? WHERE id = ${p.id}`, data)
      .then((data) => {
        this.loadMeals();
      });
  }
}
