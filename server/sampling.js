'use strict';

//var random = require('');

/**
 * Decentralized Sampling Protocol
 * @constructor
 * @param {Object} options
 */
function Dsampling(liveNetwork) {
console.log('Dsampling class');
    this.liveKAD = liveNetwork;

};

/**
 * Starts sampling techniques
 * @param
 * @returns {}
 */
Dsampling.prototype.startSampling = function(cDdmapID) {

    // initiate first hop
    this.liveKAD.singleHop(cDdmapID);

};

module.exports = Dsampling;
