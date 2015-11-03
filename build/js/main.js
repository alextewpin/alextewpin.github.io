var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var NotFoundRoute = ReactRouter.NotFoundRoute;
var DefaultRoute = ReactRouter.DefaultRoute;
var RouteHandler = ReactRouter.RouteHandler;
var Redirect = ReactRouter.Redirect;

var data = {}

var App = React.createClass({displayName: "App",
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
		return (
			React.createElement("div", {className: "wrapper"}, 
				React.createElement("div", {className: "page"}, 
					React.createElement("div", {className: "header"}, 
						React.createElement("div", {className: "title"}, 
							React.createElement("div", {className: "title__title"}, "Александр Тюпин"), 
							React.createElement("div", {className: "title__subtitle"}, "Дизайнер интерфейсов"), 
							React.createElement("div", {className: "title__about"}, 
								data.about.map(function(p){
									return React.createElement("p", null, p)
								})
							), 
							React.createElement("div", {className: "title__contact"}, "Почта: alex.tewpin@gmail.com. Скайп: alextewpin")
						), 
						React.createElement("div", {className: "lang"}, " ")
					), 
					React.createElement("div", {className: "nav"}, 
						React.createElement(Link, {to: "works/?", activeClassName: "nav__button_selected", className: "nav__button"}, "Портфолио"), 
						React.createElement(Link, {to: "cv/?", activeClassName: "nav__button_selected", className: "nav__button"}, "Резюме")
					), 
					React.createElement(RouteHandler, React.__spread({},  this.state)), 
					React.createElement("div", {className: "footer"}, 
						React.createElement("div", {className: "footer__years"}, "2011...2015"), 
						React.createElement("div", {className: "footer__mail"}, 
							React.createElement("a", {href: "mailto:alex.tewpin@gmail.com"}, "alex.tewpin@gmail.com")
						)
					)
				)
			)
		)
	}
})

var Works = React.createClass({displayName: "Works",
	render: function() {
		return (
			React.createElement("div", {className: "feed"}, 
				this.props.years.map(function(year, i){
					return (
						React.createElement("div", {className: "feed-block"}, 
							React.createElement("div", {className: "feed-block__projects"}, 
								year.content.map(function(item){
									return (React.createElement("div", {className: "feed-block__project"}, 
											React.createElement(Project, React.__spread({},  item))
										))
								}, this)
							), 
							React.createElement("div", {className: "feed-block__year"}, year.year)
						)
					)
				}, this)
			)
		)
	}
})

var CV = React.createClass({displayName: "CV",
	render: function() {
		return (
			React.createElement("div", {className: "feed"}, 
				"CV"
			)
		)
	}
})

var Project = React.createClass({displayName: "Project",
	render: function() {
		var typeClass = "project project_type_" + this.props.type;
		var icon
		if (this.props.icon) {
			var backgroundPosition = (this.props.icon - 1) * 16
			iconStyle = {
				backgroundPosition: backgroundPosition + 'px 0px'
			}
			icon = React.createElement("div", {className: "project__icon", style: iconStyle})
		}
		return (
			React.createElement("div", {className: typeClass}, 
				React.createElement("div", {className: "project__name", dangerouslySetInnerHTML: {__html: this.props.name_ru}}), 
				React.createElement("div", {className: "project__description", dangerouslySetInnerHTML: {__html: this.props.description_ru}})
			)
		)
	}
})

var routes = (
	React.createElement(Route, {name: "app", path: "/", handler: App}, 
		React.createElement(Redirect, {from: "/", to: "/works"}), 
		React.createElement(Route, {name: "works/?", handler: Works}), 
		React.createElement(Route, {name: "cv/?", handler: CV}), 
		React.createElement(NotFoundRoute, {handler: Works})
	)
);

$.get("data/data.json", function(jsonData){
	data = jsonData;
	ReactRouter.run(routes, function (Handler) {
		React.render(React.createElement(Handler, null), document.body);
	});
})
