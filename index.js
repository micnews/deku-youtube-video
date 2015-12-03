'use strict';
/** @jsx element */

import element from 'magic-virtual-element';

function videoClick (e, component, setState) {
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
  render: function ({ props, state }, setState) {
    const imageSrc = `http://img.youtube.com/vi/${props['youtube-id']}/${props.thumbnail || 'hqdefault'}.jpg`;

    if (setState && props.disabled) {
      setState({
        videoOpened: false
      });
    }

    const content = (state.videoOpened && !props.disabled)
      ? <iframe class='youtube-video__frame' src={`http://www.youtube.com/embed/${props['youtube-id']}?autoplay=1`}
          frameBorder='0' />
      : <div>
          <div class='youtube-video__image' style={`background-image: url(${imageSrc});`}></div>
          <div class='youtube-video__play-btn'></div>
        </div>;

    return <div class='youtube-video' onClick={videoClick}>{content}</div>;
  }
};
