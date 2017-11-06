
var z = d3.scaleLinear().domain([-7,7])
							.range([0, 100]);
var z_inv = d3.scaleLinear().domain([0, 100])
						.range([-7,7]);

function setupSlider(n) {
	var newSlider = d3.slider()
			.value(z(myWeights[n].t))
			.orientation("vertical")
			.on("slide",
				function (val){
					myGears[n].r   = g_inv(val);	
					myWeights[n].t = z_inv(val);
					
					positionGears(svg.selectAll('image').data(myGears));
					forwardPropagate(myData,myWeights);
					// updateTable(c);
					updateBlocks(ctr);
									
				});
				
	return newSlider;
}

d3.select('#slider1').call( setupSlider(0) );
d3.select('#slider2').call( setupSlider(1) );
d3.select('#slider3').call( setupSlider(2) );
d3.select('#slider4').call( setupSlider(3) );
d3.select('#slider5').call( setupSlider(4) );
d3.select('#slider6').call( setupSlider(5) );
	

