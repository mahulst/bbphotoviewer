/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/photos',
    'models/group',
    'templates/templates'
], function ($, _, Backbone, PhotosCollection, GroupModel, Templates) {
    'use strict';

    var GroupDetailView = Backbone.View.extend({
        template: Templates['photos'],
        initialize: function () {

    		var html = 'group detail';//this.template(this.model.toJSON());
    		this.$el.html(html);
            this.listenTo(Backbone.Notifications, "selectPhoto", this.selectPhoto);
    	},
        render : function () {
            var photos = this.model ? this.model.photos.toJSON() : [];
            var html = this.template({photos: photos});
            this.$el.html(html);
            return this;
        },
        selectPhoto: function (photoId) {
            if(this.model) {
                this.selectedPhoto = this.model.photos.get(photoId);
            }
        },
        changePhotoCollection : function () {
            if(this.model){
                this.listenTo(this.model.photos, "reset", this.render);            
            }
        }
    });

    return GroupDetailView;
});
