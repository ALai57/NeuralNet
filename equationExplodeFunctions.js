

var xEq = d3.scaleLinear().domain([-2, 10])
							.range([0, 600]);
var yEq = d3.scaleLinear().domain([5,-5])
						.range([0, 600]);

var explodeSVG;
var theEqnSVG;

var eqnWhole;
var eqnRHS;
var eqnTop_1,   eqnTop_Bar, eqnTop_Denom;
var eqnDenom_1, eqnDenom_P, eqnDenom_e;
var eqnExp1_n;
var eqnX, eqnY, eqnZ;
var eqnX_Right, eqnX_Left, eqnX_P;
var eqnX_Left_Bar, eqnX_Left_Denom
var eqnX_Right_Bar, eqnX_Right_Denom;
var eqnW5, eqnW6;
var eqnExp2_leftP, eqnExp2_rightP;
var eqnExp3_leftP, eqnExp3_rightP;

var eqnTop_Bar_Previous;
var eqnDenom_1_Previous, eqnDenom_P_Previous, eqnDenom_e_Previous;
var eqnExp1_n_Previous;
var eqnX_Previous, eqnY_Previous, eqnZ_Previous;
var eqnX_Right_Previous, eqnX_Left_Previous, eqnX_P_Previous;
var eqnW5_Previous, eqnW6_Previous;
var eqnX_Left_Bar_Previous, eqnX_Right_Bar_Previous;
var eqnX_Left_Denom_Previous, eqnX_Right_Denom_Previous;
var eqnX_Left_Bar_w_Previous, eqnX_Right_Bar_w_Previous;
			
var EXPLODE_STATE=1;

function nextExplode(){
	if (EXPLODE_STATE === 1){
		explodeEqn();
		EXPLODE_STATE=EXPLODE_STATE+1;
	}else if (EXPLODE_STATE === 2){
		explodeEqn2();
		EXPLODE_STATE=EXPLODE_STATE+1;
	}else if (EXPLODE_STATE === 3){
		explodeEqn3();
		EXPLODE_STATE=EXPLODE_STATE+1;
	}else if (EXPLODE_STATE === 4){
		explodeEqn4();
		EXPLODE_STATE=EXPLODE_STATE+1;
	}
	
}
			
MathJax.Hub.Config({
  jax: ["input/TeX","output/SVG", "output/PreviewHTML"],
  extensions: ["tex2jax.js","MathMenu.js","MathZoom.js", "fast-preview.js", "AssistiveMML.js", "a11y/accessibility-menu.js"],
  TeX: {
	extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"]
  }
});	

MathJax.Hub.Queue(function () {
					

explodeSVG = d3.select('#EquationExplode')
	.append("svg")
	.style("width",600)
	.style("height",600)
	.on('click',function(){nextExplode()});	
	
var theEqn = explodeSVG.append("foreignObject")
  .attr("width", 580)
  .attr("height", 500)
  .attr('y', yEq(5))
  .append("xhtml:body");

theEqn.append('div')
	.style('font-size','60%')
	.attr('id','explodedEqn')
	.text(' \\[ \\Huge{ S_{pred} = \\frac{1}{1+e^{ - \\left(\\frac{w_5 }{1 + e^{-\\left(T\\cdot w_1+ {HR}\\cdot w_2 \\right)}} +\\frac{w_6}{1 + e^{-\\left(T\\cdot w_3+ {HR}\\cdot w_4\\right)}} \\right) } }  }  \\] ');

});

MathJax.Hub.Queue(["Typeset",MathJax.Hub]);


MathJax.Hub.Queue(function () {
	
	//Parsing whole equation
	theEqnSVG = d3.select('#explodedEqn').selectAll('svg')
			.attr('width',580)
			.attr('height',580);
	
	eqnWhole = theEqnSVG.selectAll(function(){return this.childNodes;});
	eqnWhole.attr('transform', "matrix(1, 0, 0, -1, 0, -20000)" )
			.attr('id','eqn_Whole');
	
	eqnRHS = eqnWhole.selectAll(function(){return this.childNodes})
					 .filter(function(d,i){return i === 3;});
	eqnRHS.attr('id','eqn_RHS');
	
	//Parsing the RHS of the equation
	var temp;
	temp = eqnRHS.selectAll(function(){return this.childNodes})
					.selectAll(function(){return this.childNodes});
	eqnTop_Bar   = temp.filter(function(d,i){return i === 0;})
						.attr('id','eqnTop_Bar');
	eqnTop_1     = temp.filter(function(d,i){return i === 1;})
						.attr('id','eqnTop_1');
	eqnTop_Denom = temp.filter(function(d,i){return i === 2;})
						.attr('id','eqnTop_Denom');
	
	//Parsing the denominator of the equation
	temp = eqnTop_Denom.selectAll(function(){return this.childNodes});
	eqnDenom_1     = temp.filter(function(d,i){return i === 0;})
						.attr('id','eqnDenom_1');
	eqnDenom_P     = temp.filter(function(d,i){return i === 1;})
						.attr('id','eqnDenom_P');;
	
	temp = temp.filter(function(d,i){return i === 2;})
						.selectAll(function(){return this.childNodes});
	eqnExp1_e     = temp.filter(function(d,i){return i === 0;})
						.attr('id','eqnExp1_e');
	
	temp = temp.filter(function(d,i){return i === 1;})
						.selectAll(function(){return this.childNodes});
	eqnExp1_n = temp.filter(function(d,i){return i === 0;})
						.attr('id','eqnExp1_n');
	
	temp = temp.filter(function(d,i){return i === 1;})
						.selectAll(function(){return this.childNodes});
	eqnExp1_leftP  = temp.filter(function(d,i){return i === 0;})
						.attr('id','eqnExp1_leftP');
	eqnX           = temp.filter(function(d,i){return i === 1;})
						.attr('id','eqnX');
	eqnExp1_rightP = temp.filter(function(d,i){return i === 2;})
						.attr('id','eqnExp1_rightP');
	
	//Parsing equation X
	temp = eqnX.selectAll(function(){return this.childNodes});
	eqnX_Left = temp.filter(function(d,i){return i === 0;})
						.attr('id','eqnX_Left');
	eqnX_P     = temp.filter(function(d,i){return i === 1;})
						.attr('id','eqnX_P');
	eqnX_Right = temp.filter(function(d,i){return i === 2;})
						.attr('id','eqnX_Right');
						
	temp = eqnX_Left.selectAll(function(){return this.childNodes});
	eqnX_Left_Bar = temp.filter(function(d,i){return i === 0;})
						.attr('id','eqnX_Left_Bar');
	eqnW5 = temp.filter(function(d,i){return i === 1;})
						.attr('id','eqnW5');
	eqnX_Left_Denom = temp.filter(function(d,i){return i === 2;})
						.attr('id','eqnX_Left_Denom');
	
	temp = eqnX_Right.selectAll(function(){return this.childNodes}).selectAll(function(){return this.childNodes});
	eqnX_Right_Bar = temp.filter(function(d,i){return i === 0;})
						.attr('id','eqnX_Right_Bar');
	eqnW6 = temp.filter(function(d,i){return i === 1;})
						.attr('id','eqnW6');
	eqnX_Right_Denom = temp.filter(function(d,i){return i === 2;})
						.attr('id','eqnX_Right_Denom');
	
	//Parsing left denominator of equation X
	temp = eqnX_Left_Denom.selectAll(function(){return this.childNodes});
	eqnX_Left_Denom_1 = temp.filter(function(d,i){return i === 0;})
						.attr('id','eqnX_Left_Denom_1');
	eqnX_Left_Denom_P = temp.filter(function(d,i){return i === 1;})
						.attr('id','eqnX_Left_Denom_P');
	
	temp = temp.filter(function(d,i){return i === 2;})
						.selectAll(function(){return this.childNodes});
	eqnExp2_e     = temp.filter(function(d,i){return i === 0;})
						.attr('id','eqnExp2_e');
	
	temp = temp.filter(function(d,i){return i === 1;})
						.selectAll(function(){return this.childNodes});
	eqnExp2_n = temp.filter(function(d,i){return i === 0;})
						.attr('id','eqnExp2_n');
	
	temp = temp.filter(function(d,i){return i === 1;})
						.selectAll(function(){return this.childNodes});
	eqnExp2_leftP  = temp.filter(function(d,i){return i === 0;})
						.attr('id','eqnExp2_leftP');
	eqnY           = temp.filter(function(d,i){return i === 1;})
						.attr('id','eqnY');
	eqnExp2_rightP = temp.filter(function(d,i){return i === 2;})
						.attr('id','eqnExp2_rightP');
						
	//Parsing right denominator of equation X					
	temp = eqnX_Right_Denom.selectAll(function(){return this.childNodes});
	eqnX_Right_Denom_1 = temp.filter(function(d,i){return i === 0;})
						.attr('id','eqnX_Right_Denom_1');
	eqnX_Right_Denom_P = temp.filter(function(d,i){return i === 1;})
						.attr('id','eqnX_Right_Denom_P');
	
	temp = temp.filter(function(d,i){return i === 2;})
						.selectAll(function(){return this.childNodes});
	eqnExp3_e     = temp.filter(function(d,i){return i === 0;})
						.attr('id','eqnExp3_e');
	
	temp = temp.filter(function(d,i){return i === 1;})
						.selectAll(function(){return this.childNodes});
	eqnExp3_n = temp.filter(function(d,i){return i === 0;})
						.attr('id','eqnExp3_n');
	
	temp = temp.filter(function(d,i){return i === 1;})
						.selectAll(function(){return this.childNodes});
	eqnExp3_leftP  = temp.filter(function(d,i){return i === 0;})
						.attr('id','eqnExp3_leftP');
	eqnZ           = temp.filter(function(d,i){return i === 1;})
						.attr('id','eqnZ');
	eqnExp3_rightP = temp.filter(function(d,i){return i === 2;})
						.attr('id','eqnExp3_rightP');
			
	d3.select('#explodedEqn').selectAll('svg').attr('viewBox',"0 -4000 64078 9602.6");
	
	//Get initial settings
	eqnX_Previous        =  eqnX.attr('transform');
	eqnY_Previous        =  eqnY.attr('transform');
	eqnZ_Previous        =  eqnZ.attr('transform');
	
	eqnTop_Bar_Previous  = [eqnTop_Bar.attr('width'),
							eqnTop_Bar.attr('x')];
	eqnDenom_1_Previous  = [eqnDenom_1.attr('x'),
							eqnDenom_1.attr('y')];
	eqnDenom_P_Previous  = [eqnDenom_P.attr('x'),
							eqnDenom_P.attr('y')];
	eqnExp1_e_Previous   = [eqnExp1_e.attr('x'),
							eqnExp1_e.attr('y')];
	eqnExp1_n_Previous   = [eqnExp1_n.attr('x'),
							eqnExp1_n.attr('y')];
	eqnX_P_Previous_t    =  eqnX_P.attr('transform');
	eqnX_Right_Previous  =  eqnX_Right.attr('transform');
	eqnW5_Previous       =  eqnW5.attr('transform');
	eqnW6_Previous       =  eqnW6.attr('transform');
	eqnX_P_Previous      =	eqnX_P.attr('x');
	eqnX_Left_Bar_Previous    = [eqnX_Left_Bar.attr('x'),
								 eqnX_Left_Bar.attr('y')]; 
	eqnX_Left_Denom_Previous  = eqnX_Left_Denom.attr('transform');
	eqnX_Right_Bar_Previous   = [eqnX_Right_Bar.attr('x'),
								 eqnX_Right_Bar.attr('y')]; 
	eqnX_Right_Denom_Previous = eqnX_Right_Denom.attr('transform');
	
	eqnX_Left_Bar_w_Previous =  eqnX_Left_Bar.attr('width');
	eqnX_Right_Bar_w_Previous =  eqnX_Right_Bar.attr('width');
	
});

function explodeEqn(){
	eqnX.transition().duration(1000)
			.attr('transform', 'translate(-4500,-8000)')
			.on('end',function(){
			
	eqnTop_Bar.transition().duration(1000)
		.attr('width',10000)
		.attr('x',13000);
	eqnTop_1.transition().duration(1000)
		.attr('x',7000)
		.attr('y',800);
	eqnDenom_1.transition().duration(1000)
		.attr('x',5800)
		.attr('y',1000);
	eqnDenom_P.transition().duration(1000)
		.attr('x',6300)
		.attr('y',1000);
	eqnExp1_leftP.transition().duration(100)
		.style('opacity',0);
	eqnExp1_rightP.transition().duration(100)
		.style('opacity',0);
	eqnExp1_n.transition().duration(1000)
		.attr('x',7000)
		.attr('y',1100);
	
	eqnExp1_e.transition().duration(1000)
		.attr('x',5700)
		.attr('y',1000)
		.on('end',function(){
			
	explodeSVG.selectAll('#In3_Eqn').data([0])
		.enter().append('text')
		.style('opacity',0)
		.attr('id','In3_Eqn')
		.transition().delay(500)
		.attr('x', xEq(-1.1))
		.attr('y', yEq(1.46))
		.style('opacity',1)
		.text('In3 =')
		.style('font-size','14pt')
		.style('font-family','Times');
		
	explodeSVG.selectAll('#In3_Neuron').data([0])
		.enter().append('text')
		.style('opacity',0)
		.attr('id','In3_Neuron')
		.transition().delay(500)
		.attr('x', xEq(3.6))
		.attr('y',  yEq(3.0))
		.style('opacity',1)
		.text('In3')
		.style('font-family','Times')
		.style('font-size','14pt');	
	
	explodeSVG.selectAll('#neuron3').data([0])
		.enter().append('circle')
		.style('fill','none')
		.style('stroke','red')
		.attr('id','neuron3')
		.transition().delay(500)
		.attr('cx', xEq(3))
		.attr('cy',  yEq(3.3))
		.attr('r', 60);
	
		});
		
	});

}

function undoExplodeEqn(){

	d3.selectAll('svg').selectAll('#In3_Eqn').remove();
	d3.selectAll('svg').selectAll('#In3_Neuron').remove();
	d3.selectAll('svg').selectAll('#neuron3').remove();

	eqnX.transition().duration(1000)
			.attr('transform', eqnX_Previous);
			
	eqnTop_Bar.transition().duration(1000)
		.attr('width',eqnTop_Bar_Previous[0])
		.attr('x',eqnTop_Bar_Previous[1]);
	eqnDenom_1.transition().duration(1000)
		.attr('x',eqnDenom_1_Previous[0])
		.attr('y',eqnDenom_1_Previous[1]);
	eqnDenom_P.transition().duration(1000)
		.attr('x',eqnDenom_P_Previous[0])
		.attr('y',eqnDenom_P_Previous[1]);
	eqnExp1_e.transition().duration(1000)
		.attr('x',eqnExp1_e_Previous[0])
		.attr('y',eqnExp1_e_Previous[1]);
	eqnExp1_n.transition().duration(1000)
		.attr('x',eqnExp1_n_Previous[0])
		.attr('y',eqnExp1_n_Previous[1])
		.on('end',function(){
	eqnExp1_leftP.transition().delay(250).duration(100)
		.style('opacity',1);
	eqnExp1_rightP.transition().delay(250).duration(100)
		.style('opacity',1);
		});
	
}

function explodeEqn2(){
	eqnX_P.transition().duration(1000)
		.attr('transform','scale(2.4)');
	eqnX_Right.transition().duration(1000)
		.attr('transform','translate(28000,0)');
	
	eqnW5.transition().duration(1000)
		.attr('transform','translate(21000,0)');
		
	eqnW6.transition().duration(1000)
		.attr('transform','translate(21000,0)');	
	
	explodeSVG.selectAll('.myones').data([1.8,7])
		.enter().append('text')
		.attr('class','myones')
		.text('1')
		.style('font-family','Times')
		.style('opacity',0)
		.style('font-size',22)
		.attr('x',function(d){return xEq(d);})
		.attr('y', yEq(1.7))
		.transition().duration(1000)
		.style('opacity',1);
		
	explodeSVG.selectAll('.dots').data([1.95+1.8,7+1.8])
		.enter().append('text')
		.attr('class','dots')
		.text('.')
		.style('font-family','Times')
		.style('opacity',0)
		.style('font-size',62)
		.attr('x',function(d){return xEq(d);})
		.attr('y', yEq(1.5))
		.transition().duration(1000)
		.style('opacity',1);	
}

function undoExplodeEqn2(){
	
	d3.selectAll('svg').selectAll('.myones').remove();	
	d3.selectAll('svg').selectAll('.dots').remove();
	
	eqnX_P.transition().duration(1000)
		.attr('transform',eqnX_P_Previous_t);
	eqnX_Right.transition().duration(1000)
		.attr('transform',eqnX_Right_Previous);
	
	eqnW5.transition().duration(1000)
		.attr('transform',eqnW5_Previous);
	eqnW6.transition().duration(1000)
		.attr('transform',eqnW6_Previous);
		
}

function explodeEqn3(){
	var temp = explodeSVG.selectAll('.myones');
	
	temp.transition().duration(1000)
		.attr('y', yEq(-0.5));
	
	eqnX_Left_Bar.transition().duration(1000)
		.attr('y',-14500);
	eqnX_Left_Denom.transition().duration(1000)
		.attr('transform','translate(149,-18000)')
		.on('end',function(){
			
	explodeSVG.selectAll('#yvar_Eqn').data([0])
		.enter().append('text')
		.style('opacity',0)
		.attr('id','yvar_Eqn')
		.transition().delay(500)
		.attr('x', xEq(-1.1))
		.attr('y',  yEq(-0.8))
		.style('opacity',1)
		.text('y =')
		.style('font-size','18pt')
		.style('font-family','Times');
		
	explodeSVG.selectAll('#yvar_Neuron').data([0])
		.enter().append('text')
		.style('opacity',0)
		.attr('id','yvar_Neuron')
		.style('font-size',22)
		.text('y')
		.transition().delay(500)
		.attr('x', xEq(1.4))
		.attr('y',  yEq(1.46))
		.style('opacity',1)
		.style('font-family','Times');	
			
		});
		
	eqnX_Right_Bar.transition().duration(1000)
		.attr('y',-14500);
	eqnX_Right_Denom.transition().duration(1000)
		.attr('transform','translate(149,-18000)')	
		.on('end',function(){
			
	explodeSVG.selectAll('#zvar_Eqn').data([0])
		.enter().append('text')
		.style('opacity',0)
		.attr('id','zvar_Eqn')
		.transition().delay(500)
		.attr('x', xEq(4.6))
		.attr('y',  yEq(-0.8))
		.style('opacity',1)
		.text('z =')
		.style('font-size','18pt')
		.style('font-family','Times');
		
	explodeSVG.selectAll('#zvar_Neuron').data([0])
		.enter().append('text')
		.style('opacity',0)
		.attr('id','zvar_Neuron')
		.style('font-size',22)
		.text('z')
		.transition().delay(500)
		.attr('x', xEq(7))
		.attr('y',  yEq(1.46))
		.style('opacity',1)
		.style('font-family','Times')
		.on('end',function(){return consolidateXeqn();});
		
	
		});
}

function consolidateXeqn(){
	d3.selectAll('#In3_Eqn').transition().duration(1000)
		.attr('x',xEq(0.5));
	d3.selectAll('#yvar_Neuron').transition().duration(1000)
		.attr('x',xEq(1.75));
	d3.selectAll('.dots').transition().duration(1000)
		.attr('x',function(d,i){return xEq(2.1)+i*125;});
	eqnW5.transition().duration(1000)
		.attr('transform','translate(14000,0)');
	eqnW6.transition().duration(1000)
		.attr('transform','translate(-1000,0)');

	eqnX_P.transition().duration(1000)
		.attr('x',7800);
	d3.selectAll('#zvar_Neuron').transition().duration(1000)
		.attr('x',xEq(4.2));
		
	explodeSVG.selectAll('#input3').data([0])
		.enter().append('rect')
		.style('fill','none')
		.style('stroke','red')
		.attr('id','input3')
		.transition().delay(500)
		.attr('x',170)
		.attr('y',185)
		.attr('rx', 20)
		.attr('ry', 20)
		.attr('width',230)
		.attr('height',50);
}

function undoExplodeEqn3(){
	
	d3.selectAll('svg').selectAll('#yvar_Eqn').remove();
	d3.selectAll('svg').selectAll('#yvar_Neuron').remove();	

	d3.selectAll('svg').selectAll('#zvar_Eqn').remove();
	d3.selectAll('svg').selectAll('#zvar_Neuron').remove();
	
	d3.selectAll('svg').selectAll('#input3').remove();
	
	svg.selectAll('.myones')
		.transition().duration(1000)
		.attr('y', yEq(1.7));
		
	svg.selectAll('.dots')
		.transition().duration(1000)
		.attr('x',function(d){return xEq(d);})
		.attr('y', yEq(1.5));	
	
	eqnX_P.transition().duration(1000)
		.attr('x',eqnX_P_Previous);
	
	eqnW5.transition().duration(1000)
		.attr('transform','translate(21000,0)');
		
	eqnW6.transition().duration(1000)
		.attr('transform','translate(21000,0)');	
	
	eqnX_Left_Bar.transition().duration(1000)
		.attr('y',eqnX_Left_Bar_Previous[1]);
	eqnX_Left_Denom.transition().duration(1000)
		.attr('transform',eqnX_Left_Denom_Previous);
	

	eqnX_Right_Bar.transition().duration(1000)
		.attr('y',eqnX_Right_Bar_Previous[1]);
	eqnX_Right_Denom.transition().duration(1000)
		.attr('transform',eqnX_Right_Denom_Previous);
		
	d3.selectAll('svg').selectAll('#In3_Eqn')
		.transition().duration(1000)
		.attr('x', xEq(-1.1))
		.attr('y',  yEq(1.46))
		
	
		
}

function explodeEqn4(){
	eqnX_Left_Bar.transition().duration(1000)
		.attr('x',-4000);
	eqnX_Right_Bar.transition().duration(1000)
		.attr('x',-4000);
		
	eqnX_Left_Denom.transition().duration(1000)
		.attr('transform','translate(-1500,-18000)');
	eqnX_Right_Denom.transition().duration(1000)
		.attr('transform','translate(-1500,-18000)');
	explodeSVG.selectAll('.myones').transition().duration(1000)
		.attr('x',function(d,i){return xEq(0.4)+i*(xEq(5.15)-xEq(0));});
	
	eqnExp2_leftP.transition().duration(100)
		.style('opacity',0);
	eqnExp2_rightP.transition().duration(100)
		.style('opacity',0);
	eqnExp3_leftP.transition().duration(100)
		.style('opacity',0);
	eqnExp3_rightP.transition().duration(100)
		.style('opacity',0);	

	explodeSVG.selectAll('#yvar_Eqn')
			.transition().delay(500)
			.attr('x', xEq(-1.5));

	eqnY.transition().duration(1000)
			.attr('transform', 'translate(-5000,-8500)')
			.on('end',function(){
			
		d3.selectAll('svg').selectAll('#yvar_Eqn')
			.transition().delay(500)
			.attr('x', xEq(-1.5));
			
			
			});
	
	eqnX_Left_Bar.transition().duration(1000)
		.attr('width',8000);
	eqnX_Right_Bar.transition().duration(1000)
		.attr('width',8000);
			
	explodeSVG.selectAll('#zvar_Eqn')
		.transition().delay(500)
		.attr('x', xEq(3.7));
		
	eqnZ.transition().duration(1000)
			.attr('transform', 'translate(-5000,-8500)')
			.on('end',function(){
		

	explodeSVG.selectAll('#neuron2').data([0])
		.enter().append('circle')
		.style('fill','none')
		.style('stroke','red')
		.attr('id','neuron2')
		.transition().delay(500)
		.attr('cx', xEq(5.7))
		.attr('cy',  yEq(-0.7))
		.attr('r', 60);
		
	explodeSVG.selectAll('#neuron1').data([0])
		.enter().append('circle')
		.style('fill','none')
		.style('stroke','red')
		.attr('id','neuron1')
		.transition().delay(500)
		.attr('cx', xEq(0.6))
		.attr('cy',  yEq(-0.7))
		.attr('r', 60);		
		});	
		
	explodeSVG.selectAll('#In1_Neuron').data([0])
		.enter().append('text')
		.style('opacity',0)
		.attr('id','In1_Neuron')
		.transition().delay(500)
		.attr('x', xEq(0.9))
		.attr('y',  yEq(-1.1))
		.style('opacity',1)
		.text('In1')
		.style('font-size','14pt')
		.style('font-family','Times');
		
	explodeSVG.selectAll('#In1_Eqn').data([0])
		.enter().append('text')
		.style('opacity',0)
		.attr('id','In1_Eqn')
		.style('font-size','14pt')
		.text('In1 = ')
		.transition().delay(500)
		.attr('x', xEq(-1.2))
		.attr('y',  yEq(-2.4))
		.style('opacity',1)
		.style('font-family','Times');	
		
	explodeSVG.selectAll('#In2_Neuron').data([0])
		.enter().append('text')
		.style('opacity',0)
		.attr('id','In2_Neuron')
		.transition().delay(500)
		.attr('x', xEq(5.9))
		.attr('y',  yEq(-1.1))
		.style('opacity',1)
		.text('In2')
		.style('font-size','14pt')
		.style('font-family','Times');
		
	explodeSVG.selectAll('#In2_Eqn').data([0])
		.enter().append('text')
		.style('opacity',0)
		.attr('id','In2_Eqn')
		.style('font-size','14pt')
		.text('In2 = ')
		.transition().delay(500)
		.attr('x', xEq(3.8))
		.attr('y',  yEq(-2.4))
		.style('opacity',1)
		.style('font-family','Times');		
	
	explodeSVG.selectAll('#input1').data([0])
		.enter().append('rect')
		.style('fill','none')
		.style('stroke','red')
		.attr('id','input1')
		.transition().delay(500)
		.attr('x',85)
		.attr('y',415)
		.attr('rx', 20)
		.attr('ry', 20)
		.attr('width',140)
		.attr('height',50);

	explodeSVG.selectAll('#input2').data([0])
		.enter().append('rect')
		.style('fill','none')
		.style('stroke','red')
		.attr('id','input2')
		.transition().delay(500)
		.attr('x',335)
		.attr('y',415)
		.attr('rx', 20)
		.attr('ry', 20)
		.attr('width',140)
		.attr('height',50);
}

function undoExplodeEqn4(){
	
	d3.selectAll('svg').selectAll('#In1_Eqn').remove();
	d3.selectAll('svg').selectAll('#In1_Neuron').remove();	

	d3.selectAll('svg').selectAll('#In2_Eqn').remove();
	d3.selectAll('svg').selectAll('#In2_Neuron').remove();

	d3.selectAll('#input1').remove();
	d3.selectAll('#input2').remove();
	
	d3.selectAll('#neuron1').remove();
	d3.selectAll('#neuron2').remove();
	
	d3.selectAll('svg').selectAll('.dots').remove();
	
	eqnExp2_leftP.transition().duration(100)
		.style('opacity',1);
	eqnExp2_rightP.transition().duration(100)
		.style('opacity',1);
	eqnExp3_leftP.transition().duration(100)
		.style('opacity',1);
	eqnExp3_rightP.transition().duration(100)
		.style('opacity',1);
	
	eqnX_Left_Bar.transition().duration(1000)
		.attr('width',eqnX_Left_Bar_w_Previous);
	eqnX_Right_Bar.transition().duration(1000)
		.attr('width',eqnX_Right_Bar_w_Previous);

	eqnX_Right.transition().duration(1000)
		.attr('transform','translate(28000,0)');	
	eqnX_Right_Denom.transition().duration(1000)
		.attr('transform','translate(149,-18000)');	
	eqnX_Left_Denom.transition().duration(1000)
		.attr('transform','translate(149,-18000)');

	eqnY.transition().duration(1000)
		.attr('transform',eqnY_Previous);
	eqnZ.transition().duration(1000)
		.attr('transform',eqnZ_Previous);
		
	d3.selectAll('svg').selectAll('#zvar_Eqn')
		.transition().delay(500)
		.attr('x', xEq(4.6));	
	d3.selectAll('svg').selectAll('#yvar_Eqn')
		.transition().delay(500)
		.attr('x', xEq(-1.1));	
	d3.selectAll('.myones')
		.transition().duration(500)
		.attr('x',function(d){return xEq(d);});
		
}