/*global define*/

define([
    'views/app',
    'models/app',
    'routes/router'
], function (AppView, AppModel, Router) {
    'use strict';

    var initialize = function () {
        //debug object
        window.debug = {};
        //appmodel
        var appModel = new AppModel();

        //appview
        var appView = new AppView({model: appModel});
        $('body').append(appView.el);

        //router
        var router = new Router(appView);
        Backbone.history.start(); 
    }
    return {
        initialize: initialize
    }
});
