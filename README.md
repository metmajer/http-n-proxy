# http-n-proxy

*http-n-proxy* is a simple server implementation, based on [nodejitsu/node-http-proxy](https://github.com/nodejitsu/node-http-proxy), which proxies HTTP requests to multiple targets.

## How to run http-n-proxy in Docker?

```
export HTTP_N_PROXY_PORT=8080
export HTTP_N_PROXY_TARGETS="http://localhost:8081,http://localhost:8082"
docker run -d --name http-n-proxy -p 8080:$HTTP_N_PROXY_PORT metmajer/http-n-proxy
```

## License

Licensed under the MIT License. See the LICENSE file for details.