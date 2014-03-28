/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/groups',
    'views/about',
    'views/groupdetail',
    'views/upload',
    'dropzone',
    'fancybox'
], function ($, _, Backbone, GroupsView, AboutView, GroupDetailView, UploadView, Dropzone, Fancybox) {
    'use strict';

    var AppView = Backbone.View.extend({
        id: 'app-view',
        html: [
        	"<div id=header-mh class='navbar navbar-default navbar-fixed-top'>",
        	"<a class=navbar-header href=#>photo viewer</a>",
        	"<ul class='nav navbar-nav'>",
            "<li id=nav-photos><a class=navbar-brand href=#photos>Photos</a></li>",
            "<li id=nav-about><a class=navbar-brand href=#about>About</a></li>",
            "<li id=nav-upload><a class=navbar-brand href=#upload>Upload new Photos</a></li>",
            "</ul>",
            "<p class='navbar-text pull-right'></p>",
            "</div>",
            "<div id='content'></div>"
        ].join(""),

        events: {          
        },
        views : {},
        initialize: function () {
            //set autoDiscore for Dropzone to false
            Dropzone.autoDiscover = false;
            // notification object for global events 
            Backbone.Notifications = {};
            _.extend(Backbone.Notifications, Backbone.Events);

            //listen to change of model
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(Backbone.Notifications, 'photosFetched', this.photosFetched);
            this.views['photos'] = new GroupsView({
                id: 'page-photos',
                className: 'page-view'
            });
            this.views['about'] = new AboutView({
                id: 'page-about',
                className: 'page-view'
            });
            this.views['photosDetail'] = new GroupDetailView({
                id: 'page-photosDetail',
                className: 'page-view'
            });
            this.views['upload'] = new UploadView({
                id: 'page-upload',
                className: 'page-view'
            });
            this.$el.append(this.html);

            this.$('#content').append(this.views['about'].render().el);
            this.$('#content').append(this.views['photos'].render().el);
            this.$('#content').append(this.views['photosDetail'].render().el);
            this.$('#content').append(this.views['upload'].render().el);
        },
        render : function () {
            var groupModel = this.views['photos'].collection.get(this.model.get('selectedCategoryId'));
            if(groupModel){
                this.$('.navbar-text').html(groupModel.get('groupName'));
            }
            return this;
        },
        goToPage: function (page, args) {
            var groupModel;
            this.$('.page-view').hide();
            this.$('#page-' + page).show();
            if (args && args.category) {
                this.model.set('selectedCategoryId', args.category);
                groupModel = this.views['photos'].collection.get(args.category);
                if(groupModel) {
                    this.views['photosDetail'].model = groupModel;
                    this.views['photosDetail'].render();
                }
            }
        },
        //first time photos are fetched there may be a need to re render some views. 
        photosFetched: function () {
            this.render();

            this.views['upload'].appendOptions(this.views['photos'].collection);

            //set photosCollection for active photosDetailView
            var groupModel = this.views['photos'].collection.get(this.model.get('selectedCategoryId'));
            this.views['photosDetail'].model = groupModel;
            this.views['photosDetail'].changePhotoCollection();
        }
    });

    return AppView;
});