#!/usr/bin/env bash

reset;

export TUNNEL_URL="$(curl -s http://localhost:4040/api/tunnels | jq ".tunnels[0].public_url")";

sleep 1;

echo "\n\r";

echo $TUNNEL_URL;
