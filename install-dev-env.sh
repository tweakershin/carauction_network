source ~/.bashrc

npm install -g composer-cli@0.20
npm install -g composer-rest-server@0.20
npm install -g generator-hyperledger-composer@0.20
npm install -g yo

npm install -g composer-playground@0.20


curl -o ~/fabric-dev-servers.tar.gz https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
mkdir ~/fabric-dev-servers
tar -xvf fabric-dev-servers.tar.gz -C ~/fabric-dev-servers 

export FABRIC_VERSION=hlfv12
~/fabric-dev-servers/downloadFabric.sh

