var data

var App = React.createClass({displayName: "App",
	getInitialState: function () {
		var feed = [];
		for (category in this.props.data) {
			this.props.data[category].forEach(function(item){
				if (category == "mainProjects") {
					item.type = "main"
				}
				item.date = new Date(item.date);
				feed.push(item);
			}, this);
		}
		feed.sort(function(a, b) {
			return new Date(b.date) - new Date(a.date);
		});
	    return {
	        feed: feed  
	    };
	},
	render: function() {
		return (
			React.createElement("div", null, 
				this.state.feed.map(function(item){
					return React.createElement(Project, React.__spread({},  item))
				}, this)
			)
		)
	}
})

var Project = React.createClass({displayName: "Project",
	render: function() {
		var typeClass = "project project_type_" + this.props.type;
		return (
			React.createElement("div", {className: typeClass}, 
				React.createElement("div", {className: "project__name"}, this.props.name), 
				React.createElement("div", {className: "project__description"}, this.props.description), 
				React.createElement("div", {className: "project__date"}, this.props.date.toString()), 
				React.createElement("div", {className: "project__link"}, this.props.link)
			)
		)
	}
})

$.get("data/data.json", function(data){
	React.render(React.createElement(App, {data: data}), document.body);
})
