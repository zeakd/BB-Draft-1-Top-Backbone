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

        tagName: 'ul',

        id: 'insta',

        className: 'container',

        events: {},

        initialize: function () {
			var self = this;
			
			$.bridget( 'masonry', Masonry );
//			$.bridget( 'imagesLoaded', ImagesLoaded );
			
			var insta = new Instatag({
				clientId : '7027c1eb932241d18d7c0c702794a5bb',
				tags : ['beanbrothers', '빈브라더스'],
				count : 10,
				success : function(result){
					self.collection.reset(result);
				}
			});


			insta.send();

            this.listenTo(this.collection, 'add', function(instaItem){
				console.log('add : ', instaItem);	
			});
			this.listenTo(self.collection, 'update', function(instaCollection){
				console.log('update', JSON.stringify(instaCollection, ['id','link','created_time'],'\t'));
			});
			this.listenTo(self.collection, 'change', function(instaCollection){
				console.log('change', JSON.stringify(instaCollection, ['id','link','created_time'],'\t'));
			});
			self.listenTo(self.collection, 'reset', function(coll){
				console.log('reset', coll);	
				self.render();
			});

        },
		
        render: function () {
			
			var self = this;
			var $el = $(self.el);

			$el.css('visibility', 'hidden');
			this.$el.html(this.template({
				instaData : this.collection.toJSON()
			}));
			
//			if($(self.el).masonry) $(self.el).masonry('destroy');
			$el.imagesLoaded(function(){
				var $masonry = $el.find('.wrapper');
				var msnry = $masonry.data('masonry');
				if(msnry) {
					$masonry.masonry('reloadItems');			
				}
				$masonry.masonry({
//					gutter : 10, // bootstrap row

//					columnWidth: 100,
					itemSelector : '.insta-item',
					columnWidth: '.item-small'
				});
//				var msnry = $(self.el).data('masonry');
//				$masonry.nested({
//					selector: '.insta-item',
//					minWidth : 100,
//					gutter : 5,
//					animate : true
//				});
				$el.css('visibility', 'visible');
			});
			
			return this;
        },
		updateCoeff : function(){
			var $el = $(this.el);
			var $masonry = $el.find('.wrapper');
			$masonry.masonry('reloadItems');	
		}
    });

    return InstaView;
});
