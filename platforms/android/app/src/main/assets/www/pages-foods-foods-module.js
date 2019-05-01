(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-foods-foods-module"],{

/***/ "./src/app/pages/foods/foods.module.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/foods/foods.module.ts ***!
  \*********************************************/
/*! exports provided: FoodsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoodsPageModule", function() { return FoodsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _foods_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./foods.page */ "./src/app/pages/foods/foods.page.ts");







var routes = [
    {
        path: '',
        component: _foods_page__WEBPACK_IMPORTED_MODULE_6__["FoodsPage"]
    }
];
var FoodsPageModule = /** @class */ (function () {
    function FoodsPageModule() {
    }
    FoodsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_foods_page__WEBPACK_IMPORTED_MODULE_6__["FoodsPage"]]
        })
    ], FoodsPageModule);
    return FoodsPageModule;
}());



/***/ }),

/***/ "./src/app/pages/foods/foods.page.html":
/*!*********************************************!*\
  !*** ./src/app/pages/foods/foods.page.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar>\n    <ion-title>foods</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/pages/foods/foods.page.scss":
/*!*********************************************!*\
  !*** ./src/app/pages/foods/foods.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Zvb2RzL2Zvb2RzLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/foods/foods.page.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/foods/foods.page.ts ***!
  \*******************************************/
/*! exports provided: FoodsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FoodsPage", function() { return FoodsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var FoodsPage = /** @class */ (function () {
    function FoodsPage() {
    }
    FoodsPage.prototype.ngOnInit = function () {
    };
    FoodsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-foods',
            template: __webpack_require__(/*! ./foods.page.html */ "./src/app/pages/foods/foods.page.html"),
            styles: [__webpack_require__(/*! ./foods.page.scss */ "./src/app/pages/foods/foods.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], FoodsPage);
    return FoodsPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-foods-foods-module.js.map