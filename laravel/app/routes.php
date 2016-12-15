<?php
//Home Page
Route::get('/','HomeController@showIndex');
//Login User Form
Route::get('/login','LoginUserController@showLoginForm');
Route::post('/login', 'LoginUserController@login');
//Register Form
Route::get('/register','RegisterUserController@showRegisterForm');
Route::post('/register','RegisterUserController@register');
//GROUP PROFILE -->
Route::group(array('prefix' => 'profile' ,'before' => 'auth'), function() {
	//Profile
	Route::get('/edit', 'ProfileController@showProfile');
	Route::post('/edit', 'ProfileController@updateProfile');
	//Add Estate
	Route::get('/add_estate', 'EstateController@showCreateEstateForm');
		//--- Add Estate Options
		Route::get('/add_estate/upload_images','EstateController@uploadImages');
		Route::get('/add_estate/upload_plans','EstateController@uploadPlans');
		Route::get('/add_estate/upload_video','EstateController@uploadVideo');
		Route::get('/add_estate/upload_docs','EstateController@uploadDocs');
		Route::get('/add_estate/rotation_images','EstateController@rotationImages');
		Route::get('/add_estate/rotation_plans','EstateController@rotationPlans');
	Route::post('/add_estate', 'EstateController@createEstate');
	//MyEstates
	Route::get('/my_estates', 'EstateController@showEstates');
	Route::get('/estate/{estate_id?}', 'EstateController@updateEstateForm');
	Route::post('/estate/{estate_id?}', 'EstateController@updateEstate');
});
// <--- END GROUP PROFILE
//GROUP ADMIN -->>
Route::group(array('prefix' => 'admin', 'before' => 'authadmin'), function() {
	//Admin
	Route::get('/', 'DashboardController@showDashBoard');
	Route::post('/edit', 'DashboardController@updateProfile');
});

Route::group(array('prefix' => 'admin', 'after' => 'authadmin'), function(){
	//Admin
	Route::get('/login', 'LoginController@showDashBoard');
	Route::post('/login', 'LoginController@showDashBoard');
});
// <-- END GROUP ADMIN
Route::get('/{estate_name?}','EstateDetailsController@showDetails');