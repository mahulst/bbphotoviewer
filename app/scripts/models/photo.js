/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var PhotoModel = Backbone.Model.extend({
        defaults: {
        	src: 'images/no-image.png',
        	name: '',
        	category: 'none',
            dateAdded: "1970-1-1"
        }
    });

    return PhotoModel;
});
