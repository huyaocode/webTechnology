/**
 * 转换 value 为普通对象。 包括继承的可枚举属性。
 * 
 * function Foo() {
 *   this.b = 2
 * }
 *
 * Foo.prototype.c = 3
 *
 * assign({ 'a': 1 }, new Foo)
 * // => { 'a': 1, 'b': 2 }
 *
 * assign({ 'a': 1 }, toPlainObject(new Foo))
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */

function toPlainObject(value) {
  value = Object(value)
  const result = {};

  for(const key in value) {
    result[key] = value[key];
  }
  return value;
}