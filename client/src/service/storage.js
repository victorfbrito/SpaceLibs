function get(key) {
  const authCache = localStorage.getItem(key);
  console.log("authCache: " + authCache);
  if (authCache) return JSON.parse(authCache);
}

function set(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function reset(key) {
  localStorage.removeItem(key);
}

export default {
  get,
  set,
  reset,
};
