'use strict';
import test from 'tape';
import YoutubeVideo from './';
import assertElement from 'assert-element';
import { findWithClass } from 'deku-component-find-class';

test('YoutubeVideo initial state', function (t) {
  var r = YoutubeVideo.render({
    props: {
      'youtube-id': 'YoB8t0B4jx4'
    },
    state: {
      videoOpened: false
    }
  });

  assertElement.isNode(r);
  assertElement.hasChild(r, 0, function (child) {
    assertElement.isNode(child, 'a');
  });

  var img = findWithClass(r, 'youtube-video__image');
  t.equal(img.attributes.style, 'background-image: url(http://img.youtube.com/vi/YoB8t0B4jx4/hqdefault.jpg);');
  t.end();
});

test('YoutubeVideo video opened state', function (t) {
  var r = YoutubeVideo.render({
    props: {
      'youtube-id': 'YoB8t0B4jx4'
    },
    state: {
      videoOpened: true
    }
  });

  assertElement.isNode(r);
  assertElement.hasChild(r, 0, function (child) {
    assertElement.isNode(child, 'iframe');
  });

  var img = findWithClass(r, 'youtube-video__frame');
  t.equal(img.attributes.src, 'http://www.youtube.com/embed/YoB8t0B4jx4?autoplay=1');
  t.end();
});
