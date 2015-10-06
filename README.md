# i18n Wrapper for WebPack

A simple WebPack plugin that accepts an instance of i18n (https://www.npmjs.com/package/i18n) and provides localisation based on the configured i18n instance.

## Usage

```javascript
var i18nWebpackPlugin = require('i18n-wrapper-webpack-plugin');
var i18n = require('i18n');

...


 // ...inside the WebPack configuration object
 plugins: [..., new i18nWebpackPlugin(i18n), ...]

```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
