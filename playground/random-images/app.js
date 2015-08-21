require("./app.less");

import React from 'react';

var App = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    render() {
        return (
            <div className="container">
            <Image title='Arte' width='500' height='200' />
            <Image title='Fotos' width='100' height='250' />
            </div>
        );
    }
});

var Image = React.createClass({
    render() {
        return (
            <div className="random-float image">
            <h3>{this.props.title}</h3>
            <img src={ "https://unsplash.it/" + this.props.width + "/" + this.props.height + "/?random"} />
            </div>
        );
    }
});


React.render(<App/>, document.getElementById('example'));
