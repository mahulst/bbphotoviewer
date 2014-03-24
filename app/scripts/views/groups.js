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

            //if page is opened from another url than plain index, views need to be rerendered after collection has been fetched
            this.collection.once('reset', this.collectionFetched);

            this.listenTo(this.collection, 'reset', this.render);
            this.collection.fetch({
                reset: true
            });

            //listen to uploadedphotos event
            this.listenTo(Backbone.Notifications, 'photosUploaded', this.reFetch);
        },

    	render: function () {
            var photosView,
                that = this;
                this.$groupList.html('');
            if (this.collection.length) {
                this.collection.each(function (element, index, list) {
                    var $groupEl,
                    $groupBodyEl;
                    //create html for groupelement
                    $groupEl = $(that.template(element.toJSON()));
                    that.$groupList.append($groupEl);
                    //photosview needs body-element from groupelem
                    $groupBodyEl = $('.panel-body', $groupEl);
                    //set body-element as element to render to in photoview
                    photosView = new PhotosView({
                        el: $groupBodyEl[0],
                        collection: element.photos
                    });
                    //render photosview
                    photosView.render();
                    //add group element to this view
                });
            } else {
                this.$groupList.html("no photos to display");
            }
    		return this;
    	},
        collectionFetched: function (e) {
            Backbone.Notifications.trigger('photosFetched');
        },
        reFetch: function () {
            this.collection.fetch({
                reset: true
            });
        }
    });

    return GroupsView;
});
