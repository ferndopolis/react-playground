require("./app.less");

import React, {Component} from 'react';

class App extends Component {

    render() {
        return (
            <div className="container">
            <UnsplashImage title='Arte' width='500' height='200' />
            <UnsplashImage title='Arte' width='300' height='200' />
            <UnsplashImage title='ASF' width='80' height='90' />
            </div>
        );
    }
}


class UnsplashImage extends Component {

    componentWillMount() {
        this.src = "https://unsplash.it/" + this.props.width + "/" + this.props.height + "/?random"
    }

    render() {
        return (
            <Image title={this.props.title} src={this.src} />
        )
    }
}


class Image extends Component {
    // image component responsible for loading the image on DOM once image had been recieved
    //
    constructor(props) {
        super(props);
        this.state = {
            src: '',
            opacity: 0,
            left: 0,
            top: 0,
            loaded: false
        };
    }

    loadImage() {
        this.setState({
            src: this.props.src,
        })

        var height = React.findDOMNode(this).offsetHeight;
        var width = React.findDOMNode(this).offsetWidth;
        var winHeight = window.innerHeight;
        var winWidth = window.innerWidth;

        this.setState({
            opacity: 1,
            top: Math.floor(Math.random() * (winHeight - height)),
            left: Math.floor(Math.random() * (winWidth - width))
        });
    }

    componentDidMount() {
       var img = document.createElement('img')
       img.src = this.props.src
       img.addEventListener('load', this.loadImage.bind(this))

    }

    componentDidUnmount(){
        this.img.removeEventListener('load', this.loadImage.bind(this))
    }

    render() {
        return (
            <div style={{top: this.state.top, left: this.state.left, opacity: this.state.opacity}}
                 className="random-float image">
                <h3>{this.props.title}</h3>
                <img src={this.state.src} />
            </div>
        );
    }
}


React.render(<App/>, document.getElementById('example'));
