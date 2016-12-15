<?php
class HomeController extends Controller {
	
	public $theme;
	private $classes;
	public function __construct() {
		$this->theme = Config::get('app.theme');
	}
	
	public function module($module, $argument = null) {
		return new $module($argument);
	}
	
	public function showIndex()
	{
		
	}

}
