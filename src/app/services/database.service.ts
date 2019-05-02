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
  todayMeals = new BehaviorSubject([]);
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

    this.loadMeals();
    /*
    this.meals.forEach(function (value) {
      console.log(JSON.stringify(value));
    });
    */
    return this.meals.asObservable();
  }
  searchMeals(name) {
    console.log('[INFO] search meals....');

    this.meals = new BehaviorSubject([]);
    this.loadSearchMeals(name);

    return this.meals.asObservable();
  }

  loadSearchMeals(name) {
    console.log('[INFO] Search meals : ' + name);
    const query = `SELECT meals.id As id, meals.name AS name, meals.calories AS calories FROM meals WHERE meals.name LIKE '%${name}%'`;
    return this.database.executeSql(query, []).then((data) => {
      let p = [];
      console.log(data.rows.length);
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

  getCurrentDayMeals() {
    console.log('[INFO] Get current day meals....');

    this.meals = new BehaviorSubject([]);
    this.loadCurrentDayMeals();

    return this.meals.asObservable();
  }

  loadCurrentDayMeals() {
    const today = new Date().toLocaleDateString();
    console.log('[INFO] Load current day meals....' + today);
    const query = `SELECT activity.activityDate AS activityDate, meals.id As id, meals.name AS name, meals.calories AS calories, activity.quantity AS quantity FROM meals JOIN activity ON activity.mealId = meals.id WHERE activity.activityDate = '${today}'`;
    return this.database.executeSql(query, []).then((data) => {
      let p = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          p.push({
            id: data.rows.item(i).id,
            name: data.rows.item(i).name,
            calories: data.rows.item(i).calories,
            activityDate: data.rows.item(i).activityDate,
            quantity: data.rows.item(i).quantity
          });
        }
      }
      console.log(JSON.stringify(p));
      this.meals.next(p);
    });

  }

  getCurrentMealsCalories() {
    console.log('[INFO] Get current meals calories....');

    this.todayMeals = new BehaviorSubject([]);
    this.loadCurrentMealsCalories();

    return this.todayMeals.asObservable();
  }
  loadCurrentMealsCalories() {
    const today = new Date().toLocaleDateString();
    console.log('[INFO] Load current day calories....' + today);
    const query = `SELECT meals.calories AS calories, activity.quantity AS quantity FROM meals JOIN activity ON activity.mealId = meals.id WHERE activity.activityDate = '${today}'`;
    return this.database.executeSql(query, []).then((data) => {
      let p = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          p.push({
            calories: data.rows.item(i).calories,
            activityDate: data.rows.item(i).activityDate,
            quantity: data.rows.item(i).quantity
          });
        }
      }
      this.todayMeals.next(p);
    });

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

  addOrUpdateMealToCurrentDay(id) {
    console.log('[INFO] add or update meals....');
    const today = new Date().toLocaleDateString();
    const query = `SELECT activity.id AS id, activity.quantity AS quantity FROM activity WHERE activity.mealId = ${id} and activity.activityDate = '${today}'`;
    return this.database.executeSql(query, []).then((data) => {
      let qty = 1;
      console.log('check today meal, qty : ' + data.rows.length);
      if (data.rows.length > 0) {
        qty = data.rows.item(0).quantity;
        this.updateMealToCurrentDay(id, qty + 1);
      } else {
        this.addMealToCurrentDay(id);
      }
      this.loadCurrentDayMeals();
    });
  }

  addMealToCurrentDay(id) {
    console.log('add meal to current day...');
    const data = [new Date().toLocaleDateString(), id];
    return this.database
      .executeSql('INSERT INTO activity (activityDate,mealId, quantity) VALUES (?, ?, 1)', data)
      .then(() => {
         //this.loadCurrentDayMeals();
      });
  }

  updateMealToCurrentDay(id, quantity) {
    console.log('update meal to current day to quantity : ' + quantity);
    const data = [quantity];
    const today = new Date().toLocaleDateString();
    return this.database
      .executeSql(`UPDATE activity SET quantity = ? WHERE mealId = ${id} and activity.activityDate = '${today}'`, data)
      .then(() => {
         //this.loadCurrentDayMeals();
      });
  }

  removeMealFromCurrentDay(id) {
    const today = new Date().toLocaleDateString();
    return this.database
    .executeSql(`DELETE FROM activity WHERE mealId = ? and activity.activityDate = '${today}'`, [id])
    .then((_) => {
      this.loadCurrentDayMeals();
    });

  }

  addMeal(meal) {
    const data = [meal.name, meal.calories, meal.proteins, meal.fats, meal.carbs, meal.fibers];
    return this.database
      .executeSql('INSERT INTO meals (name,calories,proteins, fats,carbs, fibers) VALUES (?, ?, ?, ?, ?, ?)', data)
      .then(() => {
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
      .then(() => {
        this.loadMeals();
      });
  }

  getNeededCalories(): any {
    console.log('[INFO] get needed calories....');
    const query = `SELECT id As id, gender As gender, age As age, weight as weight, weightgoal AS weightgoal, height as height FROM userinfo WHERE id = 1`;
    return this.database.executeSql(query, []).then((data) => {
      let o = {
        id: 0,
        weight: 0,
        gender: 1,
        age: 0,
        weightgoal: 0,
        height: 0
      };
      if (data.rows.length > 0) {
        o.id = data.rows.item(0).id;
        o.age = data.rows.item(0).age;
        o.weight = data.rows.item(0).weight;
        o.gender = data.rows.item(0).gender;
        o.weightgoal = data.rows.item(0).weightgoal;
        o.height = data.rows.item(0).height;
      }
      return o;
    });
  }

  getUserInfo(): any {
    console.log('[INFO] get user info....');
    const query = `SELECT userinfo.id As id, userinfo.email As email, userinfo.gender As gender, userinfo.age As age, userinfo.weight as weight, userinfo.weightgoal AS weightgoal, userinfo.height as height FROM userinfo WHERE id = 1`;
    return this.database.executeSql(query, []).then((data) => {
      let o = {
        id: 0,
        email:'',
        weight: 0,
        gender: 1,
        age: 0,
        weightgoal: 0,
        height: 0
      };
      if (data.rows.length > 0) {
        o.id = data.rows.item(0).id;
        o.email = data.rows.item(0).email;
        o.age = data.rows.item(0).age;
        o.weight = data.rows.item(0).weight;
        o.gender = data.rows.item(0).gender;
        o.weightgoal = data.rows.item(0).weightgoal;
        o.height = data.rows.item(0).height;
      }
      return o;
    });
  }

  updateUserInfo(user) {
    
    let data = [user.email, user.age, user.weight, user.gender, user.weightgoal, user.height];
    return this.database
      .executeSql(`UPDATE userinfo SET email = ?, age = ?, weight = ?, gender = ?, weightgoal = ?, height = ?  WHERE id = ${user.id}`, data)
      .then(() => {
      });
  }

}
