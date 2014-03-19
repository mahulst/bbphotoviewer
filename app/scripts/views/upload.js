/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'dropzone',
    'templates/templates'

], function ($, _, Backbone, Dropzone, Templates) {
    'use strict';

    var UploadView = Backbone.View.extend({
        template: Templates['upload'],
    	initialize: function () {
    		var html = this.template();
    		this.$el.html(html);
            this.Dropzone = Dropzone;
            this.$dropzoneDiv = this.$(".dropzone");
            this.$dropzoneDiv.dropzone({
                url: '/upload',
                parallelUploads: 1,
                addRemoveLinks: true,
                autoProcessQueue: false
            });
            this.dropzone = this.$dropzoneDiv[0].dropzone;
            this.dropzone.on('addedfile', this.fileAdded);
            this.dropzone.on('uploadprogress', this.uploadprogress);
            window.dropzone = this.dropzone;
            window.Dropzone = this.Dropzone;
    		return this;
    	},
        fileAdded : function (file) {
            debugger;
        },
        uploadprogress: function (file, progress, bytesSend) {

        }
    });

    return UploadView;
});
