module.exports = function parse(url) {
  let tempUrl = url;
  let hash = '';
  let query = {};
  let protocol;
  let path = '';
  let port = '';

  const colonIdx = tempUrl.indexOf(':');
  protocol = tempUrl.slice(0, colonIdx);
  tempUrl = tempUrl.slice(colonIdx + 3);

  const hashIdx = tempUrl.indexOf('#');
  if (hashIdx > 0) {
    hash = tempUrl.slice(hashIdx + 1);
    tempUrl = tempUrl.slice(0, hashIdx);
  }

  const queryIdx = tempUrl.indexOf('?');
  if (queryIdx > 0) {
    const queryPairs = tempUrl.slice(queryIdx + 1).split('&');
    queryPairs.forEach(pair => {
      [key, value] = pair.split('=');
      query[key] = decodeURIComponent(value);
    });
    tempUrl = tempUrl.slice(0, queryIdx);
  }

  const pathIdx = tempUrl.indexOf('/');
  if (pathIdx > 0) {
    path = tempUrl.slice(pathIdx);
    tempUrl = tempUrl.slice(0, pathIdx);
  }

  const portIdx = tempUrl.indexOf(':');
  if (portIdx > 0) {
    port = tempUrl.slice(portIdx + 1);
    tempUrl = tempUrl.slice(0, portIdx);
  }


  return { hash, query, protocol, path, port, domain: tempUrl };
}
