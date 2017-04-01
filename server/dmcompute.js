'use strict';
var util = require('util');
var events = require("events");
const crypto = require('crypto');
var scoringProtocol = require("./scoring.js");;
//var lmsCompute = require("./sandbox/lms/index.js");
var Git = require("nodegit");
const {NodeVM, VMScript} = require('vm2');
/**
 * Decentralized DMCompute Protocol
 * @constructor
 * @param {Object} options
 */
function DMcompute(liveNetwork, liveDatamodel) {
console.log('DM COMPUTE class');
  events.EventEmitter.call(this);
  this.liveKAD = liveNetwork;
  this.liveDatamodel = liveDatamodel;
  this.ethereumAPI = {};
  this.liveScoring = new scoringProtocol();

  this.listenScoring();
};

/**
* inherits core emitter class within this class
* @method
*/
util.inherits(DMcompute, events.EventEmitter);

/**
 * listening for scoring info.
 * @method listenScoring
 * @param
 * @returns {}
 */
DMcompute.prototype.listenScoring = function() {

    this.liveScoring.on("peer-score-complete", function(computINFO) {

      this.emit("peer-score-complete", computINFO);

  });

};


/**
 * Starts compuation
 * @method startcompute
 * @param
 * @returns {}
 */
DMcompute.prototype.startCompute = function(computecontext, Dmapscid, codeurlIN, codehashIN, datamodelIN, ethereum) {
console.log('starting compute');
    var localthis = this;
    this.ethereumAPI = ethereum;

    if(computecontext == 'visualisation-compute')
    {
      // temp hardwire workflow for demo
      this.liveDatamodel.checkDatalocal(codeurlIN, liveInfluxdb);
      // provide feedback to Client, visualisation data


    }
    else if(computecontext == 'dsample-compute')
    {
      // ask the peer for the appropriate data and record in storage smart contract (note self peer is asking for the data)
      //var storageSCID = localthis.ethereumAPI.recallDatamodel("match-datamodel",datamodelIN);
      var storageSCID = '0x343kjkfdiufdfjdkfj92929292992';
      // need data streaming/piping infrastructure code to supply data cpu environment (local, peer compute, cloud etc.)

      var dataDmap = [[12,20],[13,22],[14,28],[15,26],[16,30],[17,30],[18,38],[19,40],[20,44]];
      var predictionpath = [1,2,3,4,5,6,7,8,9,10]; // timeperiod and granularity of measurement or what is relevant of type of science

      //localthis.ethereumAPI.recallStorageContract("get-token", storageSCID);
      // makes entry for access token, next stream data into the sandbox/docker computure envinroment
      // create a call back function  to bring back results from compute
      function returnPredictionpath (callback) {

        localthis.startSandbox(dataDmap, predictionpath, codeurlIN, codehashIN, callback);

      };

      returnPredictionpath(function(ppresults){
          // prediction path back from LMS computat=======');
console.log('sandbox back results');
console.log(ppresults);
        // record the stoping of cpu
        localthis.ethereumAPI.recallCPUapiContract("stop-compute", Dmapscid);  //needs to be passed on the sandbox environment/docker
        var serialiseArrayPP = JSON.stringify(ppresults);
        // lock this prediction path data in to the blockchain via a hash
        var hashPPath = crypto.createHash('sha256').update(serialiseArrayPP).digest('hex');
        var ppscore = 0;
        // lock prediction path into blockchain
        localthis.ethereumAPI.recallDmapContract('set-ppathhash', Dmapscid, 0, 0, hashPPath, ppscore);
        //  pass on to Scoring protocol
        localthis.liveScoring.startScoring("score-prediction-reality", Dmapscid, predictionpathBack);

      });

    }

      // need to provide feedback to network when Dmap become COMPUTATIONALLY ACTIVE
};

/**
 *  clone git repso, sandbox it and test code
 * @method startSandbox
 * @param
 * @returns {}
 */
DMcompute.prototype.startSandbox = function(dataIN, perdictionpathIN, urlinfaeSmartcontract, commithashinfaeSmartcontract, callbackIN) {
console.log('starting SANDBOXing');
var setdata = JSON.stringify(dataIN);
var setperdictionpath = JSON.stringify(perdictionpathIN);
var seturlinfaeSmartcontract = urlinfaeSmartcontract;
var setcommithashinfaeSmartcontract = commithashinfaeSmartcontract;

var vmscriptbuild = `
var lmsCompute = require("/var/www/html/aboynejames/test/dsensor/resolutionwallet/src/server/sandbox/index.js");
var livelmsCPU = new lmsCompute([[1,4],[2,8],[3,9]], [10,20,30,40,50,100]);
var returnb = livelmsCPU.startCPU(` + setdata + `,` + setperdictionpath + `);
return returnb`;

console.log(vmscriptbuild);

// Clone a given repository into the `./tmp` folder.

var startCloning = Git.Clone(seturlinfaeSmartcontract, "./sandbox")
  // Look up this known commit.
  .then(function(repo) {
    // Use a known commit sha from this repository.
    return repo.getCommit(setcommithashinfaeSmartcontract);
  });

  var errorAndAttemptOpen = function() {
    return NodeGit.Repository.open(local);
  };

  startCloning.catch(errorAndAttemptOpen)
    .then(function(repository) {
      // Access any repository methods here.
      console.log("Is the repository bare?");
      console.log('start of vmscript');
              const script = new VMScript(vmscriptbuild, 'vm.js');
       console.log(script);

              const vm =  new NodeVM({
                  console: 'inherit',
                  sandbox: {},
                  require: {
                      external: true,
                      builtin: ['fs', 'path'],
                      root: "./",
                      mock: {
                          fs: {
                              readFileSync() { return 'Nice try!'; }
                          }
                      }
                  },
                  wrapper: 'none'
              });

              var testcodeforarray = vm.run(script);
              callbackIN(testcodeforarray);
    });

};


module.exports = DMcompute;
