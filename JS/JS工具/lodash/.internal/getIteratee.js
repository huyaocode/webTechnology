function getIteratee() {
  var result = lodash.iteratee || iteratee;
  result = result === iteratee ? baseIteratee : result;
  return arguments.length ? result(arguments[0], arguments[1]) : result;
}

export default   getIteratee;