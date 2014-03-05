/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/photos',
    'collections/groups',
    'collections/photos',
    'templates/templates'
], function ($, _, Backbone, PhotosView, GroupsCollection, PhotosCollection, Templates) {
    'use strict';

    var GroupsView = Backbone.View.extend({
        html: [
            "<h3> photo view </h3>",
            "<div id=photo-list class='clearfix'>loading...</div>",
            "<div id=photo-filters></div>"
        ].join(""),
        template: Templates['group'],
        initialize : function () {
            var that = this;
            //anchors
            this.$el.html(this.html);
            this.$groupList = this.$("#photo-list");
            this.$photoFilters = this.$("#photo-filters");
            this.collection = new GroupsCollection([], {
                url: '/groups'
            });
            this.collection.once('reset', this.initGroups);
            this.listenTo(this.collection, 'reset', this.render);
            this.collection.fetch({
                reset: true
            });
            window.debug = this.collection;
        },

    	render: function () {
            var photoView;
            if (this.collection.length) {
                var photoHtml = [];
                this.collection.each(function (element, index, list) {
                    photoView = new PhotosView({
                        collection: element.photos
                    });
                    // photoHtml.push(photoView.render().el);
                });
                this.$groupList.html(photoHtml.join(""));
            } else {
                this.$groupList.html("no photos to display");
            }
    		return this;
    	}
    });

    return GroupsView;
});
