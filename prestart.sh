#!/usr/bin/env bash

reset;

ngrok http $PORT > /dev/null &

export NGROK_PID=$!;

echo $NGROK_PID > ./ngrok.pid;
