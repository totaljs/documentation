Registers a new file route. This function can handle static files. For more informations look for the example.

```js
framework.file(‘*.jpg’, function(req, res, isValidation) {
    if (isValidation)
        return req.url.lastIndexOf(‘.jpg’) !== -1;
    // ... transform
    res.file('new-file-name.jpg');
});
```