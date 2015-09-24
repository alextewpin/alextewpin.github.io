var data

var App = React.createClass({
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
			<div>
				{this.state.years.map(function(year){
					return (
						<div className="year">
							<div>{year.year}</div>
							{year.content.map(function(item){
								return <Project {...item} />
							}, this)}
						</div>
					)
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
				<div className="project__name">{this.props.name_ru}</div>
				<div className="project__description">{this.props.description_ru}</div>
				<div className="project__date">{this.props.date.toString()}</div>
				<div className="project__link">{this.props.link}</div>
			</div>
		)
	}
})

$.get("data/data.json", function(data){
	React.render(<App data={data}/>, document.body);
})
