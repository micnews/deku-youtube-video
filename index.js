import element from 'magic-virtual-element';

const players = {};
const eventListeners = {};
const cbCache = {};
let prevHandler = null;

function apiReadyHandler () {
  Object.keys(cbCache).forEach(key => cbCache[key]());
  if (prevHandler) {
    prevHandler();
  }
}

// Store existing api ready handler
if (typeof global.onYouTubeIframeAPIReady === 'function') {
  prevHandler = global.onYouTubeIframeAPIReady;
}

// Setup new api ready handler
global.onYouTubeIframeAPIReady = apiReadyHandler;

function onApiReady (id, cb) {
  if (!global.YT || !global.YT.Player) {
    cbCache[id] = cb;
    return;
  }

  setTimeout(cb, 0);
}

function afterMountUpdate ({ props, id }) {
  onApiReady(id, () => {
    if (props.opened) {
      eventListeners[id] = {
        [global.YT.PlayerState.ENDED]: props.onEnded,
        [global.YT.PlayerState.PLAYING]: props.onPlaying,
        [global.YT.PlayerState.PAUSED]: props.onPaused,
        [global.YT.PlayerState.BUFFERING]: props.onBuffering,
        [global.YT.PlayerState.CUED]: props.onCued
      };
    }

    if (props.opened && !players[id]) {
      players[id] = new global.YT.Player(elementId(id), {
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

    if (!props.opened && players[id]) {
      players[id].destroy();
      delete players[id];
      delete eventListeners[id];
    }
  });
}

export default {
  render: function ({ props, id }) {
    const imageSrc = props.thumbnail ? props.thumbnail
      : `//img.youtube.com/vi/${props['youtubeId']}/${props.thumbnailSize || 'hqdefault'}.jpg`;

    const src = `//www.youtube.com/embed/${props['youtubeId']}?autoplay=1&enablejsapi=1`;

    const thumbnail = props.customThumbnail || (<div>
      <div class='youtube-video__image' style={`background-image: url(${imageSrc});`}></div>
      <div class='youtube-video__play-btn youtube-video__play-btn--hover'>
        <div class='youtube-video__play-btn__image'></div>
      </div>
      <div class='youtube-video__play-btn'>
        <div class='youtube-video__play-btn__image'></div>
      </div>
    </div>);

    const content = (props.opened)
      ? <iframe
        class='youtube-video__frame'
        src={src}
        frameBorder='0'
        id={elementId(id)}
        />
      : thumbnail;

    const className = props.opened
      ? 'youtube-video youtube-video--opened'
      : 'youtube-video';

    return <div class={className} onClick={props.onClick}>{content}</div>;
  },
  afterUpdate: afterMountUpdate,
  afterMount: afterMountUpdate
};

function elementId (id) {
  return `youtube-video__frame--video-id-${id}`;
}
