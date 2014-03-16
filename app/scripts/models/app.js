/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var AppModel = Backbone.Model.extend({
        defaults: {
        	sort: '',
        	selectedCategory: null,
            selectedCategoryId: null
        }
    });

    return AppModel;
});
