# gke-function-create
Create a function in GKE to time how long it takes
This was used during QwikLab Cloud Hero events to see if regions or time affects cluster creation time (it doesn't much!)

### How to use
1. Create a Cloud Scheduler job that triggers a Pub/Sub (to be created)
2. Create a Cloud Pub/Sub which the above Cloud Scheduler calls 
3. Create a NodeJs Cloud Function via the GCP Console UI which is triggered via Pub/Sub
4. Replace `index.js` with file in this repo
5. Replace `package.json` with file in this repo
