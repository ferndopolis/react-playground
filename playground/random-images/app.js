require("./app.less");

import React, {Component} from 'react';

class App extends Component {
    constructor () {
        super();
        this.images = [
            { title: 'Arte', width: '500', height: '200' },
            { title: 'Collection', width: '300', height: '300'},
            { title: 'Editorial', width: '240', height: '360'}
        ];
    }

    render() {
        var randomImages = [];
        this.images.forEach( (image) => {
            var imageSrc = "https://unsplash.it/" + image.width + "/" + image.height + "/?random";
            randomImages.push(<RandomImage title={image.title} src={imageSrc} />);
        });
        return (
            <div className="container">
                {randomImages}
            </div>
        );
    }
}

class RandomImage extends Component {
    // image component responsible for loading the image on DOM once image had been recieved
    //
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0,
            left: 0,
            top: 0
        };
    }

    placeImage(loaded) {
        if (! loaded) { return };

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


    render() {
        return (
            <div style={{top: this.state.top, left: this.state.left, opacity: this.state.opacity}}
                 className="random-float image">
                <h3>{this.props.title}</h3>
                <Image src={this.props.src} onImageLoaded={this.placeImage.bind(this)}/>
            </div>
        );
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
            <img src={this.state.src} />
        );
    }
}


React.render(<App/>, document.getElementById('example'));
