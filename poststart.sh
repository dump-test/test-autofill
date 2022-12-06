#!/usr/bin/env bash

#reset;

sleep 3;

NGROK_API_PORT=$(lsof -i -P -n | grep LISTEN | grep $(<ngrok.pid) | tr -s ' ' | cut -d ' ' -f 9 | cut -d ':' -f 2);

export TUNNEL_URL="$(curl -s http://localhost:$NGROK_API_PORT/api/tunnels | jq ".tunnels[0].public_url")";

sleep 1;

echo -e "\n\r";

echo $TUNNEL_URL;
