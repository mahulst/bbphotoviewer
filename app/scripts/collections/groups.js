/*global define*/

define([
    'underscore',
    'backbone',
    'models/group'
], function (_, Backbone, GroupModel) {
    'use strict';

    var GroupsCollection = Backbone.Collection.extend({
        model: GroupModel,
        initialize: function () {
            
        }
    });

    return GroupsCollection;
});
