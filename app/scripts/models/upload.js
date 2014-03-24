/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var UploadModel = Backbone.Model.extend({
        defaults: {
        	category: null
        }
    });

    return UploadModel;
});
