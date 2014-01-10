/**
 * (Sort of) fixes JavaScript's built-in Array.prototype.sort method.
 *
 * Numbers come first, then strings. Other stuff (e.g., objects) doesn't make
 * sense to sort w/o passing a function, so you get undefined behavior.
 *
 * @example
 * [1, 10, 5].sort();  // => [1, 5, 10]
 * ['b', 'a'].sort();  // => ['a', 'b']
 * [1, '2', 3].sort(); // => [1, 3, '2']
 * ['b', 1, '3', 'a', 2].sort(); // => [1, 2, '3', 'a', 'b']
 *
 * // Make sure custom comparisons still work
 *
 * [{ foo: 2 }, { foo: 1 }].sort(function(x, y) {
 *   return x.foo - y.foo;
 * });
 * // => [{ foo: 1 }, { foo: 2 }]
 *
 * [1, 2, 3].sort(function(x, y) { return y - x; });
 * // => [3, 2, 1]
 */
(function(arrayProto) {
  
  var original = arrayProto.sort;

  function baseCompare(x, y) {
    if (x == y) {
      return 0;
    }

    return x > y ? 1 : -1;
  }

  function defaultCompareFunction(x, y) {
    var flags =
      (typeof x == 'number' ? 1 : 0) +
      (typeof y == 'number' ? 2 : 0);

    switch (flags) {
      case 0: // neither is a number
        return baseCompare(x, y);

      case 1: // x is number, y is not
        return -1;

      case 2: // y is number, x is not
        return 1;

      case 3: // both are numbers
        return x - y;
    }
  }

  arrayProto.sort = function sort(compareFunction) {
    return original.call(this, compareFunction || defaultCompareFunction);
  };

}(Array.prototype));
