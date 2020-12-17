const container = require('@google-cloud/container');
const client = new container.v1.ClusterManagerClient();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

async function quickstart() {
  const zone = 'us-central1-c';
  const projectId = await client.getProjectId();
  console.log('projectId:' + projectId)
  const request = {
    projectId: projectId,
    zone: zone,
  };

  /*
  const [response] = await client.listClusters(request);
  console.log(response);
  return;
  */

  var cluster = {
      name: 'cluster' + getRandomInt(100),
      initialNodeCount: 1
  };

  var req = {
      cluster: cluster,
      projectId: projectId,
      zone: zone
  };

  var clusterName = '';
  var start = new Date();
  const [myCluster] = await client.createCluster(req);
  console.log('creating...' + myCluster.targetLink);
 
  var created = false;
  while(!created) {
        const [response] = await client.listClusters(request);
        for (let i = 0; i < response.clusters.length; i++) {
            const cluster1 = response.clusters[i];
            if (cluster1.status == 'RUNNING') {
                console.log(cluster1.name + ':' + cluster1.status);
                created = true;
            }
            if (!clusterName) {
                console.log(cluster1.name + ':' + cluster1.status);
                clusterName = cluster1.name;
            }
        }
        if (!created) {
            await sleep(5000);
        }
  }

  var end = new Date() - start;
  console.info('Execution time: %dms', end);
  
  var req = { 
      projectId: projectId,
      clusterId: clusterName,
      zone: zone 
  }

  var [res] = await client.deleteCluster(req);
  console.log('deleting: ' + res.targetLink);
}

exports.helloPubSub = async (event, context) => {
    console.log('create client');
    await quickstart();
};
