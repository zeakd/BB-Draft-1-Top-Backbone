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
            
            self.SATURATION = 120;
			$.bridget( 'masonry', Masonry );
			
			var insta = new Instatag({
				clientId : '7027c1eb932241d18d7c0c702794a5bb',
				tags : ['beanbrothers', '빈브라더스','bean_brothers'],
				count : 10,
				success : function(result){
                    self.container = result;
                    self.collection.reset(self.makeFit(result));
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
					$masonry.masonry('reloadItems');			
				}
				$masonry.masonry({
					itemSelector : '.insta-item',
					columnWidth: '.item-small'
				});
                
			});
			
			return this;
        },
		updateView : function(){
			var $el = $(this.el);
			var $masonry = $el.find('.wrapper');
			$masonry.masonry('reloadItems');	
		},
        makeFit : function(data){
            var self = this;
            var num = 48;
            var result = [];
            $.each(data, function(idx, value){
                var size;
                if( value.likes.count > self.SATURATION ){
                    size = 4;
                } else {
                    size = 1;   
                }
                num -= size;
                if(num < 0 ){
                    return false;
                } else if (size > 1 && num < 7 ){
                    return true;   
                } else {     
                    result[result.length] = value;  
                } 
            });
            return result;
        }
    });

    return InstaView;
});
