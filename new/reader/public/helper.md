"Views" render HTML. You can render "view" in "view" and "view" is rendered into the layout at the end. View engine supports conditions, loops and inline helpers.

__More informations__

- View is plain HTML file with `.html` extension.
- __IMPORTANT:__ Server tags are represented as `@{keyword}` (encoded) tag and `@{!keyword}` (raw) tag.
- Views are synchronous.
- Views are compiled into the function.
- All views (HTML) are minimized under compilation (total.js saves memory).
- Layout is rendered at the last (if it's not disabled).
- You can render some view into the string.
- Class: [FrameworkViews](#api~FrameworkViews)

### Examples

Most [examples](https://github.com/totaljs/examples) contain views.

---

![View engine](img/viewengine.png)

---

## Repository vs. Model

Exist many ways how to send some values between views and controllers. You can transfer data between controller and view via `controller.repository` or `controller.view('name', model)` (model).

![Repository vs. model](img/viewengine-repository-vs-model.png)
