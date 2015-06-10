/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
	'collections/instaItem',
	'views/insta',
	'skrollr',
    'wow'
], function ($, _, Backbone, JST, InstaItemCollection, InstaView, Skrollr, WOW) {
    'use strict';

    var AppView = Backbone.View.extend({
		el : '#shell',
		
        events: {},
		
        initialize: function () {
            var self = this;
            
            var $el = $(self.el);
            var $paper = self.$paper = $el.find('#paper');
            
            self.paperTop = self.$paper.offset().top - 50;
            
            var $header = $el.children('#header');
            var $footer = $el.children('#footer');
            var $banner = $el.find('#banner');
            var $holeBg = $el.find('.hole-bg');
            
            
            

            // #header init 
            
            var $window = this.$window = $(window);
			$window.on('resize', this.updateConst.bind(this));            
            $window.scroll(function(){
				if($window.scrollTop() > self.paperTop){
					$header.removeClass('navbar-default').addClass('navbar-inverse');
				} else {
					$header.removeClass('navbar-inverse').addClass('navbar-default');
				}
			});
            this.$window.load(function(){
                var $el = $(self.el);
//                $el.css('visibility', 'visible');
//                $el.css('opacity', 1);
                $el.fadeIn();
                this.instaItems = new InstaItemCollection();
                this.instaView = new InstaView({
                    collection : this.instaItems	
                });
            });
            // #footer init
            
            var footerHeight = $footer.height();
			var footerSkrollrStart = $paper.height() + $paper.offset().top - footerHeight; 
			$footer.attr('data-' + footerSkrollrStart, 'bottom : -100px;opacity:0.5;');
			$footer.attr('data-' + (footerSkrollrStart + footerHeight), 'bottom : 0px;opacity:1;');
            			
            // #banner init
            var $bannerWrapper = $banner.children('.wrapper');
            
            
            $bannerWrapper.attr('data-0', 'top : 0px;opacity:1;');
			$bannerWrapper.attr('data-700', 'top : 300px;opacity:0.5;');

            var $newsItems = $el.find('.news-item');
            
            function random(arr){
                for( var i = arr.length -1 ; i > 0; --i){
                    var randI = Math.floor(Math.random() * ( i + 1));
                    var tmp = arr[i];
                    arr[i] = arr[randI];
                    arr[randI] = tmp;
                }
                return arr;
            }
            function increaseArr(length){
                var arr = [];
                for( var i = length; i > 0; --i){
                    arr[arr.length] = i;   
                }
                return arr;
            }
            
            var delayList = random(increaseArr($newsItems.length));
            var delayGap = 0.3;
            $newsItems.each(function(){
                $(this).addClass('wow fadeInUp');
                $(this).attr('data-wow-delay', delayList.pop() * delayGap + 's');
            });
            
            var $holeBgImg = $holeBg.children('img');
            
            $holeBgImg.attr('data-0', 'top : -1000px;');
			$holeBgImg.attr('data-1000', 'top : -2000px;');

			
			if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
				Skrollr.init({
					forceHeight : false,
					smoothScrollingDuration : 50
				});
			}
            new WOW().init();
            
            
            self.render();
            

        },
		updateConst: function () {
			this.paperTop = this.$paper.offset().top - 50;
			this.instaView.updateView();
		},
        render: function () {

//            this.instaView.setElement('#insta');
//			this.$el.append(this.instaView.render().el);

//            this.$el.html(this.template(this.model.toJSON()));
        }
		
		
    });

    return AppView;
});
