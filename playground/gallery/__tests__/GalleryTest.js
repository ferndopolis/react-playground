jest.dontMock('../Gallery');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Gallery = require('../Gallery');

describe("Gallery", () => {
    var gallery, galleryWithLoop;

    var images = [
        {src: "https://unsplash.it/800/600", title: 'Basil'},
        {src: "https://unsplash.it/200/500", title: 'Cheese Sticks'},
        {src: "https://unsplash.it/120/250", title: 'Burgers'}
    ];

    beforeEach(() => {
        gallery = TestUtils.renderIntoDocument(
            <Gallery images={ images }/>
        );

        galleryWithLoop = TestUtils.renderIntoDocument(
            <Gallery loop={true} images={ images }/>
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

    describe("isAcitve()", () => {
        it("should return true when currentImg", () => {
            gallery.state.currentImg = 2
            expect(gallery.isActive(2)).toBe(true);
        });
        it("should return false when not currentImg", () => {
            gallery.state.currentImg = 1
            expect(gallery.isActive(2)).toBe(false);
        });
    });

    describe("isNext()", () => {
        it("should return true when image follows directly after currentImg", () => {
            gallery.state.currentImg = 1
            expect(gallery.isNext(2)).toBe(true);
        });
        it("should return false when not follows directly after currentImg", () => {
            gallery.state.currentImg = 1
            expect(gallery.isNext(0)).toBe(false);
        });
        it("should return false on currentImg", () => {
            gallery.state.currentImg = 1
            expect(gallery.isNext(1)).toBe(false);
        });
        describe("when loop is true", () => {
            it("should return true only on first image when current image is last", () => {
                galleryWithLoop.state.currentImg = 2
                expect(galleryWithLoop.isNext(0)).toBe(true);
            });
            it("should return false on other images when current image is last", () => {
                gallery.state.currentImg = 2
                expect(gallery.isNext(1)).toBe(false);
            });
            it("should return false on current image ", () => {
                gallery.state.currentImg = 2
                expect(gallery.isNext(2)).toBe(false);
            });
        });
    });

    describe("isPrev()", () => {
        it("should return true when image follows directly before currentImg", () => {
            gallery.state.currentImg = 1
            expect(gallery.isPrev(0)).toBe(true);
        });
        it("should return false when does not follows directly before currentImg", () => {
            gallery.state.currentImg = 1
            expect(gallery.isPrev(2)).toBe(false);
        });
        it("should return false on currentImg", () => {
            gallery.state.currentImg = 1
            expect(gallery.isPrev(1)).toBe(false);
        });
        describe("when loop is true", () => {
            it("should return true only on last image when current image is first", () => {
                galleryWithLoop.state.currentImg = 0
                expect(galleryWithLoop.isPrev(2)).toBe(true);
            });
            it("should return false on other images when current image is first", () => {
                gallery.state.currentImg = 0
                expect(gallery.isPrev(1)).toBe(false);
            });
            it("should return false on current image ", () => {
                gallery.state.currentImg = 2
                expect(gallery.isPrev(2)).toBe(false);
            });
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
                TestUtils.Simulate.click(
                    TestUtils.findRenderedDOMComponentWithClass(galleryWithLoop, 'left')
                );
                expect(galleryWithLoop.state.currentImg).toBe(2);
            });
        });
    });
});
