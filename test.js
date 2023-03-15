var object = {};
_.extend(object, Backbone.Events);
object.on("alert", function(msg){
    alert("triggerd"+msg);
});
object.trigger("alert","an event");