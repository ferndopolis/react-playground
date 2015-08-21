require("./app.less");

var React = require('react');

var App = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  render: function () {
    return (
      <div className="container">
        <Image title='Arte' width='500' height='200' />
        <Image title='Fotos' width='100' height='250' />
      </div>
    );
  }
});

var Image = React.createClass({
  render: function () {
    return (
      <div className="Image">
        <h2>{this.props.title}</h2>
        <img data-src={ "https://unsplash.it/" + this.props.width + "/" + this.props.height + "/?random"} />
      </div>
    );
  }
});


React.render(<App/>, document.getElementById('example'));
