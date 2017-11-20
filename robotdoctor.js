
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// SVG SETUP			

var svg = d3.select('#RobotDoctorDiv')
	.append("svg")
	.style("width",500)
	.style("height",400);	

	
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// TABLE SETUP	
	
var columns = ["T", "HR", "S_true","y_pred"];

var tableRobot = d3.select('#RobotDoctorDiv').select('svg')
  .append("foreignObject")
  .attr("width", 480)
  .attr("height", 500)
  .append("xhtml:body");

tableRobot.append("table")
     .attr("style", "margin-left: 250px"),
	thead = tableRobot.append("thead"),
	tbody = tableRobot.append("tbody");

// append the header row
thead.append("tr")
	.selectAll("th")
	.data(columns)
	.enter()
	.append("th")
		.text(function(column) { return column; });

// create a row for each object in the data
var rows = tbody.selectAll("tr")
	.data(myData)
	.enter()
	.append("tr")
	.attr('id',function (d,i) {return 'robotdata' + i;});

// create a cell in each row for each column
var cells = rows.selectAll("td")
	.data(function(row) {
		return columns.map(function(column) {
			return {column: column, value: row[column]};
		});
	})
	.enter()
	.append("td")
	.attr("style", "font-family: Courier;width:50px;");

//Loop over and add table contents
for (i=0;i<=9;i++){
	d3.select('#RobotDoctorDiv').select("#robotdata"+i%10).selectAll("td")
		.data([myData[i%10].T,
		myData[i%10].HR,
		myData[i%10].S_true])
	.html(function(d) { return d.toFixed(2); });
}

	
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// ROBOT SETUP

var doctor = d3.select('#RobotDoctorDiv')
	.selectAll('svg').selectAll('#robotdoctor')
	.data([0])
	.enter()
	.append('svg:image')
	.attr('id', 'robotdoctor')
	.attr('href','./Robot_Doctor.svg')
	.attr('x', x(3))
	.attr('y', y(1+3.5))
	.attr('height',Math.abs(y(5)-y(0)));

var robotEyeL = d3.select('#RobotDoctorDiv')
	.selectAll('svg').selectAll('#robotEyeL')
	.data([0])
	.enter()
	.append('circle')
	.attr('id','robotEyeL')
	.attr('cx',x(5.1))
	.attr('cy',y(-0.2+3.5))
	.attr('r',x(0.1)-x(0))
	.attr("fill", "black");	
				
var robotEyeR = d3.select('#RobotDoctorDiv')
	.selectAll('svg').selectAll('#robotEyeR')
	.data([0])
	.enter()
	.append('circle')
	.attr('id','robotEyeR')
	.attr('cx',x(6))
	.attr('cy',y(-0.2+3.5))
	.attr('r',x(0.1)-x(0))
	.attr("fill", "black");	
	
	
	
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// MATH SETUP		

var theEqn = d3.select('#RobotDoctorDiv')
  .selectAll('svg').append("foreignObject")
  .attr("width", 480)
  .attr("height", 500)
  .attr('y',y(-1))
  .append("xhtml:body");	

theEqn.append('div')
	.style('font-size','50%')
	.attr('id','drEqn')
	.text('\\[ \\LARGE{ S_{pred} = \\frac{1}{1+e^{ - \\left(\\frac{w_5 }{1 + e^{-\\left(T\\cdot w_1+ {HR}\\cdot w_2 \\right)}} +\\frac{w_6}{1 + e^{-\\left(T\\cdot w_3+ {HR}\\cdot w_4\\right)}} \\right) } }  }  \\] ');

var S_up;
var S_down;
// W Variables
var w1_up;
var w1_down;
var w2_up;
var w2_down;
var w3_up;
var w3_down;
var w4_up;
var w4_down;
var w5_up;
var w5_down;
var w6_up;
var w6_down;
// T and HR variables
var T_1;
var T_2;
var HR_1;
var HR_2;

function mathInit_Robot(){
	
	
	// S variable
	S_up   = d3.select('#MJXc-Node-224').selectAll('.mjx-char');
	S_down = d3.select('#MJXc-Node-225').selectAll('.mjx-char').text('pred');
	// W Variables
	w1_up   = d3.select('#MJXc-Node-263').selectAll('.mjx-char');
	w1_down = d3.select('#MJXc-Node-264').selectAll('.mjx-char');
	w2_up   = d3.select('#MJXc-Node-272').selectAll('.mjx-char');
	w2_down = d3.select('#MJXc-Node-273').selectAll('.mjx-char');
	w3_up   = d3.select('#MJXc-Node-294').selectAll('.mjx-char');
	w3_down = d3.select('#MJXc-Node-295').selectAll('.mjx-char');
	w4_up   = d3.select('#MJXc-Node-303').selectAll('.mjx-char');
	w4_down = d3.select('#MJXc-Node-304').selectAll('.mjx-char');
	w5_up   = d3.select('#MJXc-Node-247').selectAll('.mjx-char');  
	w5_down = d3.select('#MJXc-Node-248').selectAll('.mjx-char');	
	w6_up   = d3.select('#MJXc-Node-278').selectAll('.mjx-char');
	w6_down = d3.select('#MJXc-Node-279').selectAll('.mjx-char');
	// T and HR variables
	T_1  = d3.select('#MJXc-Node-260').selectAll('.mjx-char');
	T_2  = d3.select('#MJXc-Node-291').selectAll('.mjx-char');
	HR_1 = d3.select('#MJXc-Node-266').selectAll('.mjx-char').text('HR');
	HR_2 = d3.select('#MJXc-Node-297').selectAll('.mjx-char').text('HR');
	
	
	// Remove 'r','e','d' from 'pred'
	d3.select('#MJXc-Node-228').selectAll('.mjx-char').remove();
	d3.select('#MJXc-Node-229').selectAll('.mjx-char').remove();
	d3.select('#MJXc-Node-230').selectAll('.mjx-char').remove();
	
	// Remove 'R' from 'HR'
	d3.select('#MJXc-Node-269').selectAll('.mjx-char').remove();
	d3.select('#MJXc-Node-300').selectAll('.mjx-char').remove();
	
	d3.select('#MJXc-Node-223').style('width','3em');
	d3.select('#MJXc-Node-245').selectAll(function(){return this.childNodes})
		.filter(function(d,i){return i === 0;})
		.style('width','11.0em');  // 245 - left eqn
	d3.select('#MJXc-Node-276').selectAll(function(){return this.childNodes})
		.filter(function(d,i){return i === 0;})
		.style('width','11.0em');  // 276 - right eqn
}


MathJax.Hub.Queue(function () {mathInit_Robot();});

// Settings for scanning the patient 
var scanDuration = 1200;
var resetDuration = 500;	
var advanceTime = 500;
var flyToEquationDuration = 1000;
var trainNumber = -1;
var T_x = [2,6.8];
var T_y = [-3,-3];
var HR_x = [4,8.8];
var HR_y = [-3,-3];

function robotScanPatient () {
	d3.select('#RobotDoctorDiv').selectAll('#scanL').remove();
	d3.select('#RobotDoctorDiv').selectAll('#scanR').remove();
	d3.select('#RobotDoctorDiv').selectAll('#robotEyeL').transition().duration(0)
			.attr('cx',x(5.1))
			.attr('cy',y(-0.2+3.5-0.02*(trainNumber%10)));
	d3.select('#RobotDoctorDiv').selectAll('#robotEyeR').transition().duration(0)
			.attr('cx',x(6))
			.attr('cy',y(-0.2+3.5-0.02*(trainNumber%10)));
	var scanL = d3.select('#RobotDoctorDiv')
				.select('svg').selectAll('#scanL')
				.data([0])
				.enter()
				.append('line')
				.attr('id','scanL')
				.attr('x1',x(5.1))
				.attr('y1',y(-0.2+3.5-0.02*(trainNumber%10)))
				.attr('x2',x(-2))
				.attr('y2',function (d,i){return y(4.3-0.51*(trainNumber%10));})
				.attr("stroke-width", 2)
				.attr("stroke", "black");
				
	var scanR = d3.select('#RobotDoctorDiv')
				.select('svg').selectAll('#scanR')
				.data([0])
				.enter()
				.append('line')
				.attr('id','scanR')
				.attr('x1',x(6))
				.attr('y1',y(-0.2+3.5-0.02*(trainNumber%10)))
				.attr('x2',x(-2))
				.attr('y2',function (d,i){return y(4.3-0.51*(trainNumber%10));})
				.attr("stroke-width", 2)
				.attr("stroke", "black");


	robotEyeL.transition().duration(scanDuration)
		.attr('cx',x(5.15))
		.on('end', function(){
		  return robotEyeL.transition().duration(resetDuration)
					.attr('cx',x(5.1))
					.attr('cy',y(-0.2+3.5-0.02*((trainNumber+1)%10)));} 
		);
	robotEyeR.transition().duration(scanDuration)
		.attr('cx',x(6.05))
		.on('end', function(){
		  return robotEyeR.transition().duration(resetDuration)
					.attr('cx',x(6))
					.attr('cy',y(-0.2+3.5-0.02*((trainNumber+1)%10)));} 
		);
	
	scanL.transition().duration(scanDuration)
		.attr('x1',x(5.1))
		.attr('x2',x(0))
		.on('end', function(){
		  return scanL.remove();} 
		);
	scanR.transition().duration(scanDuration)
		.attr('x1',x(6))
		.attr('x2',x(0))
		.on('end', function(){
			d3.select('#RobotDoctorDiv').select('#robotdata'+trainNumber%10).style('background','lightgray');
			d3.select('#RobotDoctorDiv').select('#robotdata'+(trainNumber-1)%10).style('background','none');
			moveNumbers();
			trainNumber++;
		  return scanR.remove();} 
		);
	
}

function moveNumbers(){
	
	theTemp = myData[trainNumber%10].T.toFixed(2);
	theHR   = myData[trainNumber%10].HR.toFixed(2);


	var flyT = d3.select('#RobotDoctorDiv').select('svg').selectAll('.flyDataT').data(T_x)
		.enter().append('text')
		.attr('x',function (d,i) {return x(-2);})
		.attr('y',function (d,i){return y( 4.3-0.51*(trainNumber%10) );});
	
	var flyHR = d3.select('#RobotDoctorDiv').select('svg').selectAll('.flyDataHR').data(HR_x)
		.enter().append('text')
		.attr('x',function (d,i) {return x(-1);})
		.attr('y',function (d,i){return y( 4.3-0.51*(trainNumber%10) );});
	
	flyT.text(theTemp)
		.transition().duration(flyToEquationDuration)
		.attr('x', function (d,i) {return x(T_x[i]);})
		.attr('y', function (d,i) {return y(T_y[i]);})
		.on('end', function (d,i) {
				mathInit_Robot();
				T_1.text(theTemp);
				T_2.text(theTemp);
				return flyT.remove();
			});
	
	flyHR.text(theHR)
		.transition().duration(flyToEquationDuration)
		.attr('x', function (d,i) {return x(HR_x[i]);})
		.attr('y', function (d,i) {return y(HR_y[i]);})
		.on('end', function (d,i) {
		
				flyHR.remove();
				
				HR_1.text(theHR);
				HR_2.text(theHR);
				
				var tN = trainNumber-1;
				S_up.text('');
				S_down.text('');
				var theOutput = d3.select('#RobotDoctorDiv').select('svg').selectAll('#movingOutput').data([0])
					.enter().append('text');
					
				theOutput.transition().delay(1000)
					.attr('x',x(-2))
					.attr('y',y(-2))
					.text(myData[tN%10].y_pred.toFixed(2))
					.on('end',function(){
					
				theOutput.transition().delay(1000).duration(1000)
					.attr('x',x(1.55))
					.attr('y',y(4.15-0.51*(tN%10)))
					.on('end',function(){
					
					d3.select('#RobotDoctorDiv').select("#robotdata"+tN%10).selectAll("td")
						.data([myData[tN%10].T,
						myData[tN%10].HR,
						myData[tN%10].S_true,
						myData[tN%10].y_pred] )
					.html(function(d) { return d.toFixed(2); });
					return theOutput.remove();});
					});
				return; 
			});
}

var w_Initial_EQN = [{"x": 3.0, "y": -2.9},
					 {"x": 4.2, "y": -2.9},
					 {"x": 7.0, "y": -2.9},
					 {"x": 8.2, "y": -2.9},
					 {"x": 3.1, "y": -2.2},
					 {"x": 7.1, "y": -2.2} ];
				 
function robotLoadWs(){

	var flyWs = d3.select('#RobotDoctorDiv').select('svg').selectAll('.theOnes')
		.data(w_Initial_EQN)
		.enter().append('text')
		.attr('x',function (d,i) {return x(9);})
		.attr('y',function (d,i) {return y(4);})
		.text('1');
	
	flyWs.transition().duration(flyToEquationDuration)
		.attr('x',function (d,i) {return x(d.x);})
		.attr('y',function (d,i) {return y(d.y);})
		.on('end', function (d,i) {
				w1_up.text('1');
				w2_up.text('1');
				w3_up.text('1');
				w4_up.text('1');
				w5_up.text('1');
				w6_up.text('1');
				
				w1_down.text('');
				w2_down.text('');
				w3_down.text('');
				w4_down.text('');
				w5_down.text('');
				w6_down.text('');
				return flyWs.remove();
			});
	
	
}












//Size of black box
var rGears = 3;

//Position of gears within box & Gear size
var myGears = [
{"x": -rGears/4+5.75,  "y":  +2*rGears/3,  "r":  +0.6},
{"x": -rGears/4+5.75,  "y":  +1*rGears/3,  "r":  +0.6},
{"x": -rGears/4+5.75,  "y":  +0*rGears/3,  "r":  +0.6},
{"x": +rGears/4+5.75,  "y":  +2*rGears/3,  "r":  +0.6},
{"x": +rGears/4+5.75,  "y":  +1*rGears/3,  "r":  +0.6},
{"x": +rGears/4+5.75,  "y":  +0*rGears/3,  "r":  +0.6},
];
			
var g = d3.scaleLinear().domain([0,rGears/3])
						.range([0, 100]);
var g_inv = d3.scaleLinear().domain([0, 100])
						.range([0,rGears/3]);

function revolveGears(ang) {

	svg.selectAll('.gearRotate').transition().duration(50)
	.attr('transform',function (d) {
			return translateRotate(x(d.x)-calcWidth(d.r)/2,
								   y(d.y)-calcHeight(d.r)/2,
								   ang,
								   calcWidth(d.r)/2,
								   calcHeight(d.r)/2);
		})
	.on('end', function (d){
					
					if(ang>=360){
						return;
					};
					
					revolveGears(ang+10);					
					
				});
	
	return;
}	

function spinGears (){
	
	if (trainNumber===-1){
		robotLoadWs();
		trainNumber++;
	} else {
		revolveGears(0);
		robotScanPatient();
	}
}

function positionGears(g){
	g.attr('transform',
			function (d) {return translate(x(d.x)-calcWidth(d.r)/2,
										   y(d.y)-calcHeight(d.r)/2); 
			})
		.attr('width', function (d) {return x(d.r)-x(0);})
		.attr('height',function (d) {return y(0)-y(d.r);});
}


var gears = d3.select('#RobotDoctorDiv')
    .select('svg').selectAll('.gearRotate')
	.data(myGears)
	.enter()
	.append('svg:image')
	.attr('id', function (d,i) {return 'gear'+i;})
	.attr('class','gearRotate')
	.attr('href','./gear.svg')
	.attr('x', 0)
	.attr('y', 0)
	.attr('fill','black')
	.on('click', function(d) {return spinGears();} );

positionGears(gears);

d3.select('#RobotDoctorDiv')
	.selectAll("svg")
	.style('width','600px')
	.style('height','350px');
	