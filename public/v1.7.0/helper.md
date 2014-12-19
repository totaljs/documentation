Checks if `ETag` or `Last Modified` header is modified.

```javascript
    if (compare === String)
        console.log('The framework compares ETag with the compare value.');
    else if (compare === Date)
        console.log('The framework compares Date with the compare date.');
```

If framework doesn't find a difference then responds 304 (not modified). If the content is modified then function returns `true`.