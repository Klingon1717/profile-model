var Backbone = require('backbone');
var UserModel = require('./models/UserModel');
var $ = require('jquery');
window.jQuery = $;
var bootstrap = require('bootstrap');

var user = new UserModel();
var App = Backbone.Router.extend({
	routes: {
		'': 'profile',
		'edit': 'edit'
	},
	profile: function() {
		$('.page').hide();
		$('#profile').show();
	},
	edit: function() {
		$('.page').hide();
		$('#edit').show();
	}
});

var app = new App();
Backbone.history.start();

var $nameInput = $('#name');
var $emailInput = $('#inputEamil3');
var $roleInput = $('#role');

$('#edit').find('button').click('submit',function(e){
	e.preventDefault();
	user.set({
		
		name: $nameInput.val(),
		email:$emailInput.val(),
		role: $roleInput.val()
	})
	console.log(user);
	$.post(
		'http://tiyfe.herokuapp.com/collections/lifeonvenus',
		{
			name: user.get('name'),
			email: user.get('email'),
			role: user.get('role')
		},
		'JSON'
	);
});
user.on('change', function(){
	$('.navbar-right .dropdown .dropdown-toggle ').text(user.get('name'));
	$('.profile-usertitle-name').text(user.get('name'));
	$('.profile-usertitle-job').text(user.get('role'));
})