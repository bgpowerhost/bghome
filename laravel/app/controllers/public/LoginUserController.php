<?php
class LoginUserController extends Controller {
	
	public $theme;
	private $classes;
	public function __construct() {
		$this->theme = Config::get('app.theme');
	}
	
	public function module($module, $argument = null) {
		return new $module($argument);
	}

	public function showLoginForm() {
		$page_data = array(
			'page_name' => Lang::get('public.home'),
			'footer' => $this->module('Footer')->getFooter(),
		);
		return View::make('pages.login', $page_data);
	}

	public function login() {
		$post = Input::get();
		return $this->module('Login')->login();
	}

	public function logout(){
		Auth::logout();
		return Redirect::to('/');
	}
}