/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
	'collections/banner',
	'views/header',
	'views/banner',
	'views/footer',
	'skrollr'
], function ($, _, Backbone, JST, BannerCollection, HeaderView, BannerView, FooterView, skrollr) {
    'use strict';

    var AppView = Backbone.View.extend({
		el : '#shell',
		
        events: {},
		
        initialize: function () {
			$(window).on("resize", this.updateCoeff.bind(this));
			
			this.bannerResult = new BannerCollection();
			
			this.headerResultView = new HeaderView();
			this.footerResultView = new FooterView();
			this.bannerResultView = new BannerView({model : this.bannerResult});
			
			this.render();
			
			if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
				skrollr.init({
					forceHeight : false,
					smoothScrollingDuration : 50
				});
			}
			
			
			
        },
		updateCoeff: function () {
			this.headerView.updateCoeff();	
		},
        render: function () {
			this.bannerResultView.setElement("#"+this.bannerResultView.el.id).render();
			this.footerResultView.render();
			this.$el.css('visibility', 'visible');
			this.$el.css('opacity', 1);
//            this.$el.html(this.template(this.model.toJSON()));
			
        }
		
		
    });

    return AppView;
});
