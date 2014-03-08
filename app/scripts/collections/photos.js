/*global define*/

define([
    'underscore',
    'backbone',
    'models/photo'
], function (_, Backbone, PhotoModel) {
    'use strict';

    var PhotosCollection = Backbone.Collection.extend({
        initialize: function (models, options) {
            if(options){
        	   this.group = options.group;
            }
            this.fetch({
                url: [
                    "groups/",
                    this.group.get('groupId'),
                    "/photos"
                ].join(""),
                reset: true
            });
        }
    });

    return PhotosCollection;
});
