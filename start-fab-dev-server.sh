source ~/.bashrc

export FABRIC_VERSION=hlfv1
export FABRIC_START_TIMEOUT=30

~/fabric-dev-servers/startFabric.sh 
~/fabric-dev-servers/createPeerAdminCard.sh