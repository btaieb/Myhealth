import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'foods', loadChildren: './foods/foods.module#FoodsPageModule' },
  { path: 'plan', loadChildren: './plan/plan.module#PlanPageModule' },
  { path: 'meals', loadChildren: './meals/meals.module#MealsPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  { path: 'create-meal', loadChildren: './create-meal/create-meal.module#CreateMealPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
