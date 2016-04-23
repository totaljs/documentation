A sitemap file `/sitemap` (`+v1.9.1`) is very helpful generating breadcrumb (navigation) or sitemap. The sitemap file `/sitemap` is a plain text and has same syntax as framework config file.

- [Example](https://github.com/totaljs/examples/tree/master/sitemap)

```html
/controllers
/debug.js
/release.js
/sitemap
```

## Declaration

```html
ID             : Name                   --> URL                --> [Parent (OPTIONAL)]
```

## How does it work?

File: `/sitemap` e.g.:

```html
homepage       : Homepage               --> /
contact        : Contact                --> /contact/         --> homepage
privacy        : @(Localized Privacy)   --> /privacy/         --> terms
products       : Product catalog        --> /products/*       --> homepage
detail         : Product detail         --> /detail/{0}/      --> products
```

- sitemap `name` can be as view title (when is the title not defined in the view)
- supports localization `@(Text to translate)`
- supports wildcard routing `*`

### Method

- `controller.sitemap_url(id_sitemap, arg1, arg2, arg3, argN)`
- `controller.sitemap_name(id_sitemap, arg1, arg2, arg3, argN)`
- `controller.sitemap_change(id_sitemap, property, new_value)`

### Usage in views

__View layout.html__:

```html
<nav class="breadcrumb">
    @{foreach m in sitemap()}

        <!--
        m.sitemap    : current sitemap id
        m.id         : current item id
        m.name       : current item name
        m.url        : current item url
        m.last       : is the last item?
        m.first      : is the first item?
        m.index      : current item index in sitemap (in the parent tree)
        m.wildcard   : does the current item contains a wildcard routing?
        -->

        <a href="@{m.url}">@{m.name}</a>
    @{end}
</nav>
```

### Supports sitemap routing

```javascript
exports.install = function() {
    F.route('#homepage', 'homepage');
    F.route('#contact',  'contact');
    F.route('#privacy',  'privacy');
    F.route('#products', 'products');
    F.route('#detail',   'detail');
};
```

### Usage in the view engine

- framework modifies a `title` according to the sitemap when is the `title` undefined
- framework caches output from the sitemap because of performance, but it offers methods to modify values

__View index.html__:

```html
@{sitemap('homepage')}

<h1>@{title}</h1>
```

__View terms.html__:

```html
@{sitemap('terms')}

<h1>@{title}</h1>
```

__View privacy.html__:

```html
@{sitemap('privacy')}

<h1>@{title}</h1>
```

__View contact.html__:

```html
@{sitemap('contact')}

<h1>@{title}</h1>
```

__View products.html__:

```html
@{sitemap('products')}

<!-- IMPORTANT, framework caches output from the sitemap because of performance -->
<!-- So we have to change info manually -->
@{sitemap_change('products', 'url', url)}

<h1>@{title}</h1>
```

__View detail.html__:

```html
@{sitemap('detail')}

<!-- IMPORTANT, framework caches output from the sitemap because of performance -->
<!-- So we have to change info manually -->
@{sitemap_change('detail', 'url', url)}
@{sitemap_change('detail', 'name', model.name)}

<h1>@{title}</h1>
```


### Usage in the code

- [framework.sitemap](#api~Framework~framework.sitemap) `+v1.9.1`

```javascript
// Finds only the one item and returns the Object
console.log(F.sitemap('terms', true));

// Finds all items in the sitemap tree and returns the Array
console.log(F.sitemap('terms'));
```