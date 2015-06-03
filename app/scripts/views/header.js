/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone) {
    'use strict';

    var HeaderView = Backbone.View.extend({
		el : '#desktop-header',

		initialize: function () {
			this.updateCoeff();
			
			var self = this;
			
			var $window = $(window);
			var $el = self.$el;
			
			$window.scroll(function(){
				if($window.scrollTop() > self.paperTop){
					$el.removeClass('navbar-inverse').addClass('navbar-default');
				} else {
					$el.removeClass('navbar-default').addClass('navbar-inverse');
				}
			});
        },
		
		updateCoeff: function () {
			this.paperTop = $('#paper').offset().top - 40;
		}
    });

    return HeaderView;
});
