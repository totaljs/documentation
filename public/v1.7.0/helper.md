The __SchemaBuilder__ is helpful for model definitions. You can validate and prepare some data according to the schema. The __SchemaBuilder__ supports transformations, workflows, validations, rules and standard operations (READ, SAVE, REMOVE, QUERY, GET).

```javascript
// "Builders" is a global variable
// Creating the group of entities
var group = Builders.schema('webpage');

// Creating the entity
var User = group.add('User');

// Definition of properties
User.define('alias', 'string(30)', true);
User.define('age', Number, true);
User.define('token', String);
User.define('created', Date);

// Definition of validation
User.setValidation(function(propertyName, value, path, schemaName, model) {
    if (propertyName === 'alias')
        return value.length > 0;
    if (propertyName === 'age')
        return value > 10 && value < 20 ? 'Only for teenegers.' : true;
});

// Definition of default values
User.setDefault(function(propertyName, isntPreparing, schemaName) {
    if (propertyName === 'created')
        return new Date();
    if (propertyName === 'token')
        return Utils.GUID(20);
});

User.setSave(function(...){ });
User.setGet(function(...){ });
User.setRemove(function(...){ });
User.setQuery(function(...){ });

// Usage:
SCHEMA('webpage', 'User').get(100, function(err, result) { ... });

// or

SCHEMA('webpage', 'User').make(SOME_OBJECT, function(err, model) {
    if (err)
        return;
    // model.$save([helper], [callback]);
    // model.$remove([helper], [callback]);
    // model.$transform(name, [helper], [callback]);
    // model.$compose(name, [helper], [callback]);
    // model.$workflow(name, [helper], [callback]);
    // model.$validate([resourcePrefix], [resourceName], [errorBuilder]);
    // model.$destroy();
    // model.$rule(name);
    // model.$clean();
    // model.$prepare();
    // model.$schema();
});
```

__IMPORTANT:__

```html
group   = SchemaBuilder
entity  = SchemaBuilderEntity
```