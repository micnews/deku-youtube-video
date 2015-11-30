'use strict';
/** @jsx element */

import element from 'magic-virtual-element';

function videoClick (e) {
  e.preventDefault();
  console.log('video-click');
}

export default {
  render: function ({ props }) {
    const imageSrc = `http://img.youtube.com/vi/${props.id}/${props.thumbnail || 'hqdefault'}.jpg`;
    return (<div class='youtube-video'>
      <a href='#' onClick={videoClick}>
        <div class='youtube-video__image' style={`background-image: url(${imageSrc});`}></div>
        <div class='youtube-video__play-btn'></div>
      </a>
    </div>);
  }
};
