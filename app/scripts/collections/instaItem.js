/*global define*/

define([
    'underscore',
    'backbone',
    'models/instaItem'
], function (_, Backbone, InstaItemModel) {
    'use strict';

    var InstaItemCollection = Backbone.Collection.extend({
        model: InstaItemModel
    });

    return InstaItemCollection;
});
