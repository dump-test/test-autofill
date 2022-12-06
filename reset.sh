#!/usr/bin/env bash

[[ -d "./node_modules" ]] &&\
rm -rfv ./node_modules 2> /dev/null && true;

[[ -f "./package-lock.json" ]] &&\
rm -rfv ./package-lock.json 2> /dev/null && true;

npm run stop;

[[ ! -z "$(ls ./*.pid 2> /dev/null)" ]] &&\
rm -rfv ./*.pid 2> /dev/null && true;

[[ -f "./ngrok.token" ]] &&\
rm -rfv ./ngrok.token 2> /dev/null && true;

[[ ! -f "./ngrok.token" ]] &&\
touch ./ngrok.token;

#reset;
