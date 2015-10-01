require("./app.less");

import React, {Component} from 'react';

class App extends Component {

    render() {
        return (
            <div className="container">
            <Image title='Arte' width='500' height='200' />
            <Image title='Arte' width='500' height='200' />
            <Image title='ASF' width='800' height='900' />
            </div>
        );
    }
}

class Image extends Component {
    componentWillMount() {
        console.log('image mounted to dom: ' + this)
    }
    render() {
        return (
            <div className="random-float image">
            <h3>{this.props.title}</h3>
            <img src={ "https://unsplash.it/" + this.props.width + "/" + this.props.height + "/?random"} />
            </div>
        );
    }
}


React.render(<App/>, document.getElementById('example'));
