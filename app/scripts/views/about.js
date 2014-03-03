/*global define*/

define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    'use strict';

    var AboutView = Backbone.View.extend({
        
    	render: function () {
    		var html = "<h3> aboutview </h3>"
    		this.$el.html(html);
    		return this;
    	}
    });

    return AboutView;
});
