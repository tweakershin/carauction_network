source ~/.bashrc

export FABRIC_VERSION=hlfv12
export FABRIC_START_TIMEOUT=30

~/fabric-dev-servers/startFabric.sh 
~/fabric-dev-servers/createPeerAdminCard.sh