'use strict';
import test from 'tape';
import YoutubeVideo from './';
import { renderString, tree } from 'deku';
import tsml from 'tsml';

test('YoutubeVideo initial state', function (t) {
  var html = renderString(tree(YoutubeVideo.render({
    props: {
      'youtube-id': 'YoB8t0B4jx4'
    },
    state: {
      opened: false
    }
  })));

  t.equal(html, tsml`
    <div class="youtube-video">
      <div>
        <div class="youtube-video__image" style="background-image: url(http://img.youtube.com/vi/YoB8t0B4jx4/hqdefault.jpg);"></div>
        <div class="youtube-video__play-btn youtube-video__play-btn--hover"></div>
        <div class="youtube-video__play-btn"></div>
      </div>
    </div>`);
  t.end();
});

test('YoutubeVideo video opened state', function (t) {
  var html = renderString(tree(YoutubeVideo.render({
    props: {
      'youtube-id': 'YoB8t0B4jx4'
    },
    state: {
      opened: true
    }
  })));

  t.equal(html, tsml`
    <div class="youtube-video youtube-video--opened">
      <iframe class="youtube-video__frame" src="http://www.youtube.com/embed/YoB8t0B4jx4?autoplay=1" frameBorder="0"></iframe>
    </div>`);
  t.end();
});
