- Framework protects XSS automatically - [Cross-site scripting](http://en.wikipedia.org/wiki/Cross-site_scripting).
- Use AJAX/XHR form submitting for protection of [CSRF attacks](http://en.wikipedia.org/wiki/Cross-site_request_forgery)
- View renders an encoded HTML as default.
- Framework supports method for setting of [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing).
- Framework supports auto-binding model into forms.
- Framework automatically checks incoming requests and bad requests automatically destroys.
- Framework checks length of uploading files.
- All requests are destroyed when don't have defined a route.

---

## Examples

- [Example: XSS protection](https://github.com/totaljs/examples/tree/master/xss-protection)
- [Example: CSRF](https://github.com/totaljs/examples/tree/master/csrf)
- [Example: CORS](https://github.com/totaljs/examples/tree/master/cors)
- [Example: Auto binding values](https://github.com/totaljs/examples/tree/master/forms)