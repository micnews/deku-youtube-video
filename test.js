'use strict';
import test from 'tape';
import YoutubeVideo from './';
import { renderString, tree } from 'deku';
import element from 'magic-virtual-element';
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
        <div class="youtube-video__image" style="background-image: url(//img.youtube.com/vi/YoB8t0B4jx4/hqdefault.jpg);"></div>
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
        <div class="youtube-video__image" style="background-image: url(//img.youtube.com/vi/YoB8t0B4jx4/maxresdefault.jpg);"></div>
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
      thumbnail: '//custom-image.jpg'
    }
  })));

  t.equal(html, tsml`
    <div class="youtube-video">
      <div>
        <div class="youtube-video__image" style="background-image: url(//custom-image.jpg);"></div>
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

test('YoutubeVideo custom thumbnail', function (t) {
  const customThumbnail = <div>OK</div>;
  var html = renderString(tree(<YoutubeVideo customThumbnail={customThumbnail} youtubeId='YoB8t0B4jx4' />));

  t.equal(html, tsml`
    <div class="youtube-video"><div>OK</div></div>`);
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
      <iframe class="youtube-video__frame" src="//www.youtube.com/embed/YoB8t0B4jx4?autoplay=1&enablejsapi=1" allowfullscreen="true" frameBorder="0" id="youtube-video__frame--video-id-foo"></iframe>
    </div>`);
  t.end();
});

test('YoutubeVideo player disable info and related videos', function (t) {
  var html = renderString(tree(YoutubeVideo.render({
    props: {
      youtubeId: 'YoB8t0B4jx4',
      opened: true,
      disableInfo: true,
      disableRelatedVideos: true
    },
    id: 'foo'
  })));

  t.equal(html, tsml`
    <div class="youtube-video youtube-video--opened">
      <iframe class="youtube-video__frame" src="//www.youtube.com/embed/YoB8t0B4jx4?autoplay=1&enablejsapi=1&showinfo=0&rel=0" allowfullscreen="true" frameBorder="0" id="youtube-video__frame--video-id-foo"></iframe>
    </div>`);
  t.end();
});

test('YoutubeVideo player disable autoplay', function (t) {
  var html = renderString(tree(YoutubeVideo.render({
    props: {
      youtubeId: 'YoB8t0B4jx4',
      opened: true,
      disableAutoplay: true
    },
    id: 'foo'
  })));

  t.equal(html, tsml`
    <div class="youtube-video youtube-video--opened">
      <iframe class="youtube-video__frame" src="//www.youtube.com/embed/YoB8t0B4jx4?autoplay=0&enablejsapi=1" allowfullscreen="true" frameBorder="0" id="youtube-video__frame--video-id-foo"></iframe>
    </div>`);
  t.end();
});

test('YoutubeVideo API', t => {
  t.plan(6);

  const props = {
    youtubeId: 'YoB8t0B4jx4',
    opened: true,
    onPlaying: () => t.pass('playing'),
    onBuffering: () => t.pass('buffering'),
    onPaused: () => t.pass('paused'),
    onCued: () => t.pass('cued'),
    onEnded: () => t.pass('ended')
  };

  const id = 'player1';

  renderString(tree(YoutubeVideo.render({ props, id })));
  YoutubeVideo.afterMount({ props, id });
  YoutubeVideo.afterUpdate({ props, id });
  YoutubeVideo.afterUpdate({ props, id });

  class Player {
    constructor (id, opts) {
      t.pass('init');
      opts.events.onStateChange({data: 'PLAYING'});
      opts.events.onStateChange({data: 'BUFFERING'});
      opts.events.onStateChange({data: 'PAUSED'});
      opts.events.onStateChange({data: 'CUED'});
      opts.events.onStateChange({data: 'ENDED'});
    }
  }

  // Simulate Youtube API
  global.YT = {
    Player: Player,
    PlayerState: {
      ENDED: 'ENDED',
      PLAYING: 'PLAYING',
      PAUSED: 'PAUSED',
      BUFFERING: 'BUFFERING',
      CUED: 'CUED'
    }
  };

  global.onYouTubeIframeAPIReady();
});
