#!/usr/bin/env bash

#reset;

ngrok config add-authtoken $(<ngrok.token);

ngrok http $PORT > /dev/null &

export NGROK_PID=$!;

echo $NGROK_PID > ./ngrok.pid;
