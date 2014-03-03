/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var AppModel = Backbone.Model.extend({
        defaults: {
        	sort: '',
        	selectedCategory: null
        }
    });

    return AppModel;
});
