/*global require*/
'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: [
                'jquery'
            ]
        },
        wow: {
            exports: 'WOW'   
        }
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
        swiper: '../bower_components/swiper/dist/js/swiper',
        outlayer: '../bower_components/outlayer',
        'get-size': '../bower_components/get-size',
        'fizzy-ui-utils': '../bower_components/fizzy-ui-utils',
        eventie: '../bower_components/eventie',
        eventEmitter: '../bower_components/eventEmitter',
        'get-style-property': '../bower_components/get-style-property',
        'doc-ready': '../bower_components/doc-ready',
        'matches-selector': '../bower_components/matches-selector',
        'jquery-bridget': '../bower_components/jquery-bridget/jquery.bridget',
        imagesloaded: '../bower_components/imagesloaded/imagesloaded',
		'jquery-nested': '../bower_components/nested/jquery.nested'
    },
    packages: [
        
    ]
});

require([
    'backbone',
  	'views/app',
	'routes/app',
	'bootstrap'
], function (Backbone, AppView, Workspace) {
	new AppView();
    Backbone.history.start();
	new Workspace();
});
