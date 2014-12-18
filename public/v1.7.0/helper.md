This property stores helpers for view engine.

__Example__:

```javascript
framework.helpers.sum = function(a, b) {
    return a + b;
};
```

View:

```html
<div>@{sum(10, 10)} === 20</div>
```