#!/usr/bin/env bash

[[ -d "./node_modules" ]] &&\
rm -rfv ./node_modules;

[[ -f "./package-lock.json" ]] &&\
rm -rfv ./package-lock.json
