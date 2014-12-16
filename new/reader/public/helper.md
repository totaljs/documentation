The controller supports 3x types of route _classic_, _websocket_ and _file route_. The controller with modules are the main features of the framework logic.

- The classic route handles classic requests to dynamic contents (views).
- The websocket route handles WebSockets connections.
- The file route handles static files.

__More informations__

- The controller is plain JavaScript file.
- The framework automatically loads controller into the memory.
- `exports.install` is executed automatically and one time.
- Views are loaded according to the controller name from `your-app/views/your-controller-name/`.
- You can create unlimited count of controllers.
- Controller can be injected from URL address, [example](https://github.com/totaljs/examples/tree/master/framework-install-controller).
- Routing supports routing according to subdomains, [example](https://github.com/totaljs/examples/tree/master/routing-subdomain).
- The controller can communicate with other controller.

---

## Examples

- [Example: Routing](https://github.com/totaljs/examples/tree/master/routing)
- [Example: Routing + Flags](https://github.com/totaljs/examples/tree/master/routing-flags)
- [Example: Routing + Flags + Roles](https://github.com/totaljs/examples/tree/master/routing-flags-roles)
- [Example: Inline routing](https://github.com/totaljs/examples/tree/master/routing-inline)
- [Example: Image resizer routing](https://github.com/totaljs/examples/tree/master/routing-resize)
- [Example: Subdomain routing](https://github.com/totaljs/examples/tree/master/routing-subdomain)
- [Example: Routing timeout](https://github.com/totaljs/examples/tree/master/routing-timeout)
- [Example: WebSocket routing](https://github.com/totaljs/examples/tree/master/websocket)
- [Example: Cancel executing action in controller](https://github.com/totaljs/examples/tree/master/controller-cancel)
- [Example: Sending email from action in controller](https://github.com/totaljs/examples/tree/master/controller-mail)
- [Example: Cache output from action in controller](https://github.com/totaljs/examples/tree/master/controller-memorize)
- [Example: Communicating between controllers between different web apps](https://github.com/totaljs/examples/tree/master/controller-proxy)
- [Example: Sharing functions between controllers](https://github.com/totaljs/examples/tree/master/controller-sharing)
- [Example: Transfer request to different action](https://github.com/totaljs/examples/tree/master/controller-transfer)
- [Example: Install controller from URL](https://github.com/totaljs/examples/tree/master/framework-install-controller)
- [Example: Project structure](https://github.com/totaljs/examples/tree/master/project-structure)

---

## The definition

### PROPERTY: exports.id;

`optional` Can contain only controller name (it's an identificator name). A __default value__ for this property is controller filename without extension.

```javascript
exports.id = 'Controller name';
```

### METHOD: exports.install;

`optional` `important` This is the initialization function of the controller. This function is executed when framework loads controllers and and this function is a scope for define routes. A route can be defined inline, outside of install function.

```javascript
exports.install = function() {
    framework.route('/');
    framework.route('/api/{type}/', json_api, ['put', 'json']);
};
```

### METHOD: exports.uninstall;

`optional` This function is executed when framework uninstalls the controller.

```javascript
exports.uninstall = function() {
    console.log('This controller is uninstalled.');
};
```

### METHOD: exports.usage;

`optional` This function may return exploitation of controller. [Example: Usage](https://github.com/totaljs/examples/tree/master/framework-usage).

```javascript
exports.usage = function() {
    return { requests: counter };
};
```

### Full example of controller

Filename: `controllers/default.js`

```javascript
exports.install = function() {
    framework.route('/', view_index);
    framework.route('/contact/', view_contact);
    framework.route('/hello/', plain_hello);
    framework.route('/api/codelist/', json_codelist, ['xhr', 'get']);
};

function view_index() {
    this.layout('layouts/homepage');
    this.view('index');
}

function view_contact() {
    this.view('contact', { email: '@' });
}

function plain_hello() {
    this.plain('Hello world!');
}

function json_codelist() {
    this.mail('info@company.com', 'Codelist notifications', 'mails/codelist');
    this.json([1, 2, 3, 4, 5]);
}

// or inline route
framework.route('/services/', function() {
    this.view('services');
});
```

## Routing

- Method: [framework.route()](#api~framework.route)
- Method: [framework.websocket()](#api~framework.websocket)
- Method: [framework.file()](#api~framework.file)
- List: [route flags](#api~HttpRouteOptionsFlags)

### System routing

```javascript
exports.install = function() {
    framework.route('#400', custom); // Bad Request
    framework.route('#401', custom); // Unauthorized
    framework.route('#403', custom); // Forbidden
    framework.route('#404', custom); // Not Found
    framework.route('#408', custom); // Request Timeout
    framework.route('#431', custom); // Request Header Fields Too Large
    framework.route('#500', custom); // Internal Server Error
    framework.route('#501', custom); // Not Implemented
}

function custom() {
    this.view('http-error-view');
}
```