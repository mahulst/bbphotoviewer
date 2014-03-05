/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/photos',
    'templates/templates'
], function ($, _, Backbone, PhotosCollection, Templates) {
    'use strict';

    var PhotosView = Backbone.View.extend({
        template: Templates['photos'],
    	initialize: function () {
    		var html = '';//this.template(this.model.toJSON());
    		this.$el.html(html);
            this.$bodyEl = this.$('.panel-body');
    	},
        render : function () {
           
            return this;
        }
    });

    return PhotosView;
});
