# Antourage Widget

## Development

1. Copy .env.dist to .env
2. Install dependencies `yarn install`
3. Run in development mode `yarn dev`

#### React development mode
Navigating to `localhost:3000` allows you to work with react with fast-refresh

#### Embed test mode
Navigating to `localhost:3000/embed.html` simulates widget being embedded on a 3rd party site. Fast-refresh features will be limited.

## Building for production

1. Copy .env.dist to .env
2. Install dependencies `yarn install`
3. Build the widget `yarn build`

## Environment variables

`DATA_URL` api endpoint for widget data (partner id is appended to that link so it has to end with `/`)

`WIDGET_URL` production widget.js path - used to build embed script template

`DEV_PARTNER_ID` partner id used in dev mode

`DEV_WIDGET_URL` development widget.js path (used to embed in dev mode)

## Widget configuration

Widget has its own default configuration. This configuration can be overwritten by data (config field in widget data response) or in JS during embedding.

Priority (starting with the lowest):

1. Default config
2. Data request
3. JS

### Default config
Those options can be changed / overwritten by data request or in js
```js
const DEFAULT_CONFIG = {
  color_widget_border: '#17DDAB', // widget border color
  color_widget_ping_border: '#FB3F39', // widget border color when pinging
  color_cta_bg: '#FB3F39', // cta button background color
  color_overlay_bg: '#000000', // overlay background color
  opacity_overlay: 0.2, // active overlay opacity
  color_cta_text: '#FFFFFF', // cta button foreground color
  color_live: '#FB3F39', // live dot indicator color
  color_title_text: '#080808', // title block foreground color
  color_title_bg: '#FFFFFF', // title block background color
  color_name_bg: '#8D48FF', // name block background color
  color_name_text: '#FFFFFF', // name block foreground color
  ms_ping_every: 60000, // ping interval in ms
  ms_ping_duration: 1500, // ping duration in ms
  widget_hidden: false // should widget start hidden
};
```

### Static config
Those options cannot be changed / overwritten by data request nor in js

```js
const STATIC_CONFIG = {
  widget_size_desktop: 260, // desktop widget size in px (square)
  widget_size_mobile: 200, // mobile widget size in px (square)
  scale_inactive: 0.4, // scale of the widget when it is inactive
  scale_active: 1, // scale of the widget when it is active
  scale_ping: 0.7, // scale of the widget when it is pinging
  ms_animation_duration: 300, // duration of reveal / hide animation
}
```

### Build output
1. `widget.js` - widget's code
2. `widget.js.LICENSE.txt` - widget's license files (has to be published next to widget's code).
3. `embed.txt` - this is a template used for embedding the widget on partner's site.
4. `*.woff and *.woff2` - font files used by the widget (have to be published next to widget's code).

### Embedding with custom config

Default `embed.txt` has an example how to provide `PARTNER_ID`, however you can provide additional configuration options that will override default config.

Example:

```js
window._ANTOURAGE_CONFIG = {
  partner_id: PARTNER_ID,
  color_widget_border: 'pink',
  ms_ping_every: 120000
};
```

This example will embed pink widget that will ping every 2 minutes.


### JS Api

When installed on the site widget exposes a simple / event based API that can be accessed using `window._ANTOURAGE`

#### Events

`load` - triggered when widget loads, before data request

`ready` - triggered when widget successfully loads data and is ready to be displayed

`ping` - triggered each time widget pings

Example:
```js
window._ANTOURAGE.addEventListener('ready', function() {
  console.log('WIDGET IS READY');
});
```


#### Methods

`show()` - shows the widget

`hide()` - hides the widget

Example:
```js
window._ANTOURAGE.show();
```
