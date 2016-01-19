'use strict';
/** @jsx element */

import element from 'magic-virtual-element';

const players = {};
const eventListeners = {};

export default {
  render: function ({ props, id }) {
    const imageSrc = props.thumbnail ? props.thumbnail
      : `http://img.youtube.com/vi/${props['youtubeId']}/${props.thumbnailSize || 'hqdefault'}.jpg`;

    const src = `http://www.youtube.com/embed/${props['youtubeId']}?autoplay=1&enablejsapi=1`;

    const content = (props.opened)
      ? <iframe
        class='youtube-video__frame'
        src={src}
        frameBorder='0'
        id={elementId(id)}
        />
      : <div>
          <div class='youtube-video__image' style={`background-image: url(${imageSrc});`}></div>
          <div class='youtube-video__play-btn youtube-video__play-btn--hover'>
            <div class='youtube-video__play-btn__image'></div>
          </div>
          <div class='youtube-video__play-btn'>
            <div class='youtube-video__play-btn__image'></div>
          </div>
        </div>;

    const className = props.opened
      ? 'youtube-video youtube-video--opened'
      : 'youtube-video';

    return <div class={className} onClick={props.onClick}>{content}</div>;
  },

  afterUpdate: function ({ props, id }, prevProps) {
    if (!window.YT || !window.YT.Player) {
      return;
    }

    if (props.opened) {
      eventListeners[id] = {
        [window.YT.PlayerState.ENDED]: props.onEnded,
        [window.YT.PlayerState.PLAYING]: props.onPlaying,
        [window.YT.PlayerState.PAUSED]: props.onPaused,
        [window.YT.PlayerState.BUFFERING]: props.onBuffering,
        [window.YT.PlayerState.CUED]: props.onCued
      };
    }

    if (!props.opened && prevProps.opened) {
      players[id].destroy();
      delete players[id];
      delete eventListeners[id];
    } else if (props.opened && !prevProps.opened) {
      players[id] = new window.YT.Player(elementId(id), {
        videoId: props.youtubeId,
        events: {
          onStateChange: function ({data}) {
            if (eventListeners[id] && eventListeners[id][data]) {
              eventListeners[id][data]();
            }
          }
        }
      });
    }
  }
};

function elementId (id) {
  return `youtube-video__frame--video-id-${id}`;
}
