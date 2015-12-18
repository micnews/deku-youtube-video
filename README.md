# deku-youtube-video

Youtube video component for [deku](https://github.com/dekujs/deku).

## Usage

```shell
npm install deku-youtube-video
```

```js
import YoutubeVideo from 'youtube-video';

export default {
  render: function () {
    const onLoad = () => {
      console.log('video loaded');
      console.log('so now the youtube iframe gets loaded');
    }

    const onUnload = () => {
      console.log('video unloaded');
      console.log('so now the youtube iframe isn\' loaded anymore.');
    }

    // opened means that the youtube player is opened & the video is playing
    const opened = true;

    return (<YoutubeVideo youtube-id='YoB8t0B4jx4' onLoad={onLoad} onUnload={onUnload} opened={opened} />);
  }
}
```

### Attributes

#### `id=[youtube-video-id]`
Set youtube video ID to use.

## index.css

Import the css using [postcss](https://github.com/postcss/postcss).
```css
@import 'deku-youtube-video';
```
