/**
*  jQuery listen for clicks and interaction
*
*/
$(document).ready(function(){

	liveSettings = {};
	liveSettings.cloudIP = "http://localhost:7825";
	liveSettings.localIP = "http://localhost:7825";
	liveSettings.localURL = "http://localhost/aboynejames/test/dsensor/dapp/farming/index.html";
	// connect to socket.io
	var socketpi = io.connect(liveSettings.localIP);
	var liveChart = new chartDisplay();
	var liveField = new selfGraphicsSpace();
	var liveStoragescid = '';

	var StartselfSpace = new selfGraphicsSpace();
	// body draw object
	var StartSelfSimulation = new selfSimulation();
	// feed in starting self data to SelfGraphics analysis  selfdata, canvas location
	var selfdataGraphics = {};
	var selfdataGraphics2 = {};
	var comparecont = {};
	comparecont = new compareData(StartselfSpace);

	selfdataGraphics.lanelocation = [50,  100, 1000, 60];
	selfdataGraphics.selftimes = [2540, 3040, 3310, 3150, 3590, 2270, 3190, 3310, 3090, 3680];

	selfFormin = {};
	selfFormin.overall = [10, 90, 80, 80, 76, 74, 70, 70, 49, 55];
	selfFormin.head = [10, 90, 80, 80, 76, 74, 70, 70, 49, 55];
	selfFormin.body = [10, 90, 80, 80, 76, 74, 70, 70, 49, 55];
	selfFormin.leftarm = [10, 90, 80, 80, 76, 74, 70, 70, 49, 55];
	selfFormin.rightarm = [10, 90, 80, 80, 76, 74, 70, 70, 49, 55];
	selfFormin.leftleg = [10, 90, 80, 80, 76, 49, 48, 40, 20, 12];
	selfFormin.rightleg = [10, 90, 80, 80, 76, 49, 48, 40, 20, 12];
	selfFormin.headonHead = [40, 10, 0, -2, -3, 30, 21, 0, -3, -2];
	selfdataGraphics.selfForm = selfFormin;

	selfdataGraphics2.lanelocation = [50,  300, 1000, 60];
	selfdataGraphics2.selftimes = [2940, 3040, 3310, 3150, 3590, 2270, 3190, 3510, 3090, 4780];

	selfFormin = {};
	selfFormin.overall = [10, 90, 80, 80, 76, 74, 70, 70, 49, 55];
	selfFormin.head = [10, 90, 80, 80, 76, 74, 70, 70, 49, 55];
	selfFormin.body = [10, 90, 80, 80, 76, 74, 70, 70, 49, 55];
	selfFormin.leftarm = [10, 90, 80, 80, 76, 74, 70, 70, 49, 55];
	selfFormin.rightarm = [10, 90, 80, 80, 76, 74, 70, 70, 49, 55];
	selfFormin.leftleg = [10, 90, 80, 80, 76, 49, 48, 40, 20, 12];
	selfFormin.rightleg = [10, 90, 80, 80, 76, 49, 48, 40, 20, 12];
	selfFormin.headonHead = [40, 10, 0, -2, -3, 30, 21, 0, -3, -2];
	selfdataGraphics2.selfForm = selfFormin;

	var startGraphicslive = new selfGraphics(StartselfSpace, selfdataGraphics, comparecont, StartSelfSimulation);
	var startGraphicslive2 = new selfGraphics(StartselfSpace, selfdataGraphics2, comparecont, StartSelfSimulation);

	/*
	*  check status of URL bar
	*
	*/
	var qs = $.param.querystring();
	var qsobject = $.deparam(qs, true);
console.log(qsobject);

	// now prepare a peer list and ask for data from MAIDSAFE

	$("a").click(function(e) {
		e.preventDefault(e);
		var idclick = $(this).attr("id");
console.log(idclick);
		switch(idclick){

			case "authorisation-in":
				// sign in authorisation
				$("#authorisation").show();
				$("#ptop-view").hide();
				$("#dmap-view").hide();
				$("#sensor-data").hide();
				$("#mindmap").hide();
				$("#being").hide();
				$("#ourworld").hide();
				$("#stream").hide();

				break;

			case "connectDHT":
				//send a message to server to connect to peer to peer Network
				socketpi.emit('DHT', 'start');

			break;

			case "seedDHT":
				//send a message to server to connect to peer to peer Network
				socketpi.emit('DHT', 'seed');

			break;

			case "sendmDHT":
				//send a message to server to connect to peer to peer Network
				var messageContent = {};
				var messageNewstring = $("#dht-new-message input#new-text-message.form-dht").val();
				messageContent.type = 'sendm';
				messageContent.text = messageNewstring;
				socketpi.emit('DHT', messageContent);

			break;

			case "readmDHT":
				//send a message to server to connect to peer to peer Network
				socketpi.emit('DHT', 'readm');

			break;

			case "gaiasoul-me-view":

				$("#being").show();
				$("#ourworld").hide();
				$("#stream").hide();
				$("#mindmap").hide();
				$("#ptop-view").hide();
				$("#authorisation").hide();

			break;

			case "gaiasoul-ourworld-view":
				$("#ourworld").show();
				$("#being").hide();
				$("#stream").hide();
				$("#mindmap").hide();
				$("#ptop-view").hide();
				$("#authorisation").hide();

			break;

			case "gaiasoul-stream-view":

				$("#stream").show();
				$("#being").hide();
				$("#ourworld").hide();
				$("#mindmap").hide();
				$("#ptop-view").hide();
				$("#authorisation").hide();

				var streamSummary = '';

				streamSummary += '<section class="life-stream" id="context-life-stream"></section>';

				$("#stream-dmaps ol").append(streamSummary);

				// context

				//life
				var DmapsLife = '';

				DmapsLife += '<section id="dmaps-order">';
				DmapsLife += '<ul>';
				DmapsLife += '	<li>';
				DmapsLife += '	</li>';
				DmapsLife += '</ul>';
				DmapsLife += '</section>';

				$("#context-life-stream").html(DmapsLife);

			break;

			case "gaiasoul-mindmap-view":

				$("#mindmap").show();
				$("#being").hide();
				$("#ourworld").hide();
				$("#stream").hide();
				$("#ptop-view").hide();
				$("#authorisation").hide();
				//mainstart();

			break;

			case "sensor-list":

				$("#sensor-data").show();
				$("#dmap-view").hide();
				$("#mindmap").hide();
				$("#being").hide();
				$("#ourworld").hide();
				$("#stream").hide();
				$("#ptop-view").hide();
				$("#authorisation").hide();

			break;

			case "dmap-list":

				$("#dmap-view").show();
				$("#sensor-data").hide();
				$("#mindmap").hide();
				$("#being").hide();
				$("#ourworld").hide();
				$("#stream").hide();
				$("#ptop-view").hide();
				$("#authorisation").hide();

				var DmapsLive = '';

				DmapsLive += '<section id="dmaps-order">';
				DmapsLive += '<ul>';
				DmapsLive += '	<li>';
				DmapsLive += '	</li>';
				DmapsLive += '</ul>';
				DmapsLive += '</section>';

				$("#dmap-live-list").html(DmapsLive);

			break;

			case "dmap-add":

				$("#dmap-add-new").show();

				var newformdmap = $("#dmap-template-form").html();
				$("#dmap-live-form").html(newformdmap);
				// add buttons for form
				dmapbuttons = '';
				dmapbuttons += '<button class="submit" type="submit"  id="dmap-save-new-mapping" >Save</button>';
				dmapbuttons += '<button class="submit" type="submit" id="dmap-test-new-research" >Test Research</button>';
				dmapbuttons += '<button class="submit" type="submit" id="dmap-roll-new-mapping" >Roll out to Network</button>';

				$("#dmap-add-button").html(dmapbuttons);


			break;

			case "sensor-data-add":

				$("#sensor-data-add-new").show();

				var newformsensor = $("#sensor-data-template-form").html();
				//$("#sensor-data-add-new").html(newformsensor);
				$("#sensor-data-template-form").show();

					var checkboxmeasure = '';
					checkboxmeasure += '<li>';
					checkboxmeasure += '		<fieldset id="add-sensor-measurements">';
					checkboxmeasure += '		<label>Types of Measuring Sensors</label>';
					checkboxmeasure += '			<li><input id="add-acc-sensor" type="checkbox"  value="acc" /> Accellerometer </li>';
					checkboxmeasure += '			<li><input id="add-temp-sensor" type="checkbox"  value="temp" /> Temperature </li>';
					checkboxmeasure += '			<li><input id="add-irlight-sensor" type="checkbox"  value="irlight" /> IR light </li>';
					checkboxmeasure += '			<li>Add another measuring sensor</li>';
					checkboxmeasure += '	</fieldset>';
					checkboxmeasure += '</li>';
					checkboxmeasure += '<div id="sensor-data-add-button"></div>';
					$("#checkbox-new").html(checkboxmeasure);
					//$("#sensor-data-add-button").html('<button class="submit" type="submit" id="sensor-data-save">Add Sensor & Register on Blockchain</button>');

			break;

			case "ptop-list":
				$("#ptop-view").show();
				$("#dmap-view").hide();
				$("#sensor-data").hide();
				$("#mindmap").hide();
				$("#being").hide();
				$("#ourworld").hide();
				$("#stream").hide();
				$("#authorisation").hide();

			break;

			case "refresh-sensor-list":
				socketpi.emit('ethereumAPI', 'recall-sensor-contract');

			break;

			case "safe-token-call":
				socketpi.emit('ethereumAPI', 'storageapi-safe-token');

			break;

			case "safe-permission-list":

			var permissionlistLive = '';

			permissionlistLive += '<section id="safe-permission-history">';
			permissionlistLive += '<ul>';
			permissionlistLive += '	<li>';
			permissionlistLive += '	</li>';
			permissionlistLive += '</ul>';
			permissionlistLive += '</section>';

			$("#permssion-safe-list").html(permissionlistLive);

			break;

			case "ethereum-set":
				var ekey = 'e4827d823aeea0017480b87df86aaa3e98d0937c';
				startethereum = {};
				startethereum['set-key'] = 'public';
				startethereum['set-public'] = ekey;
				socketpi.emit('ethereumAPI', startethereum);

			break;

			case "sensor-update-amiigo":

				socketpi.emit('sensorAPI', 'amiigo-sensor-upate');

			break;

			case "sensor-update-23andme":
				// diplay the chartDisplay
				liveChart.genecompareChart('canvas-comparegene-chart');
				liveChart.genecompareChart('canvas-comparegene-chart2');

				var geneInfo = {};
				geneInfo.type = "gene-23-me";
				socketpi.emit('file-gene', geneInfo);

			break;

			case "sensor-tractor-nitrogen":


			startGraphicslive.startSelfgraphics(startGraphicslive);
			startGraphicslive2.startSelfgraphics(startGraphicslive2);
		}
	});
// #sensor-data-add-new  form #sensor_form ul li button #sensor-data-save.submit
		$("#sensor-data-save").click(function(e) {
			e.preventDefault(e);
			var targetclick = e.target;
console.log(targetclick);
console.log($(targetclick).attr("id"));
			if($(targetclick).attr("id") == "sensor-data-save" )
			{
			var sensorNew = {};
			var sensorInfo = {};
			// extract sensor details form or auto via bluetooth firmware call
			var sensorname = $("#sensor_form #add-name-sensor").val();
			var sensorFWid = $("#sensor_form #add-firmware-sensor").val();
			var sensorAcc = $("input#add-acc-sensor").val();
			var sensorTemp = $("input#add-temp-sensor").val();
			var sensorIRlight = $("input#add-irlight-sensor").val();
			sensorInfo.devicename = sensorname;
			sensorInfo.FWid = sensorFWid;
			sensorInfo.Accellerometer = sensorAcc;
			sensorInfo.Temperature = sensorTemp;
			sensorInfo.IRlight = sensorIRlight;
			sensorNew.type = 'sensor-add';
			sensorNew.info = sensorInfo;
			socketpi.emit('ethereumAPI', sensorNew);
			// remove the form
			$("#sensor_form").remove();
			$("#sensor-data-save").remove();
		}

	});

	// listen for interaction with dsensor data smart contracts
	$("#sensor-data-list").click(function(e) {
		e.preventDefault(e);
		var targetclick = e.target;
console.log(targetclick);
console.log($(targetclick).attr("id"));
console.log($(targetclick).attr("class"));
			var returnData = {};
			var sensorContractID = $(targetclick).data("smartcsensor");
			var storageContract = $(targetclick).data("permcontractid");
			var storageHistContract = $(targetclick).data("perhistorysm");

		if($(targetclick).attr("id") == "sensor-check" )
		{
			returnData.type = 'check-sensor-data';
			returnData.scid = sensorContractID;
			socketpi.emit('sensorAPI', returnData);

		}
		else if($(targetclick).attr("id") == "sensor-upload" )
		{
			returnData.type = 'upload-sensor-data';
			returnData.scid = sensorContractID;
			socketpi.emit('sensorAPI', returnData);

		}
		else if ($(targetclick).attr("id") == "sensor-permission")
		{
			returnData.type = 'permission-sensor-data';
			returnData.scid = sensorContractID;
			socketpi.emit('sensorAPI', returnData);

		}
		else if ($(targetclick).attr("class") == "get-history-perm")
		{
			returnData.type = 'history-stsensor-data';
			returnData.scid = storageHistContract;
			socketpi.emit('ethereumAPI', returnData);

		}
		else if ($(targetclick).attr("class") == "set-permission-id")
		{
			// show the permission add form
			$("#set-permissions-" + storageContract).show();

		}
		else if ($(targetclick).attr("id") == "set-permission-to")
		{
			var permgrant = $(targetclick).data("permgrantto");
			// update the smart contract for this ID
			var extractEthk = '#set-permissions-' + permgrant + ' input#receiverAddress.form-control';
			var extractPlevel = '#set-permissions-' + permgrant + ' input#permission-level.form-control';
			//send a message with smart contract ID to ptop Network
			var peerPublicEthereum = $(extractEthk).val();
			var permissionLevelask = $(extractPlevel).val();
			var setContractpermission = {};
			setContractpermission.type = 'set-permission';
			setContractpermission.scid = permgrant;
			setContractpermission.pubethk = peerPublicEthereum;
			setContractpermission.plevel = permissionLevelask;
			socketpi.emit('ethereumAPI', setContractpermission);
			// show the permission add form
			$("#set-permissions-" + permgrant).hide();
		}

	});

	// check permission statusCode
	$("#network-messages").click(function(e) {
		e.preventDefault(e);
console.log('networkmessage block');
		var targetclick = e.target;
console.log(targetclick);
console.log($(targetclick).attr("id"));
console.log($(targetclick).attr("class"));

		if($(targetclick).attr("id") == "check-permssion-status")
		{
			var smartcontract = $(targetclick).data("scid");
			var getContractpermission = {};
			getContractpermission.type = 'get-permission-status';
			getContractpermission.scid = smartcontract;
			//getContractpermission.pubethk = peerPublicEthereum;
			//getContractpermission.plevel = permissionLevelask;
			socketpi.emit('ethereumAPI', getContractpermission);

		}
		else if ($(targetclick).attr("id") == "set-permission-invite")
		{
			var peerPublicEthereum = $(targetclick).data("pkasker");
			// update the smart contract for this ID permssion / token access
			var matchDatamodeltoStorage = $("#match-storage-scid").val();
			//send a message with smart contract ID to ptop Network
			var setContractpermission = {};
			setContractpermission.type = 'set-permission';
			setContractpermission.scid = matchDatamodeltoStorage;
			setContractpermission.pubethk = peerPublicEthereum;
			setContractpermission.plevel = 2;

			socketpi.emit('ethereumAPI', setContractpermission);

		}

	});

	// intereaction with Dmaps
	$("#dmap-add-button").click(function(e) {
		e.preventDefault(e);
		var targetclick = e.target;
	console.log(targetclick);
	console.log($(targetclick).attr("id"));
	console.log($(targetclick).attr("class"));
		if($(targetclick).attr("id") == "dmap-roll-new-mapping" )
		{

			// extract the form details
			// still need to setup Dmap for this research (check for collaborative context ie existing work toDO)
			var DmapNew = {};
			var DmapInfo = {};
			// extract sensor details form or auto via bluetooth firmware call
			var dmapRname = $("input#dmap-mapping-name").val();
			var dmapRdescription = $("#dmap-mapping-description").val();
			var dmapRdatam1 = $("select#dmap-mapping-build").val();
			var dmapRdatam2 = $("select#dmap-mapping-build-second").val();
			var dmapRgitrepo = $("input#mapping-code-github").val();
			var dmapRgithash = $("input#mapping-code-githubhash").val();
			var dmapRvisualisation1 = $("input#3d-human").val();
			var dmapRvisualisation2 = $("input#3d-world").val();
			var dmapRvisualisation3 = $("input#3d-knowledgemap").val();
			var dmapRvisualisation4 = $("input#customchart").val();
			var dmapRvisualisation5 = $("input#datatables").val();
			DmapInfo.dmaprname = dmapRname;
			DmapInfo.description = dmapRdescription;  // link to initial thought paper?
			DmapInfo.datamodel1 = dmapRdatam1;
			DmapInfo.datamodel2 = dmapRdatam2;
			DmapInfo.gitrepo = dmapRgitrepo;
			DmapInfo.githash = dmapRgithash;
			DmapInfo.visualisation = dmapRvisualisation1;

			var DmapInputDetails = {};
			DmapInputDetails.type = 'dmap-add';
			DmapInputDetails.info = DmapInfo;
			socketpi.emit('ethereumAPI', DmapInputDetails);
			// remove the form
			$("#dmap-live-form").empty();
			$("#dmap-add-button").empty();

		}
		else if($(targetclick).attr("id") == "dmap-test-new-research" )
		{

			// still need to setup Dmap for this research (check for collaborative context ie existing work toDO)
			var DmapresearchNew = {};
			var DmapresearchInfo = {};
			// extract sensor details form or auto via bluetooth firmware call
			var dmapRname = $("input#dmap-mapping-name").val();
			var dmapRdescription = $("#dmap-mapping-description").val();
			var dmapRdatam1 = $("select#dmap-mapping-build").val();
			var dmapRdatam2 = $("select#dmap-mapping-build-second").val();
			var dmapRgitrepo = $("input#mapping-code-github").val();
			var dmapRgithash = $("input#mapping-code-githubhash").val();
			var dmapRvisualisation1 = $("input#3d-human").val();
			var dmapRvisualisation2 = $("input#3d-world").val();
			var dmapRvisualisation3 = $("input#3d-knowledgemap").val();
			var dmapRvisualisation4 = $("input#customchart").val();
			var dmapRvisualisation5 = $("input#datatables").val();
			DmapresearchInfo.dmaprname = dmapRname;
			DmapresearchInfo.description = dmapRdescription;  // link to initial thought paper?
			DmapresearchInfo.datamodel1 = dmapRdatam1;
			DmapresearchInfo.datamodel2 = dmapRdatam2;
			DmapresearchInfo.gitrepo = dmapRgitrepo;
			DmapresearchInfo.githash = dmapRgithash;
			DmapresearchInfo.visualisation = dmapRvisualisation1;

			DmapresearchNew.type = 'dmap-add-research';
			DmapresearchNew.info = DmapresearchInfo;
			socketpi.emit('ethereumAPI', DmapresearchNew);
			// remove the form
			$("#dmap-live-form").empty();
			$("#dmap-add-button").empty();

		}
		else if($(targetclick).attr("id") == "refresh-dmap-list" )
		{
			socketpi.emit('ethereumAPI', 'recall-dmap-contract');

		}

	});

	// intereaction with live Dmaps
	$("#dmap-live-list").click(function(e) {
		e.preventDefault(e);
		var targetclick = e.target;
console.log(targetclick);
console.log($(targetclick).attr("id"));
console.log($(targetclick).attr("class"));

	if($(targetclick).attr("id") == "heart-rate-history" )
	{
		var permissionlistLiveh = '';
		permissionlistLiveh += '<section id="safe-permission-history">';
		permissionlistLiveh += '<ul>';
		permissionlistLiveh += '	<li>';
		permissionlistLiveh += '	</li>';
		permissionlistLiveh += '</ul>';
		permissionlistLiveh += '</section>';

		$("#permssion-heart-list").html(permissionlistLiveh);

	}
	else if($(targetclick).attr("id") == "genome-view-list")
	{


	}
	else if($(targetclick).attr("id") == "dmap-name")
	{
console.log('start of getting data visualisation');
		// get the DMap ID & route to visualisation, is computationally active or needs start or update of compute
		// set placer html for the Dmap or route to 3d human, world or knowledge map
		var dmapchart = '';
		dmapchart += '<section id="future-chartmap">';
		dmapchart += '<header>Chart/Map</header>';
		dmapchart += '<div id="canvas-predict-chart"></div>';
		dmapchart += '<div id="canvas-predict-chart-light"></div>';
		dmapchart += '<div id="canvas-predict-chart-temperature"></div>';
		dmapchart += '</section>';
		$("#dmaps-view").html(dmapchart);

		// hardwire genomic placer html
		var geneviewlist = '';
		geneviewlist += '<section id="gene-list">';
		geneviewlist += '<header>23andme sequence</header>';
		geneviewlist += '<div id="gene-list-23andme"></div>';
		geneviewlist += '</section>';
		$("#gene-view").html(geneviewlist);

		var visInfo = {};
		var dmaptoVis =  $(targetclick).data("scvisual");

		visInfo.type = 'dmap-analysis';
		visInfo.scid = dmaptoVis;
		socketpi.emit('ethereumAPI', visInfo);

	}
	else if($(targetclick).attr("id") == "dapp-launch")
	{
		var dapptoVis =  $(targetclick).data("dappscid");
		// open in new browser window and then its over to the dapp to call smart contracts visualisation etc.
		var buildDapperurl = "http://localhost/dsensor/dapp/index.html?=" + dapptoVis;
		window.open(buildDapperurl);

	}
	else if($(targetclick).attr("id") == "send-permission-invite")
	{
			// send direct invite message to this peer
			var invitepk = $("#invite-research-peers li input#research-peer-pubethk").val();
			var invitscid = $(targetclick).data("dmapscid");
			var invitemess = {};
			invitemess.pubethk = invitepk;
			invitemess.scid = invitscid;
			invitemess.type = 'peer-invite';
			socketpi.emit('ethereumAPI', invitemess);

	}
	else if($(targetclick).attr("class") == "invite-peer-form")
	{

		var dmapcontractid =  $(targetclick).data("dmapcontractid");
		// invite list of Peer to join in Researcher (required SM Dmap ID for this researcher)
		var inviteResearchpeers = '';
		inviteResearchpeers += '<header>Peer to Invite:</header>';
		inviteResearchpeers += '<li>';
		inviteResearchpeers += '<label for="research-peer">Eth Pub Key</label>';
		inviteResearchpeers += '<input type="text"  id="research-peer-pubethk" placeholder="" required />';
		inviteResearchpeers += '<button id="send-permission-invite" class="submit" data-dmapscid="'+ dmapcontractid + '" type="submit">Send invite</button> <a href="" id="another-peer-invite"> add</a>';
		inviteResearchpeers += '</li>';

		$("#invite-research-peers").append(inviteResearchpeers);

	}

});

	socketpi.emit('jumpit', 'cors direct to local server');
	/*
	* listening of context Display Data
	*/
	socketpi.on('startnews', function (contextdata) {

		$("#socketreturn").text(contextdata);
		socketpi.emit('jumpit2', 'TWO cors direct to local server');

	});

	socketpi.on('peerUImessage', function (peerdata) {

		$("#tcpreturn").text(peerdata);

	});

	socketpi.on('dmap-view-data', function (dmapData) {
;
		var regress = [[766000000],[766100000,140],[766200000,160],[766300000,180],[766400000,200],[766500000,220],[766600000,240],[766700000,260]];
		// pass on to chart, visualisation etc UI UX abilities
		liveChart.scatterPlotMulti('canvas-predict-chart', dmapData, regress);  // UI location, x axis y axis

	});

	socketpi.on('dmap-view-data-light', function (dmapData) {

		var regress = [];
		// pass on to chart, visualisation etc UI UX abilities
		liveChart.scatterPlotTwo('canvas-predict-chart-light', dmapData, regress);
	});

	socketpi.on('dmap-view-data-temperature', function (chartData) {

	var regress = [];
	// pass on to chart, visualisation etc UI UX abilities
	liveChart.scatterPlot('canvas-predict-chart-temperature', chartData, regress);

	});

	// gene data flow
	socketpi.on('dmap-view-data-gene', function (geneData) {

	$("#gene-list-23andme").text(geneData.genotype);

	});

	var trackTimestamp = 0;
	// message listening
	socketpi.on('new-message-file', function (newFile) {

		// keep track of last time only display if new-sensor
		var content = JSON.parse(newFile);
		var messText = JSON.parse(content.value);
		var timeM = new Date(content.timestamp);

		if(content.timestamp > trackTimestamp)
		{
			var prepmessage = '';
			prepmessage += '<li id=" ' + newFile.key + ' + ">';
			prepmessage += '<div><a href="" id="" >' + messText.text  + '</a> Time ' + timeM +'</div>';
			prepmessage += '</li>';
			$("#network-messages").prepend(prepmessage);
			trackTimestamp = content.timestamp;
		}

	});

	// message listening
	socketpi.on('dmap-contract-new', function (newDmapcontractID) {
		// add to current Dmap UI list
		var buildDmapinfo = '';
		buildDmapinfo += '<li id="dmapid-'+ newDmapcontractID.scid + '" >';
		buildDmapinfo += 'LIVE';
		buildDmapinfo += '<a id="dmap-name" href="" data-scvisual="' + newDmapcontractID.scid + '" >' + newDmapcontractID.info.dmaprname + '</a> by ABOYNEJAMES Prection Score -- Network score --';
		buildDmapinfo += '<a id="dapp-launch" data-dappscid="' + newDmapcontractID.scid + '" href=""> Launch Dapp </a>';
		buildDmapinfo += '<a id="dmap-history-'+ newDmapcontractID.scid + '" href=""> History </a>';
		buildDmapinfo += '</li>';

		$("#dmaps-order").append(buildDmapinfo);

	});

	// message listening
	socketpi.on('dmapresearch-contract-new', function (newDmapcontractID) {
		// add to current Dmap UI list
		var buildDmapinfo = '';
		buildDmapinfo += '<li id="dmapid-'+ newDmapcontractID.scid + '" >';
		buildDmapinfo += 'LIVE';
		buildDmapinfo += '<a id="dmap-name" href="" data-scvisual="' + newDmapcontractID.scid + '" >' + newDmapcontractID.info.dmaprname + '</a> by ABOYNEJAMES Prection Score -- Network score --';
		buildDmapinfo += '<a id="dmap-history-'+ newDmapcontractID.scid + '" href="">History </a>';
		buildDmapinfo += '<a class="invite-peer-form" id="permssion-'+ newDmapcontractID.scid + '" data-dmapcontractid="' + newDmapcontractID.scid + '" href=""> Invite Peers</a>';
		buildDmapinfo += '<section id="invite-research-peers"></section>';
		buildDmapinfo += '</li>';

		$("#dmaps-order").append(buildDmapinfo);

	});

	socketpi.on('sensor-contract-new', function (newSensorcontractID) {
		// add to current Dmap UI list
		var buildSensorinfo = '';
		buildSensorinfo += '<li id="sensorid-'+ newSensorcontractID.scid + '" >';
		buildSensorinfo += '<a id="sensor-check"  data-smartcsensor="' + newSensorcontractID.scid + '" href="">Check</a>';
		//buildSensorinfo += '<a id="sensor-upload"  data-smartcsensor="' + newSensorcontractID + '" href=""> UPLOAD </a>';
		buildSensorinfo += '<span id="sensor-name">' + newSensorcontractID.info.devicename + '</span>';
		buildSensorinfo += '<div id="storage-holder-'+ newSensorcontractID.scid + '"></div>';
		buildSensorinfo += '</li>';

		$("#sensor-data-list ul").append(buildSensorinfo);

	});

	socketpi.on('storage-contract-new', function (newStoragecontractID) {
		// temp keep UI list of storage contracts
		liveStoragescid = newStoragecontractID.storagescid;
		// set storage ID for this sensor source
		var buildSensorinfo = '';

		buildSensorinfo += '<a class="get-history-perm" id="sensor-history-'+ newStoragecontractID.storagescid + '" data-perhistorysm="' + newStoragecontractID.storagescid + '" href="">History </a>';
		buildSensorinfo += '<div id="phistory-holder-'+ newStoragecontractID.storagescid + '"></div>';
		buildSensorinfo += '<a class="set-permission-id" id="sensor-permssion-'+ newStoragecontractID.storagescid + '" data-permcontractid="' + newStoragecontractID.storagescid + '" href=""> Set Permission</a>';
		buildSensorinfo += '<div id="set-permissions-' + newStoragecontractID.storagescid + '">';
		buildSensorinfo += '	<input id="receiverAddress" class="form-control" type="text" placeholder="Receiver address"></input><br>';
		buildSensorinfo += '	<input id="permission-level" class="form-control" type="text" placeholder="Level"></input><br>';
		buildSensorinfo += '	<button id="set-permission-to" data-permgrantto="' + newStoragecontractID.storagescid + '">Grant Permission To</button>';
		buildSensorinfo += '</div>';
		buildSensorinfo += '<div id="ask-permission-identity">';
		buildSensorinfo += '	<ol>';
		buildSensorinfo += '		<li>Identities asking for permission access</li>';
		buildSensorinfo += '	</ol>';
		buildSensorinfo += '</div>';

		$("#storage-holder-" + newStoragecontractID.sensorscid).append(buildSensorinfo);
		$("#set-permissions-" + newStoragecontractID.storagescid).hide();

	});

	socketpi.on('storage-history-plist', function (historyplist) {
		// built history list HTML
		var permlisthist = '';
		permlisthist += '<div id="permssion-safe-list">';
		permlisthist += '<section id="safe-permission-history"><ul>';

		historyplist.forEach(function(idaccess) {

			permlisthist += '<li>';
			permlisthist += 'Date: ' + '---' + '' + 'Id-- ' + historyplist.pubketh;
			permlisthist += '</li>';

		});
		permlisthist += '</ul></section></div>';

		// display the code
		$("#phistory-holder-" + historyplist.scid).append(permlisthist);

	});

	socketpi.on('new-sc-notification', function (smartcIN) {
		// build the notification
		// retrieve storage contract for this data model type
		storageContractscid = liveStoragescid;

		var scnotice = '';
		scnotice += '<div id="sc-permission-notice">';
		scnotice += 'Smart contract ID = ' + smartcIN.scid;
		scnotice += '<span> Data request: ' + smartcIN.data[0] + '-' + smartcIN.data[1] + '<a href="" id="set-permission-invite" data-pkasker='+ smartcIN.pkasker + '>Permission Invite</a></span>';

		scnotice += '<select class="select-storage-contract" id="match-storage-scid">';
		scnotice += '	<option value="none" selected="">Please select</option>';
		scnotice += '	<option value="' + storageContractscid + '">' + storageContractscid + '</option>';
		scnotice += '</select>';

		scnotice += ' <a href="" id="check-permssion-status" data-scid="">Check</a>';

		scnotice += '</div>';

		$("#network-messages").append(scnotice);

	});

});
