Writes the image/picture without cache, slowly than `responseImage()`. A file extension must exist in `config['static-accepts']`.

__Examples__:

```javascript
framework.responseImage(req, res, stream, function(image) {
    image.resize('50%');
    image.output('png');
    image.minify();
});
```