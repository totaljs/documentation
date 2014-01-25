# Fulltext search engine

```
$ npm install fulltext
```

- easy to use
- each document is stored as one JSON file
- max 20 000 documents per fulltext database

```js

var Fulltext = require('fulltext');
var fulltext = Fulltext.load('blogs', 'directory-database');

var id1 = fulltext.add('My first blog', { title: 'Blog 01', created: new Date() });
var id2 = fulltext.add('My second blog', { title: 'Blog 02', created: new Date() });

// options.alternate = true | false;
// options.strict = true | false;
// options.skip = 0;
// options.take = 50;
fulltext.find('mail', { take: 10, skip: 0 }, function(count, docs) {
	// count  - count in database
	// docs   - Array of documents (count == take)
	console.log(docs);
});

```

### fulltext.add(text, document, [callback], [maximum words]);

Add text to a fulltext database.

```js
var id = fulltext.add('My first blog', { IdBlog: 1, Description: 'My blog' });

// Example of result id: 1385663922462
```

### fulltext.update(id, text, document, [callback]);

Update item in a fulltext database.

```js
fulltext.update(1385663922462, 'My first blog in the world.', { IdBlog: 1, Description: 'My blog' });
```

### fulltext.remove(id, [callback]);

Remove item from a fulltext database.

```js
fulltext.remove(1385663922462);
```

### fulltext.drop([callback])

Drop fulltext database.

```js
fulltext.drop([callback]);
```

### fulltext.read(id, [callback]);

Read document.

```js
fulltext.read(1385663922462, function(err, doc) {

	if (err)
		throw err;
	
	console.log(doc);
});
```

### fulltext.find(text, options, [callback])

Find text in fulltext database.

```js
fulltext.find('world blog', { take: 10 }, function(count, docs) {
	// count === all found results in a fulltext database
	// docs  === current results
	console.log(docs);
});
```

## The MIT License

Copyright (c) 2012-2013 Peter Širka <petersirka@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## I recommend

[partial.js - web application framework for node.js](https://github.com/petersirka/partial.js)

## Contact

[www.petersirka.sk](http://www.petersirka.sk) - <petersirka@gmail.com>