/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
	'collections/banner',
	'collections/instaItem',
	'views/header',
	'views/banner',
	'views/footer',
	'views/insta',
	'skrollr'
], function ($, _, Backbone, JST, BannerCollection, InstaItemCollection,HeaderView, BannerView, FooterView, InstaView, skrollr) {
    'use strict';

    var AppView = Backbone.View.extend({
		el : '#shell',
		
        events: {},
		
        initialize: function () {
			$(window).on('resize', this.updateViews.bind(this));
			
			this.bannerResult = new BannerCollection();
			this.instaItems = new InstaItemCollection();
			
			this.headerView = new HeaderView();
			this.footerResultView = new FooterView();
			this.bannerResultView = new BannerView({model : this.bannerResult});
			this.instaView = new InstaView({
				collection : this.instaItems	
			});
			
			
			this.render();
			
			if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
				skrollr.init({
					forceHeight : false,
					smoothScrollingDuration : 50
				});
			}
			
			
			
        },
		updateViews: function () {
			this.headerView.updateCoeff();	
			this.instaView.updateCoeff();
		},
        render: function () {
			this.bannerResultView.setElement('#'+this.bannerResultView.el.id).render();
			this.footerResultView.render();
			this.instaView.setElement('#insta');
//			this.$el.append(this.instaView.render().el);
			this.$el.css('visibility', 'visible');
			this.$el.css('opacity', 1);
//            this.$el.html(this.template(this.model.toJSON()));
			
        }
		
		
    });

    return AppView;
});
