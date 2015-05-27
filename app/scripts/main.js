/*global require*/
'use strict';

require.config({
    shim: {
		bootstrap : { 'deps' :['jquery']}
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/lodash/dist/lodash',
        lodash: '../bower_components/lodash/dist/lodash.compat',
        masonry: '../bower_components/masonry/masonry',
        modernizr: '../bower_components/modernizr/modernizr',
        requirejs: '../bower_components/requirejs/require',
        'requirejs-text': '../bower_components/requirejs-text/text',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
        skrollr: '../bower_components/skrollr/src/skrollr',
        wow: '../bower_components/wow/dist/wow',
        swiper: '../bower_components/swiper/dist/js/swiper'
    },
    packages: [

    ]
});

require([
    'backbone',
  	'views/app',
	'routes/app',
	'bootstrap'
], function (Backbone, AppView, Workspace, bootstrap) {
	new AppView();
    Backbone.history.start();
	new Workspace();
});
