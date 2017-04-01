/**
* FieldGraphics
*
* Farming visualisation canvas
* @class selfgraphicsSpace
*
* @package    Self Graphics - open farming project
* @copyright  Copyright (c) 2017 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var selfGraphicsSpace = function() {

	this.context = {};
	this.selfSpace = document.getElementById("canvasOne");
	this.startCanvasSpace();

};

/**
* sets base canvas visualisation
* @method startCanvasSpace
*
*/
selfGraphicsSpace.prototype.startCanvasSpace = function() {

	// the swimming pool
//	theCanvas = this.status.canvasPlace;
	this.context = this.selfSpace.getContext("2d");
	this.context.fillStyle = '#EEEEEE';
	this.context.fillRect(0, 0, this.selfSpace.width, this.selfSpace.height);
	this.context.strokeStyle = '#000000';
	this.context.strokeRect(1,  1, this.selfSpace.width-2, this.selfSpace.height-2);

	// place for difference analysis
	this.context.fillStyle = '#ccff99';
	this.context.fillRect(1100, 50, 90, 200);
	this.context.strokeStyle = '#000000';
	this.context.strokeRect(1102,  52, 86, 194);
	this.context.strokeStyle = '#FF0000';
	this.context.strokeRect(1102, 142, 84, 2);

	// text for Field
	this.context.font = "28px Arial";
	this.context.strokeText("Start Season" , 15, 25);
	this.context.strokeStyle = "#336600";
	this.context.strokeText("After legumes" , 15, 415);
};

/**
* SelfGraphics
*
* Field visualisation canvas
* @class selfgraphics
*
* @package    Self Field - open farming project
* @copyright  Copyright (c) 2017 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var selfGraphics = function(positionSpace, selfdatain, comparedata, bodyGraphics) {

	this.status = selfdatain;
	this.context = positionSpace.context;
	this.realspeed = 0;
	this.textset = [0,0,0,0,0,0,0,0,0,0];
	this.splitscounterset = 0;
	this.setsplits = [];
	this.livecompare = comparedata;
	this.setGraphicsData();
	this.setSelfdataIn();
	this.livebodyDraw = bodyGraphics;

};

/**
*  starting assumptions and input data
* @method  setGraphicsData
*
*/
selfGraphics.prototype.setGraphicsData = function() {

	this.speed = 0;
	this.y = this.status.lanelocation[1];
	this.x = this.status.lanelocation[0];
	this.splitcount = 0;
	this.distanceinterval = 5;
	this.lengthofpool = 25;
	this.motiondirection = 0;
	this.pixelspersplit = 200;
	// the swimming pool lane
	this.context.strokeStyle = '#FF0000';
	this.context.strokeRect(this.status.lanelocation[0], this.status.lanelocation[1], this.status.lanelocation[2],this.status.lanelocation[3] );
	// draw on the analysis segmentation
	this.setSplitmarkers();

};

/**
*  incoming time distance self data
* @method  setSelfdataIn
*
*/
selfGraphics.prototype.setSelfdataIn = function() {

	// incoming data splits (milliseconds)
	this.splitsin = this.status.selftimes;// = [2540, 3040, 3310, 3150, 3590, 2270, 3190, 3310, 3090, 3680];
	this.realspeed =  this.realspeedCalculation();
	// split distance motion direction pixel profile
	this.motionsplitprofile = this.preparePixels();
	this.livecompare.addcompareData(this.status.selftimes);
};

/**
*  extract form for any 5m segment
* @method  extractDatasegment
*
*/
selfGraphics.prototype.extractDatasegment = function(segmentID) {

	var formSegment = {};
	formSegment['overall'] = this.status.selfForm.overall[segmentID];
	formSegment['head'] = this.status.selfForm.head[segmentID];
	formSegment['body'] = this.status.selfForm.body[segmentID];
	formSegment['leftleg'] = this.status.selfForm.leftleg[segmentID];
	formSegment['rightleg'] = this.status.selfForm.rightleg[segmentID];
	formSegment['leftarm'] = this.status.selfForm.leftarm[segmentID];
	formSegment['rightarm'] = this.status.selfForm.rightarm[segmentID];

	return formSegment

};

/**
*  setup the slip markers
* @method  setSplitmarkers
*
*/
selfGraphics.prototype.setSplitmarkers = function() {
	// cacluate the number of split and distance per slip e.g. 50 by 5m or 100m by 25m
	// five metre marks  every 200px
	this.context.strokeStyle = '#0404B4';
	var splitnumbers = this.lengthofpool/this.distanceinterval;
	for(i=0;i< splitnumbers; i++) {

		this.context.strokeRect((this.x + (i * this.pixelspersplit)),  this.status.lanelocation[1], 2, 80);

	}

};

/**
*  calculate speeds in pixels
* @method  realspeedCalculation
*
*/
selfGraphics.prototype.realspeedCalculation = function() {

	var dintin = this.distanceinterval;
	// take time and split distance and produce speed
	var actualspeed = [];
	this.splitsin.forEach(function(spt) {

		var speedcalc = (dintin/(spt/1000));
		actualspeed.push(speedcalc.toFixed(2));

	});

	return actualspeed;

};

/**
* keep track of split segments
* @method setSplitsegments
*
*/
selfGraphics.prototype.setSplitsegments = function(setsp) {

	// work out last element added to array
	var lastspltnumber = this.setsplits.slice(-1)[0];

		this.setsplits.push(setsp);
		this.splitscounterset++;

};

/**
* prepars pixel data
* @method preparePixels
*
*/
selfGraphics.prototype.preparePixels = function() {

		// given length of pool create pixel presention distance and motion of direction value ie 1 or -1
		var splitspixel = {};
		var holdingsplitsdata = [];
		var holdingMotion = [];
		var holdingPixelplacer = [];
		var speedDirection = [];
		var nosplitsin = this.splitsin.length;
		var endoflengthpixels = nosplitevents * this.pixelspersplit;
		var splitchangedirectionEvery = this.lengthofpool/this.distanceinterval;
		var nosplitevents = this.distanceinterval/this.distanceinterval;
		var nopixelsperlength = this.nosplitsin * this.pixelspersplit;
		var cumulativepixeldistance = 0;
		var motiondirectionP = 0;
		var motiondirection = 0;
		var lastpixelPlacernumber = splitchangedirectionEvery + 1;
		var splength = this.realspeed.length;
		var pixcelplacerDistance = 0;
		// create distance pixel change of speed point array ie [50,250,450,650,850,1050,850,650,450,250]   50 250 450 650 850 1050 850 650 etc....
		for (i=0;i< splength; i++) {

			// logic for motion dirction 1 or -1
			var divideby = i%splitchangedirectionEvery;

			if(i == lastpixelPlacernumber)
			{
				motiondirectionP = -1;
				pixcelplacerDistance = pixcelplacerDistance + (motiondirectionP *  this.pixelspersplit);
				holdingPixelplacer.push(pixcelplacerDistance);

			}
			else
			{

				// need account for 6 placement points with change of direction on 5
				if(divideby === 0)
				{
					// take current direction and reverse it
					if(motiondirectionP === 0)
					{
						//start pixel placement
						pixcelplacerDistance = this.x;
						holdingPixelplacer.push(pixcelplacerDistance);
						motiondirectionP = 1;

					}
					else
					{
						// change the distanced from positive to negative
						pixcelplacerDistance = pixcelplacerDistance + (motiondirectionP *  this.pixelspersplit);
						holdingPixelplacer.push(pixcelplacerDistance);

					}
				}
				else
				{
						//motiondirection = 1;
						pixcelplacerDistance = pixcelplacerDistance + (motiondirectionP *  this.pixelspersplit);
						holdingPixelplacer.push(pixcelplacerDistance);

				}

			}


		}


		// create motion of direction array ie [1,1,1,1,1,-1,-1,-1,-1,-1]
		for (i=0;i< splength; i++) {
			// logic for motion dirction 1 or -1
			var divideby = i%splitchangedirectionEvery;

			if(divideby === 0)
			{
				// take current direction and reverse it
				if(motiondirection === 0)
				{
					motiondirection = 1;

				}
				else
				{
					motiondirection = -1;

				}
			}

			holdingMotion.push(motiondirection);
		}

			// multiple by the actual speeds
		for (i=0;i< splength; i++) {

			speedDirection.push(holdingMotion[i] * this.realspeed[i]);


		}

		// combine distance speed change point, speed, motion direction
		// {[50,1,1.9], [250, 1,1.8], [450,1,1.8], [650,1,1.5], [850,1,1.8], [1050,-1,1.5], [850,-1,2.0], [650,-1,1.9], [450,-1,1.8], [250,-1,1.6]}
		speedPixelplaces = {};
		speedPixelplaces.pixelPlacers = holdingPixelplacer;
		speedPixelplaces.speedDirection = speedDirection;

		return speedPixelplaces;

};

/**
*  start the graphics
* @method  startSelfgraphics
*
*/
selfGraphics.prototype.startSelfgraphics = function(liveAnalysis) {

	var drawLive = function() {liveAnalysis.drawAnalysis();};
	setInterval(drawLive, 20);

};

/**
* supplies draw analysis data and visualisation code
* @method drawAnalysis
*
*/
selfGraphics.prototype.drawAnalysis = function() {

		// clear the previous placeline mark
		this.context.fillStyle = "#EEEEEE";
		this.context.beginPath();
		this.context.arc(this.x,this.y,5.5,0,Math.PI*2,true);
		this.context.closePath();
		this.context.fill();

		if(this.splitcount === 0)
		{
			// start
			speed = this.motionsplitprofile.speedDirection[0];
			this.setSplitsegments(0);
			this.splitcount++;
			this.motiondirection = 1;
			this.context.font = "14px Arial";
			this.context.strokeText("Nitrogen (mg): " + this.motionsplitprofile.speedDirection[0] ,this.x + 25, this.y - 50);
			this.livecompare.drawDifference(0);
			// draw body analysis
			liveSegment = this.extractDatasegment(0);
			//this.livebodyDraw.formConversionColor(liveSegment);
			//this.livebodyDraw.drawHeadonswimmer(this.status.selfForm.headonHead[0]);
		}
		else
		{

			if(this.x > 50  && this.x < 250)
			{

				if(this.motiondirection == 1)
				{
					this.setSplitsegments(1);
					speed = this.motionsplitprofile.speedDirection[1];
					this.splitcount++;
					if(this.textset[0] === 0)
					{
						this.context.strokeText("Nitrogen (mg): " +this.motionsplitprofile.speedDirection[9], this.x - 150, this.y + 50);
						this.textset[0] = 1;
						//this.livecompare.drawDifference(9);
						//form form data object
						liveSegment = this.extractDatasegment(9);
						//this.livebodyDraw.formConversionColor(liveSegment);
						//this.livebodyDraw.drawHeadonswimmer(this.status.selfForm.headonHead[9]);
					}
					else
					{}


				}
				else
				{
					speed = this.motionsplitprofile.speedDirection[9];
					this.splitcount++;
					if(this.textset[9] === 0)
					{
						this.context.strokeText("Nitrogen (mg): " +this.motionsplitprofile.speedDirection[9], this.x - 150, this.y + 50);
						this.textset[9] = 1;
						this.livecompare.drawDifference(9);
						liveSegment = this.extractDatasegment(9);
						//this.livebodyDraw.formConversionColor(liveSegment);
						//this.livebodyDraw.drawHeadonswimmer(this.status.selfForm.headonHead[9]);
					}
					else
					{}
				}

			}
			else if (this.x > 250  && this.x < 450)
			{

				if(this.motiondirection == 1)
				{
					this.setSplitsegments(2);
					speed = this.motionsplitprofile.speedDirection[2];
					this.splitcount++;
					if(this.textset[1] === 0)
					{
						this.context.strokeText("Nitrogen (mg): " + this.motionsplitprofile.speedDirection[2], this.x + 50, this.y - 50);
						this.textset[1] = 1;
						this.livecompare.drawDifference(2);
						liveSegment = this.extractDatasegment(2);
						//this.livebodyDraw.formConversionColor(liveSegment);
						//this.livebodyDraw.drawHeadonswimmer(this.status.selfForm.headonHead[2]);
					}
					else
					{}
//					context.strokeText("Speed:" + this.motionsplitprofile['speedDirection'][2],this.x + 25, this.y - 50);
				}
				else
				{

					speed = this.motionsplitprofile.speedDirection[8];
					this.splitcount++;
					if(this.textset[8] === 0)
					{
						this.context.strokeText("Nitrogen (mg): " + this.motionsplitprofile.speedDirection[8], this.x - 150, this.y + 50);
						this.textset[8] = 1;
						this.livecompare.drawDifference(8);
						liveSegment = this.extractDatasegment(8);
						//this.livebodyDraw.formConversionColor(liveSegment);
						//this.livebodyDraw.drawHeadonswimmer(this.status.selfForm.headonHead[8]);
					}
					else
					{}

					//context.strokeText("Speed:" + this.motionsplitprofile['speedDirection'][8],this.x - 150, this.y + 50);
				}

			}
			else if (this.x > 450  && this.x < 650)
			{

				if(this.motiondirection == 1)
				{
					speed = this.motionsplitprofile.speedDirection[3];
					this.splitcount++;
					if(this.textset[2] === 0)
					{
						this.context.strokeText("Nitrogen (mg): " + this.motionsplitprofile.speedDirection[3], this.x + 50, this.y - 50);
						this.textset[2] = 1;
						this.livecompare.drawDifference(3);
						liveSegment = this.extractDatasegment(3);
						//this.livebodyDraw.formConversionColor(liveSegment);
						//this.livebodyDraw.drawHeadonswimmer(this.status.selfForm.headonHead[3]);
					}
					else
					{}

					//context.strokeText("Speed:" + this.motionsplitprofile['speedDirection'][3],this.x + 25, this.y - 50);
				}
				else
				{
					speed = this.motionsplitprofile.speedDirection[7];
					this.splitcount++;
					if(this.textset[7] === 0)
					{
						this.context.strokeText("Nitrogen (mg): " + this.motionsplitprofile.speedDirection[7], this.x - 150, this.y + 50);
						this.textset[7] = 1;
						this.livecompare.drawDifference(7);
						liveSegment = this.extractDatasegment(7);
						//this.livebodyDraw.formConversionColor(liveSegment);
						//this.livebodyDraw.drawHeadonswimmer(this.status.selfForm.headonHead[7]);
					}
					else
					{}

					//context.strokeText("Speed:" + this.motionsplitprofile['speedDirection'][7],this.x - 150, this.y + 50);
				}

			}
			else if (this.x > 650  && this.x < 850)
			{
				// depending on direction of motion speed will be positive or minus
				if(this.motiondirection == 1)
				{
					speed = this.motionsplitprofile.speedDirection[4];
					this.splitcount++;
					if(this.textset[3] === 0)
					{
						this.context.strokeText("Nitrogen (mg): " + this.motionsplitprofile.speedDirection[4], this.x + 50, this.y - 50);
						this.textset[3] = 1;
						this.livecompare.drawDifference(4);
						liveSegment = this.extractDatasegment(4);
						//this.livebodyDraw.formConversionColor(liveSegment);
						//this.livebodyDraw.drawHeadonswimmer(this.status.selfForm.headonHead[4]);
					}
					else
					{}

					//context.strokeText("Speed:" + this.motionsplitprofile['speedDirection'][4],this.x + 25, this.y - 50);
				}
				else
				{
					speed = this.motionsplitprofile.speedDirection[6];
					this.splitcount++;
					if(this.textset[6] === 0)
					{
						this.context.strokeText("Nitrogen (mg): " + this.motionsplitprofile.speedDirection[6], this.x - 150, this.y + 50);
						this.textset[6] = 1;
						this.livecompare.drawDifference(6);
						liveSegment = this.extractDatasegment(6);
						//this.livebodyDraw.formConversionColor(liveSegment);
						//this.livebodyDraw.drawHeadonswimmer(this.status.selfForm.headonHead[6]);
					}
					else
					{}

					//context.strokeText("Speed:" + this.motionsplitprofile['speedDirection'][6],this.x -150, this.y + 50);
				}


			}
			else if (this.x > 850  && this.x < 1050)
			{
				// depending on direction of motion speed will be positive or minus
				if(this.motiondirection == 1)
				{
					speed = this.motionsplitprofile.speedDirection[4];
					this.splitcount++;
					if(this.textset[4] === 0)
					{
						this.context.strokeText("Nitrogen (mg): " + this.motionsplitprofile.speedDirection[4], this.x + 50, this.y - 50);
						this.textset[4] = 1;
						this.livecompare.drawDifference(4);
						//this.livebodyDraw.formConversionColor(this.status.selfForm.overall[4]);
						//this.livebodyDraw.drawHeadonswimmer(this.status.selfForm.headonHead[4]);
					}
					else
					{}

					//context.strokeText("Speed:" + this.motionsplitprofile['speedDirection'][4],this.x + 25, this.y - 50);
				}
				else
				{
					speed = this.motionsplitprofile.speedDirection[5];
					this.splitcount++;
					if(this.textset[5] === 0)
					{
						this.context.strokeText("Nitrogen (mg): " + this.motionsplitprofile.speedDirection[5], this.x - 150, this.y + 50);
						this.textset[5] = 1;
						this.livecompare.drawDifference(5);
						liveSegment = this.extractDatasegment(5);
						//this.livebodyDraw.formConversionColor(liveSegment);
						//this.livebodyDraw.drawHeadonswimmer(this.status.selfForm.headonHead[5]);
					}
					else
					{}
					//context.strokeText("Speed:" + this.motionsplitprofile['speedDirection'][5],this.x - 150, this.y + 50);
				}


			}

			else if(this.x < 150 )
			{
				this.motiondirection = 1;
				speed = 0 * this.motiondirection;
			}
			else if(this.x > 1050 )
			{
				this.motiondirection = -1;
				speed = this.motionsplitprofile.speedDirection[5];
				this.x = 1050;
				this.y = this.y + 40;
			}
		}

		this.x += speed;

	// display the tracking ball
	this.context.fillStyle = "#000000";
	this.context.beginPath();
	this.context.arc(this.x,this.y,6,0,Math.PI*2,true);
	this.context.closePath();
	this.context.fill();

};

/**
* Difference data
*
* hold data to be compared
* @class differenceData
*
* @package    Self Graphics - open sport project
* @copyright  Copyright (c) 2014 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var compareData = function(canvasin) {

	this.canvaslive = canvasin;
	this.twodatalive = [];

};

/**
*  keep track of order of data in comparision
* @method  addcompareData
*
*/
compareData.prototype.addcompareData = function(indata) {

	this.twodatalive.push(indata);

};

/**
* prepare difference data
* @method prepareDifference
*
*/
compareData.prototype.prepareDifference = function(splitposition) {

	var differenceTwo = this.twodatalive[0][splitposition] - this.twodatalive[1][splitposition];
	// calculate percentage time difference from the first time perspective
	var differencePercentage = (differenceTwo/this.twodatalive[0][splitposition]);

	return differencePercentage;

};

/**
*  draw difference analysis
* @method  drawDifference
*
*/
compareData.prototype.drawDifference = function(liveAnalysisposition) {

	// percentage above or below second time data inputted
	var percentage = this.prepareDifference(liveAnalysisposition);
	// need to convert to pixel area
	var newdigitnumber = (percentage * 40);
	var newtidydigitnumber = Math.round(newdigitnumber);
	var newy = 122 + newtidydigitnumber;
	var newheight = 4;

	this.canvaslive.context.fillStyle = '#FF0000';
	this.canvaslive.context.fillRect(1102, newy, 80, newheight);

	// need to keep not of previous marker and remove it



};
