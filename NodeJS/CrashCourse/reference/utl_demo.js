const url = require('url');

const myUrl = new URL('http://mywebsite.com:8080/hello.html?id=100&status=active');

// Serialized URL
console.log(myUrl.href)
console.log(myUrl.toString())

// Host (root domain)
console.log(myUrl.host)

// Hostname (does not get port)
console.log(myUrl.hostname)

// Pathname
console.log(myUrl.pathname)

// Serialized query (params/vars)
console.log(myUrl.search)
console.log(myUrl.searchParams)

// Add params (dynamycally)
myUrl.searchParams.append('abc', 123);
console.log(myUrl.searchParams)

// Loop through params
myUrl.searchParams.forEach((value, name) => console.log(`${value}: ${name}`));
