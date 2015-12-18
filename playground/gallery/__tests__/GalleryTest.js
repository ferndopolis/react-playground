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

    beforeEach(() => {
        gallery = TestUtils.renderIntoDocument(
            <Gallery images={ images }/>
        );
    });

    it("initial state", () => {
        expect(gallery.props.loop).toBe(false);
        expect(gallery.state.currentImg).toBe(0);
    });

    describe("hasPrevItem()", () => {
        it("when first item return false", () => {
            expect(gallery.hasPrevItem()).toBe(false);
        });
        it("when last item return true", () => {
            gallery.state.currentImg = 2
            expect(gallery.hasPrevItem()).toBe(true);
        });
    });

    describe("hasNextItem()", () => {
        it("when first item return true", () => {
            expect(gallery.hasNextItem()).toBe(true);
        });
        it("when last item return false", () => {
            gallery.state.currentImg = 2
            expect(gallery.hasNextItem()).toBe(false);
        });
    });

    describe("galleryLength()", () => {
        it("should return gallery item count", () => {
            expect(gallery.galleryLength()).toBe(3);
        });
    });

    describe("click next item", () => {

        it("should move to the next item", () => {
            TestUtils.Simulate.click(
                TestUtils.findRenderedDOMComponentWithClass(gallery, 'right')
            );
            expect(gallery.state.currentImg).toBe(1);
        });

        it("when last item should not change state", () => {
            gallery.state.currentImg = 2
            TestUtils.Simulate.click(
                TestUtils.findRenderedDOMComponentWithClass(gallery, 'right')
            );
            expect(gallery.state.currentImg).toBe(2);
        });

        describe("when loop is true", () => {
            it("on last item should loop to first", () => {
                var galleryWithLoop = TestUtils.renderIntoDocument(<Gallery loop={true} images={ images }/>);
                galleryWithLoop.state.currentImg = 2
                TestUtils.Simulate.click(
                    TestUtils.findRenderedDOMComponentWithClass(galleryWithLoop, 'right')
                );
                expect(galleryWithLoop.state.currentImg).toBe(0);
            });
        });
    });

    describe("click prev item", () => {

        it("should move to the prev item", () => {
            gallery.state.currentImg = 1
            TestUtils.Simulate.click(
                TestUtils.findRenderedDOMComponentWithClass(gallery, 'left')
            );
            expect(gallery.state.currentImg).toBe(0);
        });

        it("when first item should not change state", () => {
            TestUtils.Simulate.click(
                TestUtils.findRenderedDOMComponentWithClass(gallery, 'left')
            );
            expect(gallery.state.currentImg).toBe(0);
        });

        describe("when loop is true", () => {
            it("on first item should loop to last", () => {
                var galleryWithLoop = TestUtils.renderIntoDocument(<Gallery loop={true} images={ images }/>);
                TestUtils.Simulate.click(
                    TestUtils.findRenderedDOMComponentWithClass(galleryWithLoop, 'left')
                );
                expect(galleryWithLoop.state.currentImg).toBe(2);
            });
        });
    });
});
