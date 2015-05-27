/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var HeaderView = Backbone.View.extend({
		el : '#desktop-header',

		initialize: function () {
			this.updateCoeff();
			
			var self = this;
			
			var $window = $(window);
			var $el = this.$el;
			var paperTop = this.paperTop;
			
			$window.scroll(function(){
				$window.scrollTop() > self.paperTop	? ($el.removeClass('navbar-inverse').addClass('navbar-default')) : ($el.removeClass('navbar-default').addClass('navbar-inverse'));
			});
        },
		
		updateCoeff: function () {
			this.paperTop = $('#paper').offset().top - 40;
		}
    });

    return HeaderView;
});
