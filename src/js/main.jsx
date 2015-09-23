var data

var App = React.createClass({
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
			<div>
				{this.state.feed.map(function(item){
					return <Project {...item} />
				}, this)}
			</div>
		)
	}
})

var Project = React.createClass({
	render: function() {
		var typeClass = "project project_type_" + this.props.type;
		return (
			<div className={typeClass}>
				<div className="project__name">{this.props.name}</div>
				<div className="project__description">{this.props.description}</div>
				<div className="project__date">{this.props.date.toString()}</div>
				<div className="project__link">{this.props.link}</div>
			</div>
		)
	}
})

$.get("data/data.json", function(data){
	React.render(<App data={data}/>, document.body);
})
