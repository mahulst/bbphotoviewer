/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/photos',
    'templates/templates'
], function ($, _, Backbone, PhotosCollection, Templates) {
    'use strict';

    var GroupDetailView = Backbone.View.extend({
        template: Templates['photos'],
    	initialize: function () {
    		var html = 'group detail';//this.template(this.model.toJSON());
    		this.$el.html(html);

    	},
        render : function () {
            return this;
        }
    });

    return GroupDetailView;
});
