/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
], function ($, _, Backbone, JST) {
    'use strict';

    var FooterView = Backbone.View.extend({
        template: JST['app/scripts/templates/footer.ejs'],

//        tagName: 'div',
//
//        id: '',
//
//        className: '',
		el : '#footer',
		
        events: {},

        initialize: function () {
//            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
//            this.$el.html(this.template(this.model.toJSON()));
			var $paper = $('#paper');
			var footerHeight = this.$el.height();
			var skrollrStart = $paper.height() + $paper.offset().top - footerHeight; 
			this.$el.attr('data-' + skrollrStart, 'bottom : -100px;opacity:0.5;');
			this.$el.attr('data-' + (skrollrStart + footerHeight), 'bottom : 0px;opacity:1;');
        }
    
    });

    return FooterView;
});
