/**
* SelfSimulation
*
* Simulation of human
* @class selfSimultion
*
* @package    Self Graphics - open sport project
* @copyright  Copyright (c) 2014 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var selfSimulation = function() {

	this.context = {};
	this.selfsimgraphic = document.getElementById("canvasSimulation");
	//this.startSimulation();


};

/**
* sets simulation assumptions
* @method startSimulation
*
*/
selfSimulation.prototype.startSimulation = function() {

	// the canvas
	this.context = this.selfsimgraphic.getContext("2d");
	this.context.fillStyle = 'pink';
	this.context.fillRect(0, 0, this.selfsimgraphic.width, this.selfsimgraphic.height);
	this.context.strokeStyle = '#000000';
	this.context.strokeRect(1,  1, this.selfsimgraphic.width-2, this.selfsimgraphic.height-2);

	this.formScale();
	this.drawHeadonpool();
	//this.drawHeadonswimmer();

	this.drawbodyStart('#8ED6FF');

};

/**
* start drawing of body
* @method drawbodyStart
*
*/
selfSimulation.prototype.drawbodyStart = function(colorscaleIn) {

	// draw body
	this.drawHead(colorscaleIn['overall']);
	this.drawHead(colorscaleIn['head']);
	this.drawBody(colorscaleIn['body']);
	this.drawLeftleg(colorscaleIn['leftleg']);
	this.drawRightleg(colorscaleIn['rightleg']);
	this.drawLeftarm(colorscaleIn['leftarm']);
	this.drawRightarm(colorscaleIn['rightarm']);

};

/**
* draw head
* @method drawHead
*
*/
selfSimulation.prototype.drawHead = function(coloractive) {

	var centerX = 190;
	var centerY = 160;
	var radius = 40;

	this.context.fillStyle = coloractive;
	this.context.beginPath();
	this.context.arc(centerX, centerY, radius,0,Math.PI*2,true);
	this.context.closePath();
	this.context.fill();

	// restore to original state
	//this.context.restore();
};

/**
* sets human body
* @method drawBody
*
*/
selfSimulation.prototype.drawBody = function(coloractive) {

	var centerX = 160;
	var centerY = 160;
	var radius = 50;

	this.context.scale(2, 1);

	// draw circle which will be stretched into an oval
	this.context.beginPath();
	this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	this.context.closePath();
	// restore to original state
	//this.context.restore();

	// apply styling
	this.context.fillStyle = coloractive;
	this.context.fill();
	this.context.lineWidth = 2;
	this.context.strokeStyle = 'black';
	this.context.stroke();
	this.context.scale(0.5, 1);

};

/**
* Draw left arm
* @method drawLeftarm
*
*/
selfSimulation.prototype.drawLeftarm = function(coloractive) {

	var centerX =40;
	var centerY = 1;
	var radius = 16;

	// rotate 45 degrees clockwise
	this.context.rotate(Math.PI / 6.4);
	this.context.scale(5, 1);
	this.context.restore();

	// draw circle which will be stretched into an oval
	this.context.beginPath();


	this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);

	this.context.closePath();

	// restore to original state
	//this.context.restore();

	// apply styling
	this.context.fillStyle = coloractive;
	this.context.fill();
	this.context.lineWidth = 2;
	this.context.strokeStyle = 'black';
	this.context.stroke();
	this.context.scale(0.2, 1);
	this.context.rotate(-(Math.PI / 6.4));
};

/**
* draw right arm
* @method drawRightarm
*
*/
selfSimulation.prototype.drawRightarm = function(coloractive) {

	var centerX = 10;
	var centerY = 266;
	var radius = 16;

	// rotate 45 degrees clockwise
	this.context.rotate(Math.PI /-6.4);
	this.context.scale(5, 1);
	// draw circle which will be stretched into an oval
	this.context.beginPath();
	this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);

	this.context.closePath();

	// restore to original state
	//this.context.restore();

	// apply styling
	this.context.fillStyle = coloractive;
	this.context.fill();
	this.context.lineWidth = 2;
	this.context.strokeStyle = 'black';
	this.context.stroke();
	this.context.scale(0.2, 1);
	this.context.rotate(-(Math.PI / -6.4));


};

/**
* draw left leg
* @method drawLeftleg
*
*/
selfSimulation.prototype.drawLeftleg = function(coloractive) {

	var centerX = 80;
	var centerY = 130;
	var radius = 16;


	// draw circle which will be stretched into an oval
	this.context.beginPath();
	this.context.scale(6, 1);
	this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);

	this.context.closePath();

	// restore to original state
	//this.context.restore();

	// apply styling
	this.context.fillStyle = coloractive;
	this.context.fill();
	this.context.lineWidth = 2;
	this.context.strokeStyle = 'black';
	this.context.stroke();
	this.context.scale(0.1667, 1);

};

/**
* draw right leg
* @method drawRightleg
*
*/
selfSimulation.prototype.drawRightleg = function(coloractive) {

	var centerX = 80;
	var centerY = 180;
	var radius = 16;

	this.context.scale(6, 1);

	// draw circle which will be stretched into an oval
	this.context.beginPath();
	this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	this.context.closePath();
	// restore to original state
	//this.context.restore();

	// apply styling
	this.context.fillStyle = coloractive;
	this.context.fill();
	this.context.lineWidth = 2;
	this.context.strokeStyle = 'black';
	this.context.stroke();
	this.context.scale(0.1667, 1);

};


/**
* draw headon Swimming Pool view
* @method drawHeadonpool
*
*/
selfSimulation.prototype.drawHeadonpool = function() {

	this.context.fillStyle = '#BBD9EE';
	this.context.fillRect(780, 140, 380, 100);
	this.context.strokeStyle = 'black';
	this.context.strokeRect(780,  80, 382, 160);

};

/**
* draw headon swimmer
* @method drawHeadonswimmer
*
*/
selfSimulation.prototype.drawHeadonswimmer = function(updownchange) {

	// need to remove previous head position

	var centerX = 972;
	var centerY = 140 + updownchange;
	var radius = 40;

	this.context.fillStyle = 'blue';
	this.context.lineWidth = 1;
	this.context.strokeStyle = 'white';
	this.context.beginPath();
	this.context.arc(centerX, centerY, radius,0,Math.PI*2,true);
	this.context.closePath();
	this.context.fill();
	this.context.stroke();

};



/**
* draw Form scale box
* @method formScale
*
*/
selfSimulation.prototype.formScale = function() {

	// scale text
	this.context.font = '14pt Calibri';
	this.context.strokeText("Loss of form", 630, 50);

	this.context.font = '10pt Calibri';
	this.context.strokeText("100%", 730, 100);
	this.context.strokeText("25%", 730, 225);

	this.context.fillStyle = 'green';
	this.context.fillRect(640, 80, 80, 160);
	this.context.strokeStyle = 'black';
	this.context.strokeRect(640,  80, 80, 160);

	// four part coloring of form scale
	this.context.fillStyle = '#F00000';
	this.context.fillRect(640, 80, 80, 40);
	this.context.fillStyle = '#B00000';
	this.context.fillRect(640, 120, 80, 40);
	this.context.fillStyle = '#600000';
	this.context.fillRect(640, 160, 80, 40);
	this.context.fillStyle = '#200000';
	this.context.fillRect(640, 200, 80, 40);

};

/**
* converts sensor form to color scale
* @method formConversionColor
*
*/
selfSimulation.prototype.formConversionColor = function(formpercentage) {

	var activescalecolor = '';
	scaledbody = {};
	var formscalecolors = {};
		formscalecolors[0] = '#F00000';
		formscalecolors[1] = '#B00000';
		formscalecolors[2] = '#600000';
		formscalecolors[3] = '#200000';

	// per form categorisation per body part per segment
	extrabodyparts = Object.keys(formpercentage);
	extrabodyparts.forEach(function(bpart){

		if(formpercentage[bpart] > 0 && formpercentage[bpart] <= 25)
		{
			activescalecolor = formscalecolors[0];
		}
		else if(formpercentage[bpart] > 25 && formpercentage[bpart] <= 50)
		{
			activescalecolor = formscalecolors[1];
		}
		else if(formpercentage[bpart] > 50 && formpercentage[bpart] <= 75)
		{
			activescalecolor = formscalecolors[2];
		}
		else if(formpercentage[bpart] > 75 && formpercentage[bpart] <= 100)
		{
			activescalecolor = formscalecolors[3];
		}

		scaledbody[bpart] = activescalecolor;
	});

	this.drawbodyStart(scaledbody);

};
