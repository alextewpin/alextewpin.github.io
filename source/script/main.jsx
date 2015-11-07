var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var NotFoundRoute = ReactRouter.NotFoundRoute;
var DefaultRoute = ReactRouter.DefaultRoute;
var RouteHandler = ReactRouter.RouteHandler;
var Redirect = ReactRouter.Redirect;

var data = {}

var App = React.createClass({
	getInitialState: function () {
		var yearsHash = {};
		var yearsArray = []

		data.feed.forEach(function(item){
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
		var currentYear = new Date().getFullYear();
		return (
			<div className="wrapper">
				<div className="page">
					<div className="header">
						<div className="title">
							<div className="title__title">Александр Тюпин</div>
							<div className="title__subtitle">Дизайнер интерфейсов</div>
							<div className="title__about">
								{data.about.map(function(p){
									return <p dangerouslySetInnerHTML={{__html: p}}></p>
								})}
							</div>
						</div>
						<div className="lang">&nbsp;</div>
					</div>
					<div className="nav">
						<Link to='feed/?' activeClassName='nav__button_selected' className='nav__button'>Свершения</Link>
						<Link to='cv/?' activeClassName='nav__button_selected' className='nav__button'>Резюме</Link>
					</div>
					<RouteHandler {...this.state}/>
					<div className="footer">
						<div className="footer__years">2011...{currentYear}</div>
						<div className="footer__mail">
							<a href="mailto:alex.tewpin@gmail.com">alex.tewpin@gmail.com</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
})

var Feed = React.createClass({
	render: function() {
		return (
			<div className="feed">
				{this.props.years.map(function(year, i){
					return (
						<div className="feed-block">
							<div className="feed-block__projects">
								{year.content.map(function(item){
									return (<div className="feed-block__project">
											<Project {...item} />
										</div>)
								}, this)}
							</div>
							<div className="feed-block__year">{year.year}</div>
						</div>
					)
				}, this)}
			</div>
		)
	}
})

var CV = React.createClass({
	render: function() {
		return (
			<div className="cv">
				Резюме пока не очень-то и нужно.
			</div>
		)
	}
})

var Project = React.createClass({
	render: function() {
		var typeClass = "project project_type_" + this.props.type;
		var icon
		if (this.props.icon) {
			var backgroundPosition = (this.props.icon - 1) * 16
			iconStyle = {
				backgroundPosition: backgroundPosition + 'px 0px'
			}
			icon = <div className="project__icon" style={iconStyle}></div>
		}
		return (
			<div className={typeClass}>
				<div className="project__name" dangerouslySetInnerHTML={{__html: this.props.name_ru}}></div>
				<div className="project__description" dangerouslySetInnerHTML={{__html: this.props.description_ru}}></div>
			</div>
		)
	}
})

var routes = (
	<Route name='app' path='/' handler={App} >
		<Redirect from="/" to="/feed" />
		<Route name='feed/?' handler={Feed} />
		<Route name='cv/?' handler={CV} />
		<NotFoundRoute handler={Feed}/>
	</Route>
);

$.get("data/data.json", function(jsonData){
	data = jsonData;
	ReactRouter.run(routes, function (Handler) {
		React.render(<Handler />, document.body);
	});
})
