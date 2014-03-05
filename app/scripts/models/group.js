/*global define*/

define([
    'underscore',
    'backbone',
    'collections/photos'
], function (_, Backbone, PhotosCollection) {
    'use strict';

    var GroupModel = Backbone.Model.extend({
        defaults: {
        	category: 'none',
            groupName: ''
        },
        initialize: function () {
            this.photos = new PhotosCollection([], {
                group: this
            });
        }
    });

    return GroupModel;
});
