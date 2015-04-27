Nodes = new Mongo.Collection("nodes");

var Schemas = {};

Schemas.Nodes = new SimpleSchema({
	title: {
		type: String,
		label: "Title",
		max: 200
	},
	date: {
		type: Date,
		label: "date",
		optional: true,
	}
});

Nodes.attachSchema(Schemas.Nodes);

Nodes.find().observeChanges({
	changed: function (id, fields) {
		console.log("Nodes changed ", id, fields);
	}
});

if (Meteor.isClient) {
	Template.hello.helpers({
		items: function () {
			return Nodes.find();
		}
	});

}

if (Meteor.isServer) {
	if (Nodes.find().count() === 0) {
		Nodes.insert({title: "zefir"});

	}
}
