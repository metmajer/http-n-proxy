#!/bin/bash
s2i build . centos/nodejs-44-centos7 metmajer/http-n-proxy --copy --loglevel=5
