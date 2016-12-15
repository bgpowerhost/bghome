<?php
class Footer {
	
	public function getFooter(){
		$get_menus = DB::table('footer_menus')
			->select(DB::raw('footer_menus.*, footer_groups.name'))
			->leftJoin('footer_groups', 'footer_menus.footer_groups_id', '=', 'footer_groups.id')
			->get();
		$get_groups = DB::table('footer_groups')->get();
		$footer['footer_menus'] = $get_menus;
		$footer['footer_groups'] = $get_groups;
		return $footer;
	}
	
	public function getFooterContent($content_id) {
		$content = DB::table('footer_menus')->where('id', $content_id)->get();
		return $content;
	}
	
}