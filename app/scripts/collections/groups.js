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
        parse: function(response){
            var returnArr = [],
                i,
                n,
                group,
                parsedGroup;
            for(i = 0, n = response.length; i < n; i += 1) {
                group = response[i];
                parsedGroup = {
                    groupId : group.categories_id,
                    groupName : group.categories_name
                }
                returnArr.push(parsedGroup);
            }
            return returnArr;
        }
    });

    return GroupsCollection;
});
