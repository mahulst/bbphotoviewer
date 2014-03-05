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
        },
        getPhotos: function () {
        	this.each(function (group) {
        		group.photos.fetch({
        			url: [
        				"groups/",
        				group.get('groupId'),
        				"/photos"
        			].join("")

        		});
        	});
        }
    });

    return GroupsCollection;
});
