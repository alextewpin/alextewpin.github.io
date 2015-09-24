var data

var App = React.createClass({displayName: "App",
	getInitialState: function () {
		var yearsHash = {};
		var yearsArray = []

		this.props.data.feed.forEach(function(item){
			item.date = new Date(item.date);
			if (!yearsHash[item.date.getFullYear()]) {
				yearsHash[item.date.getFullYear()] = [];
			}
			yearsHash[item.date.getFullYear()].push(item);
		})

		for (year in yearsHash) {
			yearsArray.push(year);
		}

		yearsArray.sort(function(a, b){
			return b - a;
		});

		yearsArray = yearsArray.map(function(year){
			var yearObject = {};
			yearObject.year = year;
			yearObject.content = yearsHash[year];
			return yearObject;
		})

		return {
			years: yearsArray
		};
	},
	render: function() {
		return (
			React.createElement("div", null, 
				this.state.years.map(function(year){
					return (
						React.createElement("div", {className: "year"}, 
							React.createElement("div", null, year.year), 
							year.content.map(function(item){
								return React.createElement(Project, React.__spread({},  item))
							}, this)
						)
					)
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
				React.createElement("div", {className: "project__name"}, this.props.name_ru), 
				React.createElement("div", {className: "project__description"}, this.props.description_ru), 
				React.createElement("div", {className: "project__date"}, this.props.date.toString()), 
				React.createElement("div", {className: "project__link"}, this.props.link)
			)
		)
	}
})

$.get("data/data.json", function(data){
	React.render(React.createElement(App, {data: data}), document.body);
})
