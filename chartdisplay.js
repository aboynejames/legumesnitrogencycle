/**
* Dsensor chart display
*
*  calling the flotr2 library
* @class chartDisplay
*
* @package    dsensor.og  open source project
* @copyright  Copyright (c) 2015 James Littlejohn
* @license    http://ww
* @version    $Id$
*/
var chartDisplay = function() {


};

/**
*   scatter plot chart
* @method scatterPlot
*
*/
chartDisplay.prototype.scatterPlot = function(container, cdataIN, regressionIN) {

	(function negative_values(container, cdatain) {

	    var
		d0 = [],
		// Line through y = 0
		d1 = cdataIN.temperature,	// Random data presented as a scatter plot.
		d2 = regressionIN; // mock regression data to plot.

	// Draw the graph
	graph = Flotr.draw(container, [
	{
		data: d1,
		label: 'scatter',
		points: {
		    show: true
		}
	} // Scatter
	/*{
		data: d2,
		label: 'y = ' + alpha.toFixed(2) + ' + ' + beta.toFixed(2) + '*x'
	}*/ // Regression
	],
	{
		xaxis: {
			//majorTickFreq: 1,
			mode: 'time',
			//timeMode:'UTC',
			timeUnit:'ms',
			timeformat: "%m",
			labelsAngle: 0
			},
		legend: {
			position: 'se',
			backgroundColor: '#D2E8FF'
		},
		title: 'Scatter Plot & Regression'
	});
	})(document.getElementById(container));

};

/**
*   scatter plot chart two data types (three)
* @method scatterPlotTwo
*
*/
chartDisplay.prototype.scatterPlotTwo = function(container, cdataIN, regressionIN) {

	(function negative_values(container, cdatain) {

	    var
		d0 = [],
		// Line through y = 0
		d1 = cdataIN.ir,	// x axis scatter plot.
		d2 = cdataIN.red,	// x axis scatter plot.
		d4 = regressionIN; // mock regression data to plot.

	// Draw the graph
	graph = Flotr.draw(container, [
	{
		data: d1,
		label: 'scatter',
		points: {
		    show: true
		}
	}, // Scatter
	{
		data: d2,
		label: 'scatter 2',
		points: {
		    show: true
		}
	} // Scatter	// Scatter
	/*{
		data: d4,
		label: 'y = ' + alpha.toFixed(2) + ' + ' + beta.toFixed(2) + '*x'
	}*/ // Regression
	],
	{
		xaxis: {
			//majorTickFreq: 1,
			mode: 'time',
			//timeMode:'UTC',
			timeUnit:'ms',
			timeformat: "%m",
			labelsAngle: 0
			},
		legend: {
			position: 'se',
			backgroundColor: '#D2E8FF'
		},
		title: 'Scatter Plot & Regression'
	});
	})(document.getElementById(container));

};


/**
*   scatter plot chart multiple data types (three)
* @method scatterPlotMulti
*
*/
chartDisplay.prototype.scatterPlotMulti = function(container, cdataIN, regressionIN) {

	(function negative_values(container, cdatain) {

	    var
		d0 = [],
		// Line through y = 0
		d1 = cdataIN.accelxtime,	// x axis scatter plot.
		d2 = cdataIN.accelytime,	// x axis scatter plot.
		d3 = cdataIN.accelztime,	// x axis scatter plot.
		d4 = regressionIN; // mock regression data to plot.
console.log(d4);
	// Draw the graph
	graph = Flotr.draw(container, [
/*	{
		data: d1,
		label: 'scatter',
		points: {
		    show: true
		}
	}, // Scatter
	{
		data: d2,
		label: 'scatter 2',
		points: {
		    show: true
		}
	},
	{
		data: d3,
		label: 'scatter 3',
		points: {
		    show: true
		}
	}, // Scatter	// Scatter
	*/
	{
		data: d4,
		label: 'y = 2x - *x'
	} // Regression
	],
	{
		xaxis: {
			majorTickFreq: 1,
			//mode: 'time',
			//timeMode:'UTC',
			//timeUnit:'ms',
			//timeformat: "%m",
			labelsAngle: 0
			},
		legend: {
			position: 'se',
			backgroundColor: '#D2E8FF'
		},
		title: 'Scatter Plot & Regression'
	});
	})(document.getElementById(container));

};

/**
*   future plot chart
* @method scatterPlotFuture
*
*/
chartDisplay.prototype.scatterPlotFuture = function(container) {


	(function basic(container) {

	var
	d1 = [
	[0, 3],
	[4, 8],
	[8, 5],
	[9, 10]
	],
	// First data series
	//d2 = [],
	d2 = [
	[10, 9],
	[14, 8],
	[18, 12],
	[19, 13]
	],

	// Draw Graph
	graph = Flotr.draw(container, [d1, d2], {
		xaxis: {
			minorTickFreq: 4
		},
		grid: {
			minorVerticalLines: true
		}
		});
	})(document.getElementById(container));

};

/**
*   chart comparison genomics
* @method genecompareChart
*
*/
chartDisplay.prototype.genecompareChart = function(container) {

	var container = container;

					(function basic_legend(container) {
							// Draw Graph
							// need to form x and y axis data array
								var d1 = [[1,80],[3,1],[5,3],[7,16]];
								var d2 = [[2,0],[4,0],[6,100],[8,0]];
								var label1 = ['A','C','T','G'];
								var horizontal = (horizontal ? true : false);
								var data = [
									{
												data: d1,
												label: 'rs10907177'
										}
									];
								// label
								var labelin = 'rs10907177';

								function labelFn(label) {
										 return 'gene# ' + label;
								 };

								 function markerFn(mark) {
 										 return  mark;
 								 };

								var markers = ['A','C','T','G']; //{
								          //  data: [1,2,3,4],//['A','C','T','G'],
													//};

							graph = Flotr.draw(container, [{"label": "rs10907177", "data": d1, "color": "#F00"}, {"label": "ME", "data": d2, "color": "#999"}], {

								title: 'Compare two genomes',
								//colors: ['#482003', '#485a61', '#cb3500','#ff7803', '#ffe090', '#449bad'],
								bars: {
				            show: true,
				            horizontal: horizontal,
				            shadowSize: 0,
				            barWidth: 0.5
				        },
								xaxis: {
									 minorTickFreq: 4,
									 ticks : [[1, 'A'],[3, 'C'],[5, 'T'],[7, 'G']]
								 },
								mouse: {
									track: true,
									relative: true
								},
								legend: {
		 							position: 'ne',
										 // Position the legend 'south-east'.
										// labelFormatter: labelin,
										 // Format the labels.
										 backgroundColor: '#D2E8FF' // A light blue background color.
								 },
								 markers: {
									 show: true,
									 position: 'ct'
										// markerFormatter: markerFn,
								 },
									yaxis: {
										min: 0
									}//,
									//HtmlText: false
							});

					})(document.getElementById(container));


};
