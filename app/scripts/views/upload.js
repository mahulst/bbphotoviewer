/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'dropzone',
    'models/upload',
    'templates/templates'

], function ($, _, Backbone, Dropzone, UploadModel, Templates) {
    'use strict';

    var UploadView = Backbone.View.extend({
        template: Templates['upload'],

        model: new UploadModel(),
        events: {
            'change #uploadCategory': 'categorySelected'
        },
    	initialize: function () {
    		var html = this.template(),
                that = this;
    		this.$el.html(html);
            this.$categorySelectDiv = this.$('.category-select');
            this.$categorySelect = this.$('#uploadCategory');
            this.Dropzone = Dropzone;
            this.$dropzoneDiv = this.$(".dropzone");
            this.$dropzoneDiv.dropzone({
                url: '/upload',
                parallelUploads: 1
            });
            this.dropzone = this.$dropzoneDiv[0].dropzone;
            this.dropzone.on("complete", function () {that.photoUploaded()});
            this.$dropzoneDiv.hide();
    		return this;
    	},
        fileAdded : function (file) {
            debugger;
        },
        render: function () {
            this.$('.breadcrumbs').html('> Upload / ' + this.$( ".category-select option:selected" ).text());
            return this;
        },
        uploadprogress: function (file, progress, bytesSend) {

        },
        appendOptions: function (collection){
            var that = this;
            collection.each(function (element, index) {
                that.$categorySelect.append("<option value='" + element.attributes.groupId + "'>" + element.attributes.groupName + "</option>")
            });
            //set val to 0 -> no category
            $("#dropzoneCategoryId").val(0);
        },
        categorySelected: function (e) {
            $("#dropzoneCategoryId").val($(e.target).val());
            if($("#dropzoneCategoryId").val() !== '0') {
                this.$dropzoneDiv.show();
            } else {
                this.$dropzoneDiv.hide();
            }
            this.render();
        },
        photoUploaded: function () {
            if(this.dropzone.getUploadingFiles().length === 0 && this.dropzone.getQueuedFiles().length === 0) {
                Backbone.Notifications.trigger("photosUploaded");
            }
        }
    });

    return UploadView;
});
