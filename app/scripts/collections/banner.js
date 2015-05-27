/*global define*/

define([
    'underscore',
    'backbone',
    'models/banner'
], function (_, Backbone, BannerModel) {
    'use strict';

    var BannerCollection = Backbone.Collection.extend({
        model: BannerModel
    });

    return BannerCollection;
});
