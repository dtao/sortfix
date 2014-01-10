sortfix
=======

I love JavaScript. But the [`sort` function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) is admittedly broken.

```javascript
[5, 10, 1].sort();
// => [1, 10, 5]
```

This humble little package "fixes" it, to make it a little more sane.

I won't claim that this is any sort of comprehensive sort implementation. It just makes the default behavior for `sort` a little more sensible:

- Arrays of numbers are sorted properly
- Arrays of strings are sorted properly
- For mixed arrays (numbers + strings), numbers come first, then strings
- For everything else (`null`, bools, objects, etc.), I personally don't think sorting with `sort()` even makes sense. So the behavior in this case is undefined. (Sorting with a custom comparison function is still supported, of course.)

Here's how you "use" it:

```javascript
// Array.prototype.sort gets patched in here.
require('sortfix');

[5, 10, 1].sort();
// => [1, 5, 10]
```

That's it and that's all.
