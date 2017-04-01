/**
* Dsensor datamodel
*
*  use Data Model smart contract tempates to govern data structure for each damap
* @class dataModel
*
* @package    dsensor.og  open source project
* @copyright  Copyright (c) 2015 James Littlejohn
* @license    http://ww
* @version    $Id$
*/
var util = require('util');
var events = require("events");

var dataModel = function() {

	events.EventEmitter.call(this);
	this.livesoulData = {};
	this.livesoulData.notification = {};

};

/**
* inherits core emitter class within this class
* @method
*/
util.inherits(dataModel, events.EventEmitter);

/**
*   check for local ID data & make active or call for the data
* @method checkDatalocal
*
*/
dataModel.prototype.checkDatalocal = function(mpIN, influxdbIN) {
console.log('data model get data');
	localthis = this;
	function startInfluxcall (callback) {

		influxdbIN.queryTimeseriesAccelerometer(callback);

	};

 	startInfluxcall(function(resultback) {

		mockacceleromter = {};
		localthis.prepareChartdata(resultback);
	});
	// light data wearable
	function startInfluxcallLight (callback) {

		influxdbIN.queryTimeseriesLight(callback);

	};

 	startInfluxcallLight(function(resultback) {

		mockacceleromter = {};
		localthis.prepareChartdataLight(resultback);
	});

	// temperature data
	function startInfluxcallTemperature (callback) {

		influxdbIN.queryTimeseriesTemperature(callback);

	};

 	startInfluxcallTemperature(function(resultback) {

		mockacceleromter = {};
		localthis.prepareChartdataTemperature(resultback);
	});


};

/**
*   prepare data for standard two plot chart
* @method prepareChartdata
*
*/
dataModel.prototype.prepareChartdata = function(resultsIN) {

	localthis = this;
	// accelerometer data ie activity
	accelaxisdata = {};
	var twoplotreadyX = [];
	var twoplotreadyY = [];
	var twoplotreadyZ = [];


	//var livesoulData = [35,35,36,35];
	var datainstant = resultsIN;
//console.log(datainstant);
	datainstant.forEach(function(eachA) {
		// convert time to microseconds
		var dateMicro = new Date(eachA.timestamp).getTime();
		// need to build three part data series
		var buildpairX = [dateMicro, eachA.xaxis];
		twoplotreadyX.push(buildpairX);
		var buildpairY = [dateMicro, eachA.yaxis];
		twoplotreadyY.push(buildpairY);
		var buildpairZ = [dateMicro, eachA.zaxis];
		twoplotreadyZ.push(buildpairZ);

	});

	accelaxisdata.accelxtime = twoplotreadyX;
	accelaxisdata.accelytime = twoplotreadyY;
	accelaxisdata.accelztime = twoplotreadyZ;

	localthis.emit("dataSensorOut", accelaxisdata);

};

/**
*   prepare data for chart Light sensor data
* @method prepareChartdataLight
*
*/
dataModel.prototype.prepareChartdataLight = function(resultsIN) {

	localthis = this;
	// accelerometer data ie activity
	lightsdata = {};
	var lightir = [];
	var lightred = [];

	//var livesoulData = [35,35,36,35];
	var datainstant = resultsIN;
	datainstant.forEach(function(eachA) {
		// convert time to microseconds
		var dateMicro = eachA.timestamp;//new Date(eachA.timestamp).getTime();
		// need to build three part data series
		var buildpairX = [dateMicro, eachA.ir];
		lightir.push(buildpairX);
		var buildpairY = [dateMicro, eachA.red];
		lightred.push(buildpairY);

	});

	lightsdata.ir = lightir;
	lightsdata.red = lightred;
	localthis.emit("dataSensorOutLight", lightsdata);

};

/**
*   prepare data for chart temperature sensor data
* @method prepareChartdataTemperature
*
*/
dataModel.prototype.prepareChartdataTemperature = function(resultsIN) {
console.log('prepare Temperature sensor data for ');
//console.log(resultsIN);
	localthis = this;
	// accelerometer data ie activity
	tempdata = {};
	var tempread = [];
	//var livesoulData = [35,35,36,35];
	var datainstant = resultsIN;

	datainstant.forEach(function(eachA) {
		// convert time to microseconds
		var dateMicro = eachA.timestamp;//new Date(eachA.timestamp).getTime();
		// need to build three part data series
		var buildpairX = [dateMicro, eachA.temperature];
		tempread.push(buildpairX);

	});

	tempdata.temperature = tempread;
	localthis.emit("dataSensorOutTemperature", tempdata);

};

/**
*   prepare temperature data over TIME for standard two plot chart
* @method prepareChartdataTime
*
*/
dataModel.prototype.prepareChartdataTime = function(mappingIN) {

	var twoplotready = [];

	//datainstant = this.livesoulData.data.temperature.data.values;
	datainstant = [23,234,23,35];

	datainstant.forEach(function(eachTemp) {
	//for(var oi=0; oi< numberdatapoints; oi++) {
		// convert time to microseconds
		var dateMicro = new Date(eachTemp[0]).getTime();
		var buildpair = [dateMicro, eachTemp[1]];
		twoplotready.push(buildpair);

	});

	return twoplotready;

};

module.exports = dataModel;
