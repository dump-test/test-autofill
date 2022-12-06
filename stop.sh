#!/usr/bin/env bash

[[ ! -z "$(ls ./ngrok.pid 2> /dev/null)" ]] &&\
NGROK_PID=$(echo $(<ngrok.pid) | tr -d " \t\n\r") &&\
kill -9 $NGROK_PID &> /dev/null && true;

[[ ! -z "$(ls ./node.pid 2> /dev/null)" ]] &&\
NODE_PID=$(echo $(<node.pid) | tr -d " \t\n\r") &&\
kill -9 $NODE_PID &> /dev/null && true;

sleep 1;

reset;
