const parse = require('./url-parser');

test('extract hash', () => {
  expect(parse('http://test.com#spam')).toEqual(expect.objectContaining({ 'hash': 'spam' }));
});

test('when hash is empty return empty string', () => {
  expect(parse('http://test.com')).toEqual(expect.objectContaining({ 'hash': '' }));
});

test('parse query string', () => {
  expect(parse('http://test.com?a=1&b=2')).toEqual(expect.objectContaining({ 'query': { 'a': '1', 'b': '2' } }));
});

test('parse protocol', () => {
  expect(parse('http://test.com')).toEqual(expect.objectContaining({ protocol: 'http' }));
  expect(parse('https://test.com')).toEqual(expect.objectContaining({ protocol: 'https' }));
});

test('parse protocol', () => {
  expect(parse('http://test.com/spam')).toEqual(expect.objectContaining({ path: '/spam' }));
  expect(parse('http://test.com')).toEqual(expect.objectContaining({ path: '' }));
});

test('parse port', () => {
  expect(parse('http://test.com:8080')).toEqual(expect.objectContaining({ port: '8080' }));
  expect(parse('http://test.com')).toEqual(expect.objectContaining({ path: '' }));
});

test('parse domain', () => {
  expect(parse('http://test.com.br')).toEqual(expect.objectContaining({ domain: 'test.com.br' }));
});

test('parse domain', () => {
  expect(parse('https://test.com.br:3003/some/path/?foo=bar&baz=qux#/wow')).toEqual({
    protocol: 'https',
    domain: 'test.com.br',
    port: '3003',
    path: '/some/path/',
    query: { foo: 'bar', baz: 'qux' },
    hash: '/wow'
  });
});

test('parser querystring with special chars', () => {
  expect(parse('http://test.com?name=Edu%20Matos')).toEqual(expect.objectContaining({ query: { name: 'Edu Matos' } }));
});
