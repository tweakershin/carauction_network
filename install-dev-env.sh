source ~/.bashrc
source ~/.bashrc



npm install -g composer-cli@0.20.8
npm install -g composer-rest-server@0.20.8
npm install -g generator-hyperledger-composer@0.20.8
npm install -g yo
npm install -g mkdirp
npm install -g passport-facebook
npm install -g passport-github
npm install -g passport
npm install -g passport-google

npm install -g composer-playground@0.20.8
npm install -g loopback-connector-mongodb

curl -o ~/fabric-dev-servers.tar.gz https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
mkdir ~/fabric-dev-servers
tar -xvf fabric-dev-servers.tar.gz -C ~/fabric-dev-servers 

export FABRIC_VERSION=hlfv1
export FABRIC_START_TIMEOUT=30

~/fabric-dev-servers/downloadFabric.sh
source ~/.bashrc


