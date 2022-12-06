#!/usr/bin/env bash

reset;

NGROK_TOKEN=$(echo $(<ngrok.token) | tr -d " \t\n\r");

ngrok config add-authtoken $NGROK_TOKEN;

ngrok http $PORT > /dev/null &

export NGROK_PID=$!;

echo $NGROK_PID > ./ngrok.pid;
