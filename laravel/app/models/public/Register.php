<?php
class Register {

	private $post;
	public function __construct($post) {
		$this->post = $post;
	}

	public function register(){
		$post = $this->post;
		if($post['regtype'] == 'individual') {
			$rules = array(
				'regtype' => 'required',
				'name' => 'required',
				'family' => 'required',
				'email' => 'required|email|unique:users',
				'phone' => 'required',
				'password' => 'required',
				'confirm_password' => 'required',
				'confirm_password' => 'required|same:password'
			);
		} elseif($post['regtype'] == 'legal_entity') {
			$rules = array(
				'regtype' => 'required',
				'name' => 'required',
				'family' => 'required',
				'company_name' => 'required',
				'category_id' => 'required',
				'address' => 'required',
				'email' => 'required|email|unique:users',
				'phone' => 'required',
				'password' => 'required',
				'confirm_password' => 'required',
				'confirm_password' => 'required|same:password',
			);
		}
		$validator = Validator::make($post,$rules);
		if ($validator->fails()) {
			foreach ($validator->messages()->all('<li>:message</li>') as $message)
			{
				echo $message;
			}
		} else {
			return $this->_saveUser();
		}
	}
	private function _saveUser() {
		$post = $this->post;
		$user = new User;
		$user->regtype = $post['regtype'];
		$user->name = $post['name'];
		$user->family = $post['family'];
		$user->category_id = $post['category_id'];
		$user->address = $post['address'];
		$user->email = $post['email'];
		$user->phone = $post['phone'];
		$user->password = Hash::make($post['password']);
		$user->save();
		Auth::attempt(array('email' => $post['email'], 'password' => $post['password']));
		return Redirect::to('/');
	}
}