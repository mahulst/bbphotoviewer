/*global define*/

define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var Router = Backbone.Router.extend({
        routes: {
        	'': 'goToPhotos',
            'photos/:category': 'goToPhotos',
            'photos': 'goToPhotos',
            'upload': 'goToUpload',
        	'about': 'goToAbout'
        },
        initialize: function (view) {
        	this.appView = view;
            this.listenTo(Backbone.Notifications, "navigate", this.navigateTo);
        },
        goToPhotos : function (category) {
            if(category) {
                this.appView.goToPage('photosDetail', {category: category});
            } else {
        	   this.appView.goToPage('photos');
            }
        },
        goToAbout: function () {
            this.appView.goToPage('about');
        },
        goToUpload: function () {
            this.appView.goToPage('upload');
        },
        navigateTo: function (url) {
            this.navigate(url, {trigger: true});
        } 
    });
    return Router;
});
