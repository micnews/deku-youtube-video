# deku-youtube-video

Youtube video component for [deku](https://github.com/dekujs/deku).

## Usage

```shell
npm install deku-youtube-video
```

```js
import YoutubeVideo from 'deku-youtube-video';

const onClick = (e, component, setState) => {
  console.log('video clicked');
  // Set state.opened to true to play the video
  setState({ opened: true });
}

export default {
  render: function ({ state }) {
    const {opened} = state;

    return (<YoutubeVideo youtube-id='YoB8t0B4jx4' onClick={onClick} opened={opened} />);
  }
}
```

### Attributes

* `youtubeId=[youtube-video-id]` Set youtube video ID to use.
* `onClick=[function]` Function to run when video is clicked on
* `opened=[boolean]` If false, shows a video preview using the youtube thumbnail and if true opens and plays the video.
* `thumbnail=[string]` - _Optional_ Set custom thumbnail image, this will override the standard youtube thumbnail.
* `thumbnailSize=[string]` - _Optional_ Set which youtube thumbnail to use, defaults to `hqdefault`

#### events

If you load the youtube iframe api (`https://www.youtube.com/iframe_api`), support for the following events exists (as attributes):

* `onEnded` - called on _window.YT.PlayState.ENDED_
* `onPlaying` - called on _window.YT.PlayState.PLAYING_
* `onPaused` - called on _window.YT.PlayState.PAUSED_
* `onBuffering` - called on _window.YT.PlayerState.BUFFERING_
* `onCued` - called on _window.YT.PlayerState.CUED_

## index.css

Import the css using [postcss](https://github.com/postcss/postcss).
```css
@import 'deku-youtube-video';
```
