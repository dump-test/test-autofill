#!/usr/bin/env bash

[[ ! -z "$(ls ./*.pid 2> /dev/null)" ]] &&\
kill -9 "$(<./ngrok.pid)" "$(<./node.pid)" &> /dev/null && true;

sleep 1;

reset;
