'use strict';

var http = require('http'),
    httpProxy = require('http-proxy');

if (!process.env.HTTP_N_PROXY_TARGETS) {
  console.log('Failed to determine proxy targets: environment variable HTTP_N_PROXY_TARGETS has not been set');
  process.exit(1);
}

var proxy = httpProxy.createProxyServer({})
  .on('error', function (err) {
    console.log(e);
  });

var proxyPort = process.env.HTTP_N_PROXY_PORT || 80;
var proxyTargets = process.env.HTTP_N_PROXY_TARGETS.split(/, ?/);

var server = http.createServer(function(req, res) {
  proxyTargets.forEach(function(value) {
    proxy.web(req, res, { target: value });
  });
});

console.log('http-n-proxy is listening on port ' + proxyPort);
server.listen(proxyPort);
