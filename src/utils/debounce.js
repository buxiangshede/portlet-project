export default function debounce(func, time = 200) {
  let timeout = null;

  function debounced(...args) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      func.apply(this, args);
    }, time);
  }

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced;
}
