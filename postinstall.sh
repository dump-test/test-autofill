#!/usr/bin/env bash

[[ ! -x $(which ngrok) ]] &&\
sudo snap install ngrok;

[[ ! -x $(which ruby) ]] &&\
sudo snap install ruby --classic;

[[ ! -x $(which jq) ]] &&\
sudo apt-get install jq;

gem update --system;

[[ ! -x $(which compass) ]] &&\
gem install compass;

GEM_BIN_PATH="$HOME/.gem/bin";
GBP=$GEM_BIN_PATH;

#;	@note: clean nodejs binary path;
[[ $(echo $PATH | grep -oP $GBP | head -1) == $NVPN ]] &&\
export PATH="$(echo $PATH | tr ":" "\n" | grep -v $GBP | tr "\n" ":" | sed "s/:\{2,\}/:/g" | sed "s/:$//")";

#;	@note: export nodejs binary path;
[[ $(echo $PATH | grep -oP $GBP ) != $GBP ]] &&\
export PATH="$PATH:$GBP";

cd ./node_modules/chosen;

[[ -d "../chosen" ]] &&\
npm install;

[[ -d "../chosen" ]] &&\
grunt build;

[[ -d "../chosen" ]] &&\
cd -;

#reset;
