
// Gears
var rWidth = 4;
var rHeight = 4;

var myGears = [
{"x": -rWidth/4,  "y":  +rHeight/3,  "r":  +1.0},
{"x": -rWidth/4,  "y":   0,  	     "r":  +0.2},
{"x": -rWidth/4,  "y":  -rHeight/3,  "r":  +0.7},
{"x": +rWidth/4,  "y":  +rHeight/3,  "r":  +0.4},
{"x": +rWidth/4,  "y":   0,  	     "r":  +1.0},
{"x": +rWidth/4,  "y":  -rHeight/3,  "r":  +0.6},
];

var g = d3.scaleLinear().domain([0,rHeight/3])
						.range([0, 100]);
var g_inv = d3.scaleLinear().domain([0, 100])
						.range([0,rHeight/3]);

function revolveGears(ang) {

	svg.selectAll('image').transition().duration(50)
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
	
	if(ang>=360){updateTable(c);};	
	return;
}	

var c = -1;
function spinGears (){
	c=c+1;
	revolveGears(0);
}

function calcWidth(w){
	return Math.abs(x(w)-x(0));
}
function calcHeight(h){
	return Math.abs(y(h)-y(0));
}

function positionGears(g){
	g.attr('transform',
			function (d) {return translate(x(d.x)-calcWidth(d.r)/2,
										   y(d.y)-calcHeight(d.r)/2); 
			})
		.attr('width', function (d) {return x(d.r)-x(0);})
		.attr('height',function (d) {return y(0)-y(d.r);});
}

svg.selectAll('rect').data([0])
	.enter()
	.append('rect')
	.attr('x',0)
	.attr('y',0)
	.attr('width',x(rWidth)-x(0))
	.attr('height',y(0) - y(rHeight))
	.attr('fill','black')
	.attr('transform',translate(x(-rWidth/2),y(rHeight/2)) );

var gears = svg.selectAll('image').data(myGears)
	.enter()
	.append('svg:image')
	.attr('id', function (d,i) {return 'gear'+i;})
	.attr('href','./gear.svg')
	.attr('x', 0)
	.attr('y', 0)
	.attr('fill','black')
	.on('click', function(d) {return spinGears();} );

positionGears(gears);