function join(array, separator) {
  return array == null ? '' : Array.prototype.join.call(array, separator);
}

export default join;