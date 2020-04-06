function fill(array, start, end) {
  const length = array == null ? 0 : array.length;
  return length > 0 ? array.fill(start, end) : [];
}
