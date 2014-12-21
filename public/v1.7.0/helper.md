The function caches the output from `controller.view()` - the layout is not cached (only view), `controller.json()` and `controller.plain()`. It improves your response time. Data are saved into the memory.

```javascript
function some_action() {
    var self = this;
    self.memorize('top-products', '5 minutes', function() {
        // Is executes only once in 5 minutes
        DATABASE('products').find({ top:1 }, function(err, docs) {
            self.view('top-products', docs);
        });
    });
}
```