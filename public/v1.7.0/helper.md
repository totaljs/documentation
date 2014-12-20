Sorts the array. Supports the alphabetical sorting.

```javascript
var arr = [];

arr.push({ user: { name: 'Peter', age: 30 }});
arr.push({ user: { name: 'Lucia', age: 33 }});
arr.push({ user: { name: 'John', age: 18 });
arr.push({ user: { name: 'Denis', age: 35 });

console.log(arr.orderBy('user.name'));
console.log(arr.orderBy('user.name', false));
```