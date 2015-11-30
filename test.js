'use strict';
/** @jsx element */

import test from 'tape';
import YoutubeVideo from './';
import { renderString, tree } from 'deku';
import element from 'magic-virtual-element';

test('YoutubeVideo', function (t) {
  var render = renderString(tree(<YoutubeVideo id='YoB8t0B4jx4' />));
  t.ok(render.indexOf('YoB8t0B4jx4') >= 0);
  t.end();
});
