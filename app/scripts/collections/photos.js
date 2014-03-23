/*global define*/

define([
    'underscore',
    'backbone',
    'models/photo'
], function (_, Backbone, PhotoModel) {
    'use strict';

    var PhotosCollection = Backbone.Collection.extend({
        model: PhotoModel,
        initialize: function (models, options) {
            if(options){
        	   this.group = options.group;
            }
            this.fetch({
                url: [
                    "groups/",
                    this.group.get('groupId'),
                    "/photos"
                ].join(""),
                reset: true
            });
        },
        parse: function(response){
            var returnArr = [],
                i,
                n,
                photo,
                parsedPhoto;
            for(i = 0, n = response.length; i < n; i += 1) {
                photo = response[i];
                parsedPhoto = {
                    "photoId": photo.photos_id,
                    "photoName": photo.photos_name,
                    "src": photo.path,
                    "dateAdded": photo.created,
                    "categoryId": photo.categories_id,
                }
                returnArr.push(parsedPhoto);
            }
            return returnArr;
        }
    });

    return PhotosCollection;
});
