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
            currentImg: 0
        }

    }

    galleryLength() {
        return this.props.images.length

    }

    handleLeftClick () {
        if ( this.state.currentImg > 0 ) {
            this.setState({
                currentImg: this.state.currentImg - 1
            })
        }
    }

    handleRightClick () {
        if ( this.state.currentImg < this.galleryLength() - 1 ) {
            this.setState({
                currentImg: this.state.currentImg + 1
            })
        }
    }

    isActive(i) {
        if ( i == this.state.currentImg ) {
            return true
        } else {
            return false
        }
    }

    render() {
        var self = this
        var images = []


        this.props.images.forEach( (image, i) => {
            var classes = classnames({
                'image-container': true,
                'active': this.isActive(i),
                'hide': !this.isActive(i)
            })

            images.push(
                <li key={i} className={classes}>
                    <h3 className="image-title">{image.title}</h3>
                    <img className="centered" src={image.src} />
                </li>
            )
        })

        return (
            <div>
                <i onClick={self.handleLeftClick.bind(self)}
                   className="fa fa-chevron-left left"></i>
                <ul className="images-container">{ images }</ul>
                <i onClick={self.handleRightClick.bind(self)}
                   className="fa fa-chevron-right right"></i>
            </div>
        )
    }
}

React.render(<App/>, document.getElementById('example'));
