require("./app.less")
require("font-awesome-webpack")

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

    render() {
        var self = this
        var images = []
        this.props.images.forEach( (image) => {
            images.push(
                <div className="image-container">
                    <h3 className="image-title">{image.title}</h3>
                    <Image src={image.src} onImageLoaded={self.handleImageLoaded.bind(self)}/>
                </div>
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

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: '',
        }
    }

    loadImage() {
        this.setState({
            src: this.props.src
        })
        this.props.onImageLoaded(true);
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
            <img className="centered" src={this.state.src} />
        );
    }
}

React.render(<App/>, document.getElementById('example'));
