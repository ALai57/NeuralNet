
// var blockSize = 1;
		
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

var ctr = 0;	
	
function advanceInputs(){
	
	for (n=ctr;n<myData.length;n++){
	svg.select('#blockInput1_'+n)
		.transition().duration(500)
		.attr('y',function (d,i) {
				var currenty = 1*d3.select(this).attr("y");
				return currenty-y(blockSize*1.5)+y(0);}
			);
	svg.select('#blockInput2_'+n)
		.transition().duration(500)
		.attr('y',function (d,i) {	
				var currenty = 1*d3.select(this).attr("y");
				return currenty-y(blockSize*1.5)+y(0);}
			);
	svg.select('#txt1_'+n)
		.transition().duration(500)
		.attr('y',function (d,i) {	
				var currenty = 1*d3.select(this).attr("y");
				return currenty-y(blockSize*1.5)+y(0);}
			);
	svg.select('#txt2_'+n)
		.transition().duration(500)
		.attr('y',function (d,i) {	
				var currenty = 1*d3.select(this).attr("y");
				return currenty-y(blockSize*1.5)+y(0);}
			);
	}
	
	processNextInput();
	
	ctr++;
	
}

function processNextInput(){
	
	svg.select('#blockInput1_'+ctr)
		.transition().duration(1000)
		.attr('y',function (d,i) {
				var currenty = 1*d3.select(this).attr("y");
				return currenty-y(rHeight*1.5)+y(0);}
			);
	svg.select('#blockInput2_'+ctr)
		.transition().duration(1000)
		.attr('y',function (d,i) {	
				var currenty = 1*d3.select(this).attr("y");
				return currenty-y(rHeight*1.5)+y(0);}
			);
	svg.select('#txt1_'+ctr)
		.transition().duration(1000)
		.attr('y',function (d,i) {	
				var currenty = 1*d3.select(this).attr("y");
				return currenty-y(rHeight*1.5)+y(0);}
			);
	svg.select('#txt2_'+ctr)
		.transition().duration(1000)
		.attr('y',function (d,i) {	
				var currenty = 1*d3.select(this).attr("y");
				return currenty-y(rHeight*1.5)+y(0);}
			);
}	


// svg.selectAll('.dataIn1')
	// .transition().duration(500)
	// .attr('y',function (d,i) {	
			// return y(rHeight/2+blockSize*1.5*(i-ctr));}
		// );
// svg.selectAll('.dataIn2')
	// .transition().duration(500)
	// .attr('y',function (d,i) {	
			// return y(rHeight/2+blockSize*1.5*(i-ctr));}
		// );
// svg.selectAll('.dataIn1_txt')
	// .transition().duration(500)
	// .attr('y',function (d,i) {	
			// return y(rHeight/2+blockSize*1.5*(i-ctr)-blockSize*0.5);}
		// );
// svg.selectAll('.dataIn2_txt')
	// .transition().duration(500)
	// .attr('y',function (d,i) {	
			// return y(rHeight/2+blockSize*1.5*(i-ctr)-blockSize*0.5);}
		// );
// ctr++;




	