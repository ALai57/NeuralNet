		
	// var myData = [
	// {"x1": 2.781083600, "x2":  2.550537003, "y_true":  0, "y_pred":  0},
	// {"x1": 1.465489372, "x2":  2.362125076, "y_true":  0, "y_pred":  0},
	// {"x1": 3.396561688, "x2":  4.400293529, "y_true":  0, "y_pred":  0},
	// {"x1": 1.388070190, "x2":  1.850220317, "y_true":  0, "y_pred":  0},
	// {"x1": 3.064072320, "x2":  3.005305973, "y_true":  0, "y_pred":  0},
	// {"x1": 7.627531214, "x2":  2.759262235, "y_true":  1, "y_pred":  0},
	// {"x1": 5.332441248, "x2":  2.088626775, "y_true":  1, "y_pred":  0},
	// {"x1": 6.922596716, "x2":  1.771063670, "y_true":  1, "y_pred":  0},
	// {"x1": 8.675418651, "x2": -0.242068655, "y_true":  1, "y_pred":  0},
	// {"x1": 7.673756466, "x2":  3.508563011, "y_true":  1, "y_pred":  0},			
	// ];
	
	
	// var wd = 400;
	// var ht = 400;
	
	var svg = d3.select('#NetworkGraph').append("svg")
										.style("width",wd)
										.style("height",ht)
										.style("float","left");									
													
	var x = d3.scaleLinear().domain([-5, 5])
							.range([0, wd]);
	var y = d3.scaleLinear().domain([5,-5])
							.range([0, ht]);
	
							
	var x_inv = d3.scaleLinear().domain([0, wd])
							.range([-5,5]);
	var y_inv = d3.scaleLinear().domain([0, ht])
							.range([5,-5]);
	
	function translate(xIn,yIn){
		return "translate(" + xIn + "," + yIn + ")";
	}
	
	function translateRotate(xIn,yIn,rIn,wdth,hgt){
		return "translate(" + xIn + "," + yIn + ")" + "rotate(" + rIn + "," + wdth + "," + hgt + ")";;
	}
	
	function calcWidth(w){
		return Math.abs(x(w)-x(0));
	}
	function calcHeight(h){
		return Math.abs(y(h)-y(0));
	}
	
	// Make Axis if wanted
	<!-- var xAxis = d3.axisBottom(x); -->
	<!-- var yAxis = d3.axisLeft(y); -->
	<!-- svg.append("g")		 -->
		<!-- .attr("class","axis") -->
		<!-- .attr("transform","translate(0, " + y(0) + ")") -->
		<!-- .call(xAxis); -->
		
	<!-- svg.append("g") -->
		<!-- .attr("class","axis") -->
		<!-- .attr("transform","translate(" + x(0) + ",0)") -->
		<!-- .call(yAxis); -->
							

	
	
	
	
	
	