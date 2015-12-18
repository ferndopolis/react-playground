jest.dontMock('../Gallery');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Gallery = require('../Gallery');

describe("Gallery", () => {
    var gallery;

    var images = [
        {src: "https://unsplash.it/800/600", title: 'Basil'},
        {src: "https://unsplash.it/200/500", title: 'Cheese Sticks'},
        {src: "https://unsplash.it/120/250", title: 'Burgers'}
    ];

    beforeEach(function () {
        gallery = TestUtils.renderIntoDocument(
            <Gallery images={ images }/>
        );
    });

    it("initial state", function () {
        expect(gallery.props.loop).toBe(false);
        expect(gallery.state.currentImg).toBe(0);
    });
});
