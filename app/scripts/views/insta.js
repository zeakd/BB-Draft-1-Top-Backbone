/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
	'vendor/instatag',
	'collections/instaItem',
	'masonry',
	'imagesloaded',
	'jquery-bridget'
], function ($, _, Backbone, JST, Instatag, InstaItemCollection, Masonry) {
    'use strict';

    var InstaView = Backbone.View.extend({
        template: JST['app/scripts/templates/insta.ejs'],

//        tagName: 'ul',
//
//        id: 'insta',
//
//        className: 'container',
        el : '#insta',
        
        events: {},

        initialize: function () {
			var self = this;
            
            self.SATURATION = 100;
			$.bridget( 'masonry', Masonry );
			
			var insta = new Instatag({
				clientId : '7027c1eb932241d18d7c0c702794a5bb',
				tags : ['beanbrothers', '빈브라더스','bean_brothers'],
				count : 10,
				success : function(result){
                    self.container = result;
                    self.updateView.apply(self);
				}
			});
			insta.send();

			self.listenTo(self.collection, 'reset', function(){
				self.render();
			});

        },
		
        render: function () {
			
			var self = this;
			var $el = $(self.el);
            $el.children('.wrapper').remove();
			$el.append(this.template({
				instaData : this.collection.toJSON(),
                SATURATION : this.SATURATION
			}));
            var $wrapper = $el.children('.wrapper');  
            $wrapper.hide();
            var $loading = $el.children('.loading');
			
//			if($(self.el).masonry) $(self.el).masonry('destroy');
			$el.imagesLoaded(function(){
				var $masonry = $wrapper;
                $masonry.fadeIn();
                $loading.hide();
				var msnry = $masonry.data('masonry');
				if(msnry) {
//					$masonry.masonry('reloadItems');			
				}
				$masonry.masonry({
					itemSelector : '.insta-item',
					columnWidth: '.item-small'
				});
                
			});
			
			return this;
        },
		updateView : function(){
            var self = this;
//			var $el = $(this.el);
//			var $masonry = $el.find('.wrapper');
//			$masonry.masonry('reloadItems');
            if($(window).width() < 767){
                self.collection.reset(self.makeFit(self.container, 24));  
            } else {
                self.collection.reset(self.makeFit(self.container, 48));  
            }
            
		},
        makeFit : function(data, count){
            var self = this;
            var result = [];
            $.each(data, function(idx, value){
                var size;
                if( value.likes.count > self.SATURATION && count > 11){
                    size = 4;
                    value.putViewSize = 'big';
                } else {
                    size = 1;   
                    value.putViewSize = 'small';
                }
                count -= size;
                if(count < 0){
                    return false;   
                } else {
                    result[result.length] = value;   
                }
//                var size;
//                if( value.likes.count > self.SATURATION ){
//                    size = 4;
//                } else {
//                    size = 1;   
//                }
//                num -= size;
//                if(num < 0 ){
//                    return false;
//                } else if (size > 1 && num < 7 ){
//                    return true;   
//                } else {     
//                    result[result.length] = value;  
//                } 
//                
            });
            return result;
        }
    });

    return InstaView;
});
