Which files are allowed by the framework for handling static files? Values in config files must be separated with the comma `,` (on one line).

__Default__:

```javascript
['.jpg', '.png', '.gif', '.ico', '.js', '.coffee', '.css', '.txt', '.xml', '.woff', '.otf', '.ttf', '.eot', '.svg', '.zip', '.rar', '.pdf', '.docx', '.xlsx', '.doc', '.xls', '.html', '.htm', '.appcache', '.map', '.ogg', '.mp4', '.mp3', '.webp', '.webm', '.swf', '.package', '.json', '.md']
```

__The config file declaration__:

```html
static-accepts            : .jpg, .ico, .js
```