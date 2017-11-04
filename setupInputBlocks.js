

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////
// Create all blocks for inputs and outputs		
svg.selectAll('.dataIn1').data(myData).enter()
	.append('rect')
	.attr('class','dataIn1')
	.attr('id',function (d,i) {return 'blockInput1_'+i;})
	.attr('x',x(-rWidth/4)-calcWidth(blockSize)/2)
	.attr('y',function (d,i) {return y(rHeight/2+blockSize*1.5*(i+1));})
	.attr( 'width',  calcWidth(blockSize))
	.attr('height', calcHeight(blockSize))
	.attr('fill','black');

svg.selectAll('.dataIn2').data(myData).enter()
	.append('rect')
	.attr('class','dataIn2')
	.attr('id',function (d,i) {return 'blockInput2_'+i;})
	.attr('x',x(rWidth/4)-calcWidth(blockSize)/2)
	.attr('y',function (d,i) {return y(rHeight/2+blockSize*1.5*(i+1));})
	.attr( 'width', calcWidth(blockSize))
	.attr('height',calcHeight(blockSize))
	.attr('fill','black');

svg.selectAll('.dataOutput_True').data(myData).enter()
	.append('rect')
	.attr('class','dataOutput_True')
	.attr('id',function (d,i) {return 'blockOutputTrue_'+i;})
	.attr('x',x(rWidth*3/4)-calcWidth(blockSize)/2)
	.attr('y',function (d,i) {return y(rHeight/2+blockSize*1.5*(i+1));})
	.attr( 'width',  calcWidth(blockSize))
	.attr('height', calcHeight(blockSize))
	.attr('fill','blue');	

svg.selectAll('.dataOutput_Pred').data(myData).enter()
	.append('rect')
	.attr('class','dataOutput_Pred')
	.attr('id',function (d,i) {return 'blockOutputPred_'+i;})
	.attr('x',x(-blockSize/2))
	.attr('y',y(blockSize/2))
	.attr( 'width',  calcWidth(blockSize))
	.attr('height', calcHeight(blockSize))
	.attr('fill','blue');		
	
///////////////////////////////////////////////////////////////////////////////////	
///////////////////////////////////////////////////////////////////////////////////
// Create all text for inputs and outputs	
svg.selectAll('.dataIn1_txt').data(myData).enter()
	.append('text')
	.attr('class','dataIn1_txt')
	.attr('id',function (d,i){return 'txt1_'+i;})
	.attr('x',x(-rWidth/4))
	.attr('y',function (d,i) {return y(rHeight/2+blockSize*1.5*(i+1)-blockSize*0.5);})
	.text(function(d){return d.x1.toFixed(2);})	
	.attr('font-family','sans-serif')
	.attr('font-size','18px')
	.attr('fill','red')
	.style("text-anchor", "middle")
	.style("alignment-baseline", "middle");
	
svg.selectAll('.dataIn2_txt').data(myData).enter()
	.append('text')
	.attr('class','dataIn2_txt')
	.attr('id',function (d,i){return 'txt2_'+i;})
	.attr('x',x(rWidth/4))
	.attr('y',function (d,i) {return y(rHeight/2+blockSize*1.5*(i+1)-blockSize*0.5);})
	.text(function(d){return d.x2.toFixed(2);})	
	.attr('font-family','sans-serif')
	.attr('font-size','18px')
	.attr('fill','red')
	.style("text-anchor", "middle")
	.style("alignment-baseline", "middle");
	
svg.selectAll('.dataOutputTrue_txt').data(myData).enter()
	.append('text')
	.attr('class','dataOutputTrue_txt')
	.attr('id',function (d,i){return 'txtOutTrue_'+i;})
	.attr('x',x(rWidth*3/4))
	.attr('y',function (d,i) {return y(rHeight/2+blockSize*1.5*(i+1)-blockSize*0.5);})
	.text(function(d){return d.y_true.toFixed(2);})	
	.attr('font-family','sans-serif')
	.attr('font-size','18px')
	.attr('fill','black')
	.style("text-anchor", "middle")
	.style("alignment-baseline", "middle");

svg.selectAll('.dataOutputPred_txt').data(myData).enter()
	.append('text')
	.attr('class','dataOutputPred_txt')
	.attr('id',function (d,i){return 'txtOutPred_'+i;})
	.attr('x',x(0))
	.attr('y',y(0))
	.text(function(d){return d.y_pred.toFixed(2);})	
	.attr('font-family','sans-serif')
	.attr('font-size','18px')
	.attr('fill','black')
	.style("text-anchor", "middle")
	.style("alignment-baseline", "middle");	

///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////	
// FUNCTIONS FOR MOVING THE BLOCKS AND TEXT AROUND	
var ctr = 0;	
	
function advanceInputs(){
	
	for (n=ctr;n<myData.length;n++){
		advanceQueue(svg.select('#blockInput1_'+n));
		advanceQueue(svg.select('#blockInput2_'+n));			
		advanceQueue(svg.select('#blockOutputTrue_'+n));
		advanceQueue(svg.select('#txt1_'+n));
		advanceQueue(svg.select('#txt2_'+n));
		advanceQueue(svg.select('#txtOutTrue_'+n));
	}
	
	
	advanceThroughMachine(svg.select('#blockInput1_'+ctr));
	advanceThroughMachine(svg.select('#blockInput2_'+ctr));
	advanceThroughMachine(svg.select('#blockOutputTrue_'+ctr));
	advanceThroughMachine(svg.select('#txt1_'+ctr));
	advanceThroughMachine(svg.select('#txt2_'+ctr));
	var temp = advanceThroughMachine(svg.select('#txtOutTrue_'+ctr));	
	
	temp.on('end',function(d){return advanceOutputPrediction(ctr);})
	
	ctr++;
	
}

function advanceQueue(el){
	el.transition().duration(500)
		.attr('y',function (d,i) {	
				var currenty = 1*d3.select(this).attr("y");
				return currenty-y(blockSize*1.5)+y(0);}
			);
}

function advanceThroughMachine(el){
	return el.transition().duration(1000)
		.attr('y',function (d,i) {	
				var currenty = 1*d3.select(this).attr("y");
				return currenty-y(rHeight*1.5)+y(0);}
			);
}

function advanceOutputPrediction(n){
	d3.select('#blockOutputPred_'+n).transition().duration(250)
	.attr('x',x(rWidth*5/4)-calcWidth(blockSize)/2)
	.on('end', function (d) {
			d3.select('#blockOutputPred_'+n).transition().duration(250)
			.attr('y',function (d,i) {	
						var currenty = 1*d3.select('#blockOutputTrue_'+n).attr("y");
						return currenty-y(rHeight*1.5)+y(0); } );
				
				} );
					
					
	d3.select('#txtOutPred__'+n).transition().duration(250)
		.attr('x',x(rWidth*5/4))
		.on('end',function (d) {
				d3.select('#txtOutPred_'+n).transition().duration(250)
				.attr('y',function (d,i) {	
						var currenty = 1*d3.select('#txtOutTrue_'+n).attr("y");
						return currenty-y(rHeight*1.5)+y(0); })
				} );
					
}


	