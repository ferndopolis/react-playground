import classnames from 'classnames'
import React, {Component} from 'react'

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImg: 0
        }
    }

    componentDidMount() {

        var el = this.refs.itemList;
        el.addEventListener('touchstart', this.onSwipeStart.bind(this));
        el.addEventListener('touchmove', this.onSwipeMove.bind(this));
        el.addEventListener('touchend', this.onSwipeEnd.bind(this));
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

    isNext(i) {
        if ( i == this.state.currentImg ) {
            return false;
        }

        if ( i == this.state.currentImg + 1 ) {
            return true
        } else if (this.props.loop && this.state.currentImg == this.galleryLength() -1 && i == 0) {
            return true
        } else {
            return false
        }
    }

    isPrev(i) {
        // false if current item
        if ( i == this.state.currentImg ) {
            return false;
        }

        if ( i == this.state.currentImg - 1 ) {
            return true
        } else if (this.props.loop && this.state.currentImg == 0 && i == this.galleryLength() - 1)  {
            return true
        } else {
            return false
        }
    }

    onSwipeStart (e) {
        this.setState({
            touchStart: e.touches[0].pageX,
            swiping: true
        })
    }

    onSwipeMove (e) {
        e.preventDefault()
        var delta = e.touches[0].pageX - this.state.touchStart;
        var swipeThreshold = 10
        if (this.state.swiping) {
            if ( delta < -swipeThreshold) {
                // slide to Next
                this.setState({ swiping: false })
                this.handleRightClick()
            } else if ( delta > swipeThreshold ) {
                //slide to Prev
                this.setState({ swiping: false })
                this.handleLeftClick()
            }
        }

    }

    onSwipeEnd (e) {
        this.setState({
            touchStart: null,
            swiping: false
        })
    }

    render() {
        var self = this
        var images = []


        this.props.images.forEach( (image, i) => {
            var classes = classnames({
                'item': true,
                //'show': this.isActive(i),
                //'hide': !this.isActive(i)
                //'fade-in': this.isActive(i),
                //'fade-out': !this.isActive(i),
                'active': this.isActive(i),
                'next': this.isNext(i),
                'prev': this.isPrev(i)
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
                <ul className="item-list" ref="itemList">{ images }</ul>
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
