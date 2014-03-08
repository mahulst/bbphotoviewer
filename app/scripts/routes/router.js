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
        	'about': 'goToAbout'
        },
        initialize: function (view) {
        	this.appView = view;
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
        } 
    });
    return Router;
});
