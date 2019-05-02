# MyHealth
=======
## Context

Chaque jour, votre corps a besoin d’énergie pour fonctionner et accomplir correctement ses missions. Cette énergie nous est fournie par les aliments que nous consommons. Et elle s’exprime en calories. 

L’unité de mesure de l’énergie couramment utilisée en nutrition est ce que l’on appelle la kilocalorie (kcal) : 1 kcal = 1 000 calories.

Alors, pour évaluer le "juste" nombre de calories dont vous avez besoin chaque jour pour maintenir votre poids stable, il existe une formule.

Commencez par calculer votre métabolisme de base :

- MALE : 66,5 + (13,75 X poids) + (5 X taille)- (6,77 X âge)
- FEMALE : 655 + (9,56 X poids) + (1,85 X taille) – (4,67 X âge)

Ensuite, selon votre niveau d’activité, multipliez le chiffre obtenu par :

1,2 si vous avez un travail de bureau ou une faible dépense sportive (profil sédentaire)
1,375 si vous vous entraînez 1 à 3 fois par semaine (profil profil légèrement actif)
1,55 si vous vous entraînez 4 à 6 fois par semaine (profil actif)
1,725 si vous faites quotidiennement du sport ou des exercices physiques soutenus (profil très actif).

## Tools
- Visual Studio Code
- Ionic Framework 4 (+Ionic Cli)
- Angular 7
- Apache Cordova : Mobile apps with HTML, CSS & JS, 
Target multiple platforms with one code base, Free and open source

- Sqlite + Cordova plugin for Sqlite Storage


## Install Android Studio/Android Sdk

https://developer.android.com

- Download and install jdk 1.8
- Download and install android studio
- Install Android SDK from Android Studio

- Accept android licenses :
\AppData\Local\Android\Sdk\tools\bin\sdkmanager.bat --licenses

## Install/Configure Ionic

- Install ionic v4
npm install -g ionic

- Install cordova 
npm install -g cordova

- generate project using sidemenu template 
ionic start myhealth sidemenu

- To install/update all packages of package.json when updating this file
npm install

- Change directory to application directory
cd myhealth

- Add cordova plugin sqlitestorage 
ionic cordova plugin add cordova-sqlite-storage

- Install npm package sqlite (add to package.json + npm install):
"@ionic-native/sqlite": "^5.4.0"
"cordova-sqlite-storage": "3.2.0"

- Add cordova browser plugin :
ionic cordova platform add browser

- Add android emulator using cordova
cordova platform add android

- Add corova plugin sqliteporter : import/export to/from a SQLite database using either SQL or JSON.
ionic cordova plugin add uk.co.workingedge.cordova.plugin.sqliteporter

- install npm package sqlite porter
npm install @ionic-native/sqlite-porter

- Configure module AppModule :

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  ....
  HttpClientModule
  ],
  providers: [
    ...
	SQLitePorter,
    SQLite
  ],
  bootstrap: [AppComponent]
})

// To add route , edit AppRoutingModule :
const routes: Routes = [
  ...
  { path: 'foods', loadChildren: './pages/foods/foods.module#FoodsPageModule' }
];

## Ionic Cli
- generate database service
ionic g service services/database

- generate page 
ionic g page meals

## Ionic Cordova
- Run as web application for development (node server)
ionic serve

- Run on browser (if not using sqlite)
ionic cordova run browser

//Run on android
ionic cordova run android -l -c -s

## Android Sdk Tools

cd /Users/username/Library/Android/sdk
cd /tools
// list emulators
./emulator -list-avds

## Android Studio Logcat
- View Logcat :
View ->Tool Windows->Logcat 

- Add Logcat filter :
chromium

## Useful Links

- https://ionicframework.com/docs
- https://angular.io/guide/quickstart
- https://devdactic.com/ionic-4-sqlite-queries/
- https://www.youtube.com/watch?v=fZ4giHzXfSg
- 




