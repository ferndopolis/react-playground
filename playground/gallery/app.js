require("./app.less")

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Gallery from './Gallery'

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

ReactDOM.render(<App/>, document.getElementById('example'));
