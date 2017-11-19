		
						
													
	var x = d3.scaleLinear().domain([-2, 10])
							.range([0, wd]);
	var y = d3.scaleLinear().domain([5,-5])
							.range([0, ht]);
	
	// var x_inv = d3.scaleLinear().domain([0, wd])
							// .range([-2,10]);
	// var y_inv = d3.scaleLinear().domain([0, ht])
							// .range([5,-5]);
	
	// function translate(xIn,yIn){
		// return "translate(" + xIn + "," + yIn + ")";
	// }
	
	function translateRotate(xIn,yIn,rIn,wdth,hgt){
		return "translate(" + xIn + "," + yIn + ")" + "rotate(" + rIn + "," + wdth + "," + hgt + ")";;
	}
	
	// function calcWidth(w){
		// return Math.abs(x(w)-x(0));
	// }
	// function calcHeight(h){
		// return Math.abs(y(h)-y(0));
	// }

	
	
	
	
	
	