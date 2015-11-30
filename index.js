'use strict';
/** @jsx element */

import element from 'magic-virtual-element';

function videoClick (e, component, setState) {
  e.preventDefault();
  setState({
    videoOpened: true
  });
}

export default {
  initialState: function (props) {
    return {
      videoOpened: false
    };
  },
  render: function ({ props, state }) {
    const imageSrc = `http://img.youtube.com/vi/${props['youtube-id']}/${props.thumbnail || 'hqdefault'}.jpg`;

    var content = state.videoOpened
      ? <iframe class='youtube-video__frame' src={`http://www.youtube.com/embed/${props['youtube-id']}?autoplay=1`}
          frameBorder='0' />
      : <a href='#' onClick={videoClick}>
          <div class='youtube-video__image' style={`background-image: url(${imageSrc});`}></div>
          <div class='youtube-video__play-btn'></div>
        </a>;

    return <div class='youtube-video'>{content}</div>;
  }
};
