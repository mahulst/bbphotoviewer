/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'views/photos',
    'views/about'
], function ($, _, Backbone, PhotosView, AboutView) {
    'use strict';

    var AppView = Backbone.View.extend({
        id: 'app-view',
        html: [
        	"<div class=navbar>",
        	"<a class=navbar-brand href=#>photo viewer</a>",
        	"<ul class='nav navbar-nav'>",
            "<li id=nav-photos><a class=navbar-brand href=#photos>photos</a></li>",
            "<li id=nav-about><a class=navbar-brand href=#about>about</a></li>",
            "</ul>",
            "<p class='navbar-text pull-right'></p>",
            "</div>",
            "<div id='content'></div>"
        ].join(""),

        events: {          
        },
        views : {},
        initialize: function () {
            //listen to change of model
            this.listenTo(this.model, 'change', this.render);

            this.views['photos'] = new PhotosView({
                id: 'page-photos',
                className: 'page-view'
            });
            this.views['about'] = new AboutView({
                id: 'page-about',
                className: 'page-view'
            });
            this.$el.append(this.html);

            this.$('#content').append(this.views['about'].render().el);
            this.$('#content').append(this.views['photos'].render().el);
        },
        render : function () {
            this.$('.navbar-text').html(this.model.get('selectedCategory'));
            return this;
        },
        goToPage: function (page, category) {
            //nav bar set active element for current page
            this.$('.nav li').removeClass('active');
            this.$('#nav-'+page).addClass('active');
            this.$('.page-view').hide();
            this.$('#page-' + page).show();

            this.model.set('selectedCategory', category);
        }
    });

    return AppView;
});