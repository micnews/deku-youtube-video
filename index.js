'use strict';
/** @jsx element */

import element from 'magic-virtual-element';

function videoClick (e, component, setState) {
  setState({
    opened: true
  });
}

export default {
  initialState: function (props) {
    return {
      opened: false
    };
  },
  beforeUpdate: function ({ props, state }, { onOpen, onClose }, nextState) {
    if (onOpen && !state.opened && nextState.opened) {
      onOpen();
    }

    if (onClose && state.opened && !nextState.opened) {
      onClose();
    }
  },
  render: function ({ props, state }, setState) {
    const imageSrc = `http://img.youtube.com/vi/${props['youtube-id']}/${props.thumbnail || 'hqdefault'}.jpg`;

    if (setState && props.disabled) {
      setState({
        opened: false
      });
    } else if (typeof props.opened === 'boolean' && state.opened !== props.opened) {
      setState({
        opened: props.opened
      });
    }

    const content = (state.opened && !props.disabled)
      ? <iframe class='youtube-video__frame' src={`http://www.youtube.com/embed/${props['youtube-id']}?autoplay=1`}
          frameBorder='0' />
      : <div>
          <div class='youtube-video__image' style={`background-image: url(${imageSrc});`}></div>
          <div class='youtube-video__play-btn youtube-video__play-btn--hover'></div>
          <div class='youtube-video__play-btn'></div>
        </div>;

    const className = state.opened
      ? 'youtube-video youtube-video--opened'
      : 'youtube-video';

    return <div class={className} onClick={videoClick}>{content}</div>;
  }
};
