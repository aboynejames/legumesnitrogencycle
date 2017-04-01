/**
* Self Server
*
* Start node.js  Server
*
* @package    Train Timer part of open sport project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var http = require("http");
var url = require("url");
var  sio = require('socket.io');
var fs = require('fs');
var util = require('util');
var influxData = require("./influxdb.js");
var EventEmitter = require('events').EventEmitter;
var settings = require("./settings");
var peertopeer = require('./peertopeer.js');
var ethereumAPI = require('./ethereumapi.js');
var Dsampling = require('./sampling.js');
var DMcompute = require('./dmcompute.js');
var datamodel = require('./datamodel.js');
var sensorController = require("./wearableparser/src/sensorcontroller.js");
var settingsInflux = require("./wearableparser/src/settings.js");
var safeapi = require("./safeapi/index.js");
var genome23me = require("./geneparser/parser23andme.js");
/**
* controls start of node.js server
* @method start
*
*/
function start(route, handle) {

	var couchin = {};
	var tcplive = {};
	couchin = new settings();
	liveSafeapi = new safeapi();
	databaseInflux = new settingsInflux();
	liveDatamodel = new datamodel();
	PeertoPeer = new peertopeer();
	liveDsampling = new Dsampling(PeertoPeer);
	liveDMcompute = new DMcompute(PeertoPeer, liveDatamodel);
	liveInfluxdb = new influxData(databaseInflux.account.influxdb);
	liveEthereum = new ethereumAPI(liveInfluxdb, liveDsampling, liveDMcompute);
	livegeneParser = new genome23me();

	liveSensorController = new sensorController(databaseInflux, liveSafeapi);

	var app = http.createServer(onRequest).listen(7824);

	function onRequest(request, response) {

		var pathname = url.parse(request.url).pathname;

//console.log("Request for " + pathname + " received.");
		route(handle, pathname, response, request, couchin);
	}

	// data for live two way socket data flow for real time display everywhere
	var io = sio.listen(app);

	io.sockets.on('connection', function (socket, server) {

		socket.emit('startnews', 'localNWserver');

		socket.on('DHT', function(dataIN){

			if(dataIN == "start")
			{
				PeertoPeer.startDHTkad(8817);
				socket.emit('soulserver', "DHT started");

			}
			else if(dataIN == "seed")
			{
				PeertoPeer.seedDHTkad();
			}
			else if(dataIN == "readm")
			{
				PeertoPeer.readmDHTkad();
			}
			else if(dataIN.type == "sendm")
			{
				PeertoPeer.sendmDHTkad(dataIN.text);
			}
			else if(dataIN.type == "smartcontractID")
			{
				PeertoPeer.sendmDHTkad(dataIN.pubethk);
			}


		});
		// ethereum  information
		socket.on('ethereumAPI', function(dataIN){

			if(dataIN.type == "sensor-add")
			{
				liveEthereum.createSensorcontract(dataIN);
				socket.emit('etherback', "success");

			}
			else if (dataIN.type == "dmap-add")
			{
				liveEthereum.createDmapcontract(dataIN.type, dataIN.info);

			}
			else if (dataIN.type == "dmap-add-research")
			{
				liveEthereum.createDmapcontract(dataIN.type, dataIN.info);

			}
			else if (dataIN.type == "history-stsensor-data")
			{
				liveEthereum.recallStorageContract("get-permission-history", dataIN);

			}
			else if (dataIN == "storageapi-safe-token")
			{
				liveEthereum.recallStorageContract();

			}
			else if (dataIN.type == "get-permission-status")
			{

				liveEthereum.recallStorageContract("get-permission-status", dataIN);

			}
			else if (dataIN.type == "set-permission")
			{
				liveEthereum.recallStorageContract("set-permission", dataIN);

			}
			else if (dataIN.type == "dmap-analysis")
			{

				liveEthereum.recallDmapContract('visualisation', dataIN.scid);  //dmap ID for this analysis

			}
			else if (dataIN['set-key'] == "public")
			{
				liveEthereum.setPublickey(dataIN['set-public']);
				// set in PtoP to filter messages on public eth key
				PeertoPeer.setEthpk(dataIN['set-public']);

			}
			else if(dataIN.type == "peer-invite")
			{
				// need to update dmap contract with PUB and the prepare and send message to peer-invite
				liveEthereum.recallDmapContract('set-invite-peer', dataIN.scid, 0, dataIN.pubethk, 0, 0);

			}


		});

			// sensor API listener
			socket.on('sensorAPI', function(sensorIN){

				if(sensorIN.type == "check-sensor-data")
				{
					// download data from sensorIN
					liveSensorController.StartParser.checkSensor();


				}
				else if(sensorIN.type == "upload-sensor-data")
				{
					// and save the files to safe network
					liveSafeapi.setToken(sensorIN.scid);

				}

		});

			// gene listener
			socket.on('file-gene', function(fileIN){
console.log(fileIN.file);
				if(fileIN.type == "gene-23-me")
				{
					livegeneParser.readRawfile('testgene.txt');
					//livegeneParser.queryGenome();
				}


			});


		// data Model listener
			liveDatamodel.on("dataSensorOut", function(dataChart) {
				// send data back to view UI
				socket.emit('dmap-view-data', dataChart);

			});

			liveDatamodel.on("dataSensorOutLight", function(dataChart) {
				// send data back to view UI
				socket.emit('dmap-view-data-light', dataChart);

			});

			liveDatamodel.on("dataSensorOutTemperature", function(dataChart) {
				// send data back to view UI
				socket.emit('dmap-view-data-temperature', dataChart);

			});

			// geneme listeners

			livegeneParser.on("datageneOut", function(geneletters) {
				// send data back to view UI
				socket.emit('dmap-view-data-gene', geneletters);

			});

			//  storage API listeners
			liveSafeapi.on("settoken-access", function(contractInfoIN) {
				// set token (should be encrypted TODO)
				liveEthereum.recallStorageContract('set-token', contractInfoIN);

			});

			PeertoPeer.on("client-message", function(newMessage) {
				// send data back to client with message
				socket.emit('new-message-file', newMessage);

			});

			PeertoPeer.on("sc-notification", function(newSCnotice) {
				// call ethereum api
				socket.emit('new-sc-notification', newSCnotice);

			});

			PeertoPeer.on("sampling-selected", function(chosenDmapID) {
				// update smart contract
				// check not selected before this Dmap?  Or at different time to be extract
				liveEthereum.recallDmapContract("sample-chosen", chosenDmapID); //need to create instant via this function and decide how to route function to ethereumapi class;

			});

			// ethereum API listening - route back to UI
			liveEthereum.on("newDsample-contract-id", function(currDmapID) {
				// call ethereum api
				socket.emit('dmap-contract-new', currDmapID);

			});

			// ethereum API listening - route back to UI
			liveEthereum.on("newDresearch-contract-id", function(currDmapID) {
				// call ethereum api
				socket.emit('dmapresearch-contract-new', currDmapID);

			});

			liveEthereum.on("newSensor-contract-id", function(currSensorID) {
				// call ethereum api
				socket.emit('sensor-contract-new', currSensorID);

			});

			liveEthereum.on("newStorage-contract-id", function(currStorageID) {
			// call ethereum api
				socket.emit('storage-contract-new', currStorageID);

			});

			liveEthereum.on("return-storperm-history", function(storplist) {
			// call ethereum api
				socket.emit('storage-history-plist', storplist);

			});

			liveEthereum.on("permision-notify", function(sendMessage) {

				PeertoPeer.sendmDHTkad(sendMessage);

			});

			liveEthereum.on("sample-next", function(selectPeer) {

				PeertoPeer.singleHop(selectPeer);

			});

			// notifications from sensors about new data
			liveSensorController.StartParser.on("newsensor-data-files", function(selectPeer) {
				// force serial order and then move files already in network
				function serialStep(item) {

				  if(item == 1) {
						// Decentralized storage
						// save files Decentralized
						firstStep(function() {
							//results.push(result);
							return serialStep(steplist.shift());
						});
				  }
				  else
				  {
				    return finalStep();
				  }

				};

				function finalStep(callback) {
					// start parse for data type (internal protocol data model flow)
					liveSensorController.StartParser.commandlineFiles();
console.log('Done with last STEP with files');
				};

				function firstStep(callback) {

					liveSafeapi.commandlineFiles(callback);

				};
				// call the two steplist
				var steplist = [1,2];
				serialStep(steplist.shift());

			});

	});


} // closes start function


exports.start = start;
