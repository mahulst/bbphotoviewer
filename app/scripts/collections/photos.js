/*global define*/

define([
    'underscore',
    'backbone',
    'models/photo'
], function (_, Backbone, PhotoModel) {
    'use strict';

    var PhotosCollection = Backbone.Collection.extend({
        model: PhotoModel,
        url: '/photos', 
        sync: function (method, model, options) {
            return Backbone.sync(method, model, options);
        },
        parse: function (response) {
            return response;
            debugger;
        }
    });

    return PhotosCollection;
});
