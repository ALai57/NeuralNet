
var blockSize = 1;
		
svg.selectAll('.dataIn1').data(myData).enter()
	.append('rect')
	.attr('class','dataIn1')
	.attr('x',x(rWidth/4)-calcWidth(blockSize)/2)
	.attr('y',function (d,i) {return y(rHeight/2+blockSize*1.5*(i+1));})
	.attr( 'width',  calcWidth(blockSize))
	.attr('height', calcHeight(blockSize))
	.attr('fill','black');

svg.selectAll('.dataIn2').data(myData).enter()
	.append('rect')
	.attr('class','dataIn2')
	.attr('x',x(-rWidth/4)-calcWidth(1)/2)
	.attr('y',function (d,i) {return y(rHeight/2+blockSize*1.5*(i+1));})
	.attr( 'width', calcWidth(blockSize))
	.attr('height',calcHeight(blockSize))
	.attr('fill','black');
