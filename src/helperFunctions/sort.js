function sort(array, sort, type) {
  if (sort === 0 || sort === 2) {
    return array.sort((a, b) => {
      return a["price"] - b["price"];
    });
  }
  if (sort === 1) {
    return array.sort((a, b) => {
      return (
        a.segments[0].duration +
        a.segments[1].duration -
        (b.segments[0].duration + b.segments[1].duration)
      );
    });
  }
}
export default sort;
