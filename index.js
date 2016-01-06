'use strict';
/** @jsx element */

import element from 'magic-virtual-element';

export default {
  render: function ({ props }) {
    console.log('props', props['thumbnail-size']);
    const imageSrc = props.thumbnail ? props.thumbnail
      : `http://img.youtube.com/vi/${props['youtube-id']}/${props['thumbnail-size'] || 'hqdefault'}.jpg`;

    const content = (props.opened)
      ? <iframe class='youtube-video__frame' src={`http://www.youtube.com/embed/${props['youtube-id']}?autoplay=1`}
          frameBorder='0' />
      : <div>
          <div class='youtube-video__image' style={`background-image: url(${imageSrc});`}></div>
          <div class='youtube-video__play-btn youtube-video__play-btn--hover'></div>
          <div class='youtube-video__play-btn'></div>
        </div>;

    const className = props.opened
      ? 'youtube-video youtube-video--opened'
      : 'youtube-video';

    return <div class={className} onClick={props.onClick}>{content}</div>;
  }
};
