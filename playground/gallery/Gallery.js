import classnames from 'classnames'
import React, {Component} from 'react'

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

    hasPrevItem() {
        return this.state.currentImg > 0
    }

    handleLeftClick () {
        if ( this.hasPrevItem() ) {
            this.setState({
                currentImg: this.state.currentImg - 1
            })
        } else {
            if ( this.props.loop ) {
                this.setState({ currentImg: this.galleryLength() - 1 })
            }
        }
    }

    hasNextItem() {
        return this.state.currentImg < this.galleryLength() - 1
    }

    handleRightClick () {
        if ( this.hasNextItem() ) {
            this.setState({ currentImg: this.state.currentImg + 1 })
        } else {
            // has hit the upper limit
            if ( this.props.loop ) {
                // go back to first image
                this.setState({ currentImg: 0})
            }
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
                <button onClick={self.handleLeftClick.bind(self)}
                   className="left">-</button>
                <ul className="images-container">{ images }</ul>
                <button onClick={self.handleRightClick.bind(self)}
                   className="right">-</button>
            </div>
        )
    }
}

Gallery.propTypes = {
    loop: React.PropTypes.bool,
    images: React.PropTypes.array.isRequired
}

Gallery.defaultProps = { loop: false }

module.exports = Gallery
