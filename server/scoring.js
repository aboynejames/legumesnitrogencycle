'use strict';
var util = require('util');
var events = require("events");
const crypto = require('crypto');
const ss = require('simple-statistics');
/**
 * Decentralized Scoring Prediction Protocol
 * @constructor
 * @param {Object} options
 */
function scorePP() {

  events.EventEmitter.call(this);

};

/**
* inherits core emitter class within this class
* @method
*/
util.inherits(scorePP, events.EventEmitter);


/**
 * Start Scoring of Prediction paths
 * @method startScoring
 * @param
 * @returns {}
 */
scorePP.prototype.startScoring = function(action, DmapidIN, predictionpathIN) {
  // need to stream in data from sensor and match to prediction path intervals
  var realityIN = []
  realityIN = [[1518790114553, 5404491332188.189 ],[1550326114553, 5495945732188.189 ],[1581862114553, 5587400132188.189 ],[1613398114553, 5678854532188.189 ],[1644934114553, 5770308932188.189 ],[1676470114553, 5861763332188.189 ],[1708006114553, 5953217732188.189 ],[1739542114553, 6044672132188.189 ],[1771078114553, 6136126532188.189 ],[1802614114553, 6227580932188.189 ]];

  if(action == "score-prediction-reality")
  {
    // perform scoring LMS -> Beysian -> ML over time / events
console.log('start of Dsensor scoring protocol');
      // set up event on scoring API module
      this.pvaluescore(DmapidIN, realityIN, predictionpathIN);

  }

};

/**
 * Stop the scoring
 * @method stopScoring
 * @param
 * @returns {}
 */
scorePP.prototype.stopScoring = function(action, DmapidIN) {
  // protocol provide validation information back to network

  if(action == "validity-score-share")
  {
    // perform scoring LMS -> Beysian -> ML over time / events
console.log('how the protocol assesses this Dmap');

  }



};

/**
 *  compute p value
 * @method pvaluescore
 * @param
 * @returns {}
 */
scorePP.prototype.pvaluescore = function(DmapidIN, predctionIN,  realityIN) {
  // protocol provide validation information back to network
  // calculate the difference between reality and predicted value
  var scoreDifference = [];
  var scoreRegress = [];

  //Iterate through all elements in first array
  for(var x = 0; x < realityIN.length; x++){
console.log('start of loop again');
      //Iterate through all elements in second array
      for(var y = 0; y < predctionPath.length; y++){

        if(x == y){

          var diff = realityIN[x][1] - predctionPath[y][1];
          scoreDifference.push(diff);
          scoreRegress.push([x,diff]);
          diff = null;

        }
      }
  }

console.log('differences array');
console.log(scoreDifference);


  var meanvalue = ss.mean(scoreDifference);
console.log("meanvalue = " + meanvalue);

  var standardDeviationvalue = ss.standardDeviation(scoreDifference);
console.log("standardDeviationvalue = " + standardDeviationvalue);

  var rootMeanSquarevalue = ss.rootMeanSquare(scoreDifference);
console.log("rootMeanSquarevalue = " + rootMeanSquarevalue);

  var znumber = 2;
  var zScorevalue = ss.zScore(znumber, meanvalue, standardDeviationvalue);
console.log("zScorevalue = " + zScorevalue);

// null hypothesis
// h0  equal to zero  (5% Conf interval)

// non-null hypothesis
// h1 not equal to zero difference

  // calculate z
  var numbersamples = 10;

  var zscore = (meanvalue - 0) / (standardDeviationvalue/(Math.sqrt(numbersamples)));
console.log("decsion rule  reject if z below is less than -1.645")
console.log("zscore " + zscore)
console.log("p -value");
  var pvalue = -0.05 - (0.0968);
console.log(pvalue);
//using package
  var autopvalue = ss.tTest(scoreDifference, 0).toFixed(2); // => '0.16'
console.log('auto value');
console.log(autopvalue);

  // return to smart contract and UI client
  var peerScoreInfo = {};
  peerScoreInfo.scid = DmapidIN;
  peerScoreInfo.pvalue = pvalue;
  this.emit("peer-score-complete", peerScoreInfo);

};

module.exports = scorePP;
