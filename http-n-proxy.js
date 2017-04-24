'use strict';

var http = require('http'),
    httpProxy = require('http-proxy');

if (!process.env.HTTP_N_PROXY_TARGETS) {
  console.log('Failed to determine proxy targets: environment variable HTTP_N_PROXY_TARGETS has not been set');
  process.exit(1);
}

var proxyPort = process.env.HTTP_N_PROXY_PORT || 80;
var proxyTargets = process.env.HTTP_N_PROXY_TARGETS.split(/, ?/);
var verbose = process.env.HTTP_N_PROXY_VERBOSE || false;

var proxy = httpProxy.createProxyServer({})
  .on('error', function (err) {
    // don't throw on error, keep listening
    console.log(err);
  })
  .on('proxyReq', function(proxyReq, req, res, options) {
    console.log('Request: ' + req.url);
    console.log('Method: ' + req.method);

    if (verbose) {
      console.log('Headers:' + JSON.stringify(req.headers, true, 2));
    }
  });

var server = http.createServer(function(req, res) {
  proxyTargets.forEach(function(value) {
    proxy.web(req, res, { target: value });
  });
});

console.log('http-n-proxy proxies traffic to the following targets:');
proxyTargets.forEach(function(value) {
  console.log('- ' + value);
});
console.log('');

console.log('http-n-proxy is listening on port ' + proxyPort);
server.listen(proxyPort);
