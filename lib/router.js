Router.configure({
  layoutTemplate: 'layout'
});

// Routes
Router.route('/', function () {
  this.render('dashboard');
});

Router.route('/login', function () {
  this.render('login');
});

Router.route('/admin', function () {
  this.render('admin');
});

Router.route('/confirmed', function () {
  this.render('confirmed');
});


        