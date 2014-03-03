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
        	category: 'none'

        }
    });

    return PhotoModel;
});
