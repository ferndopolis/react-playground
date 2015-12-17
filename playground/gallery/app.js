require("./app.less")
require("font-awesome-webpack")

import classnames from 'classnames'
import React, {Component} from 'react'

class App extends Component {
    constructor () {
        super();
        var images = [
            { title: 'Basil', width: '800', height: '650' },
            { title: 'Lettuce', width: '1000', height: '1000'},
            { title: 'Tomatoes', width: '400', height: '650' },
            { title: 'Corn', width: '1000', height: '1000'},
            { title: 'Cheese', width: '1250', height: '860'}
        ]
        this.imagesSrc = images.map(( image ) => {
            var src = "https://unsplash.it/" + image.width + "/" + image.height + "/?random";
            return { title: image.title, src: src }
        })

    }

    render() {
        return (
            <div className="container">
                <Gallery images={this.imagesSrc} />
            </div>
        )
    }
}

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleImageLoaded () {
        console.log('image loaded');
    }

    isActive() {
        return true
    }

    render() {
        var self = this
        var images = []

        var classes = classnames(
            'image-container',
            { 'active': this.isActive() }
        )

        this.props.images.forEach( (image) => {
            images.push(
                <div className={classes}>
                    <h3 className="image-title">{image.title}</h3>
                    <img src={image.src} />
                </li>
            )
        })
        return (
            <div>
                <i className="fa fa-chevron-left left"></i>
                <div className="images-container">{ images }</div>
                <i className="fa fa-chevron-right right"></i>
            </div>
        )
    }
}

React.render(<App/>, document.getElementById('example'));
