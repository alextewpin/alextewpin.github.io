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
    var currentYear = new Date().getFullYear();
    return (
      React.createElement("div", {className: "wrapper"}, 
        React.createElement("div", {className: "page"}, 
          React.createElement("div", {className: "header"}, 
            React.createElement("div", {className: "title"}, 
              React.createElement("div", {className: "title__title"}, "Александр Тюпин"), 
              React.createElement("div", {className: "title__subtitle"}, "Фронтенд-разработчик"), 
              React.createElement("div", {className: "title__about"}, 
                data.about.map(function(p){
                  return React.createElement("div", {className: "title__about-p", dangerouslySetInnerHTML: {__html: p}})
                })
              )
            ), 
            React.createElement("div", {className: "lang"}, " ")
          ), 
          React.createElement("div", {className: "nav"}, 
            React.createElement(Link, {to: "feed/?", activeClassName: "nav__button_selected", className: "nav__button"}, "Свершения"), 
            React.createElement(Link, {to: "cv/?", activeClassName: "nav__button_selected", className: "nav__button"}, "Резюме")
          ), 
          React.createElement(RouteHandler, React.__spread({},  this.state)), 
          React.createElement("div", {className: "footer"}, 
            React.createElement("div", {className: "footer__years"}, "2011...", currentYear), 
            React.createElement("div", {className: "footer__mail"}, 
              React.createElement("a", {href: "mailto:alex.tewpin@gmail.com"}, "alex.tewpin@gmail.com")
            )
          )
        )
      )
    )
  }
})

var Feed = React.createClass({displayName: "Feed",
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
              React.createElement("div", {className: "feed-block__year-container"}, 
                React.createElement("div", {className: "feed-block__year"}, year.year)
              )
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
      React.createElement("div", {className: "cv"}, "Лежит на ", React.createElement("a", {href: "http://hh.ru/resume/74922af8ff011c115a0039ed1f535578577a59"}, "Хедхантере"), ".")
    )
  }
})

var Project = React.createClass({displayName: "Project",
  render: function() {
    var typeClass = "project";
    if (this.props.featured) {
      typeClass = typeClass + " project_featured";
    }
    var nameClass = "project__name";
    if (this.props.featured) {
      nameClass = nameClass + " project__name_featured";
    }
    return (
      React.createElement("div", {className: typeClass}, 
        React.createElement("div", {className: nameClass, dangerouslySetInnerHTML: {__html: this.props.name_ru}}), 
        React.createElement("div", {className: "project__description", dangerouslySetInnerHTML: {__html: this.props.description_ru}})
      )
    )
  }
})

var routes = (
  React.createElement(Route, {name: "app", path: "/", handler: App}, 
    React.createElement(Redirect, {from: "/", to: "/feed"}), 
    React.createElement(Route, {name: "feed/?", handler: Feed}), 
    React.createElement(Route, {name: "cv/?", handler: CV}), 
    React.createElement(NotFoundRoute, {handler: Feed})
  )
);

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      data = JSON.parse(xhr.response);
      ReactRouter.run(routes, function (Handler) {
        React.render(React.createElement(Handler, null), document.body);
      });
    } else {
      document.body.innerHTML = "Something is wrong: " + xhr.status + " " + xhr.statusText;
    }
  }
}
xhr.open("GET", "data/data.json");
xhr.send();
