/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
	'skrollr'
], function ($, _, Backbone, JST, skrollr) {
    'use strict';

    var BannerView = Backbone.View.extend({
        template: JST['app/scripts/templates/banner.ejs'],

//        tagName: 'div',
//
//        id: 'banner',
//
//        className: 'swiper-container',
		el : '#banner',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
			
            this.$el.html(this.template(this.model.toJSON()));
			this.$el.children('.wrapper').attr('data-0', 'top : 0px;opacity:1;');
			this.$el.children('.wrapper').attr('data-700', 'top : -100px;opacity:0.5;');
        }
    });

    return BannerView;
});
