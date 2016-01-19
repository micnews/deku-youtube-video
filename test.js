'use strict';
import test from 'tape';
import YoutubeVideo from './';
import { renderString, tree } from 'deku';
import tsml from 'tsml';

test('YoutubeVideo initial state', function (t) {
  var html = renderString(tree(YoutubeVideo.render({
    props: {
      youtubeId: 'YoB8t0B4jx4',
      opened: false
    }
  })));

  t.equal(html, tsml`
    <div class="youtube-video">
      <div>
        <div class="youtube-video__image" style="background-image: url(http://img.youtube.com/vi/YoB8t0B4jx4/hqdefault.jpg);"></div>
        <div class="youtube-video__play-btn youtube-video__play-btn--hover">
          <div class="youtube-video__play-btn__image"></div>
        </div>
        <div class="youtube-video__play-btn">
          <div class="youtube-video__play-btn__image"></div>
        </div>
      </div>
    </div>`);
  t.end();
});

test('YoutubeVideo thumbnail-size', function (t) {
  var html = renderString(tree(YoutubeVideo.render({
    props: {
      youtubeId: 'YoB8t0B4jx4',
      opened: false,
      thumbnailSize: 'maxresdefault'
    }
  })));

  t.equal(html, tsml`
    <div class="youtube-video">
      <div>
        <div class="youtube-video__image" style="background-image: url(http://img.youtube.com/vi/YoB8t0B4jx4/maxresdefault.jpg);"></div>
        <div class="youtube-video__play-btn youtube-video__play-btn--hover">
          <div class="youtube-video__play-btn__image"></div>
        </div>
        <div class="youtube-video__play-btn">
          <div class="youtube-video__play-btn__image"></div>
        </div>
      </div>
    </div>`);
  t.end();
});

test('YoutubeVideo thumbnail', function (t) {
  var html = renderString(tree(YoutubeVideo.render({
    props: {
      youtubeId: 'YoB8t0B4jx4',
      opened: false,
      thumbnail: 'http://custom-image.jpg'
    }
  })));

  t.equal(html, tsml`
    <div class="youtube-video">
      <div>
        <div class="youtube-video__image" style="background-image: url(http://custom-image.jpg);"></div>
        <div class="youtube-video__play-btn youtube-video__play-btn--hover">
          <div class="youtube-video__play-btn__image"></div>
        </div>
        <div class="youtube-video__play-btn">
          <div class="youtube-video__play-btn__image"></div>
        </div>
      </div>
    </div>`);
  t.end();
});

test('YoutubeVideo video opened state', function (t) {
  var html = renderString(tree(YoutubeVideo.render({
    props: {
      youtubeId: 'YoB8t0B4jx4',
      opened: true
    },
    id: 'foo'
  })));

  t.equal(html, tsml`
    <div class="youtube-video youtube-video--opened">
      <iframe class="youtube-video__frame" src="http://www.youtube.com/embed/YoB8t0B4jx4?autoplay=1&enablejsapi=1" frameBorder="0" id="youtube-video__frame--video-id-foo"></iframe>
    </div>`);
  t.end();
});
