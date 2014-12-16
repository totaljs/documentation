> __Total.js__ project has a _simple directory structure_. All directories are optional and you can rewrite each path of directory in the framework configuration file.

## Directories

```markdown
controllers
databases
definitions
logs
models
modules
public
resources
source
packages
tests
tmp
views
workers
```

### Directory: controllers

Directory contains only controllers. In controller you can define routes with different actions. Controllers are __most important__ feature in the framework.

- [How do controllers work?](#pages~Controllers)

---

### Directory: databases

Directory contains __NoSQL embedded databases__ (if are). NoSQL database is a plain text file with serialized documents in JSON format. Some [3rd modules](https://github.com/totaljs/modules) store a small data in this directory.

- [How does NoSQL database work?](#pages~NoSQL)
- [Example: Database](https://github.com/totaljs/examples/tree/master/contact-form)

---

### Directory: definitions

Directory contains all definitions. The definition defines behaviour of the framework. The definition is great for change a behaviour of e.g. modules.

- [How do definitions work?](#pages~Definitions)

---

### Directory: logs

Directory contains logs. Log file is plain text file. You can append a log message via `framework.log(message)` everywhere. Log filename is created by date.

- [Example: Logs](https://github.com/totaljs/examples/tree/master/logs)

---

### Directory: models

Directory contains models. The model can contain functions or some [schemas](#api~Builders.SchemaBuilder). Recommended for database models.

- [How do models work?](#pages~Models)
- [Example: Models](https://github.com/totaljs/examples/tree/master/models)

---

### Directory: modules

Directory contains extended modules. The module can create routes or can contain classes, functions or constants. You can download existing modules or you can create your own module.

- [How do modules work?](#pages~Modules)
- [Example: Modules](https://github.com/totaljs/examples/tree/master/framework-modules)
- [Download 3rd modules](https://github.com/totaljs/modules)

---

### Directory: public

This directory is published directory and contains all static files (JavaScripts, CSS files, Pictures, Fonts, Documents, Videos, Uploads, etc.). Browser can get (almost) everything from the public directory.

---

### Directory: resources

If you create web pages that will be read by speakers of different languages, you must provide a way for readers to view the page in their own language. Resources are solution. The resource file has same syntax as a config file.

- [How do resources work?](#pages~Resources)
- [How do localization work?](#pages~Localization)
- [Example: Resources](https://github.com/totaljs/examples/tree/master/localization-resources)

---

### Directory: source

This directory contains a business logic of your application. The source file can contain functions or objects which can be exported and used in each part of application.

- [Example: Source](https://github.com/totaljs/examples/tree/master/framework-business-logic-source)

---

### Directory: packages

This directory contains packages. The package is a file which contains more files packed in one package file. The package behaves like a module (is same as module).

- [How do packages work?](#pages~Packages)

---

### Directory: tests

Test directory contains scripts for assertion testing. In assertion test you can test e.g. controller routing.

- [Example: Tests](https://github.com/totaljs/examples/tree/master/assertion-testing)

---

### Directory: tmp

This directory is a temporary directory and contains temporary files. The framework stores some compiled files, internal cache and form uploads into this directory.

---

### Directory: views

This directory contains views and layouts.

---

### Directory: workers

This directory contains workers. The worker creates a new independent thread, which it can communicate with framework through events.

- [Example: Workers](https://github.com/totaljs/examples/tree/master/workers)
- [Example: Generating sitemap with the Worker](https://github.com/totaljs/examples/tree/master/xml-sitemap-workers)