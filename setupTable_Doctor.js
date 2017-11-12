
function tabulate(data, columns) {
	var table = d3.select("#TableOut").append("table")
			.attr("style", "margin-left: 250px"),
		thead = table.append("thead"),
		tbody = table.append("tbody");

	// append the header row
	thead.append("tr")
		.selectAll("th")
		.data(columns)
		.enter()
		.append("th")
			.text(function(column) { return column; });

	// create a row for each object in the data
	var rows = tbody.selectAll("tr")
		.data(data)
		.enter()
		.append("tr")
		.attr('id',function (d,i) {return 'data' + i;});

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
			<!-- .html(function(d) { return d.value.toFixed(2); }); -->
	
	return table;
}

function updateTable(c){
	
	// for (i=0;i<=c&&i<=9;i++){
		// d3.select("#data"+i%9).selectAll("td")
			// .data([myData[i%9].x1,
				   // myData[i%9].x2,
				   // myData[i%9].y_true])
			// .html(function(d) { return d.toFixed(2); });
	// }
	
		d3.select("#data"+c%10).selectAll("td")
			.data([myData[c%10].x1,
				   myData[c%10].x2,
				   myData[c%10].y_true])
			.html(function(d) { return d.toFixed(2); });

}

var dataTable = tabulate(myData, ["x1", "x2", "y_true"]);
