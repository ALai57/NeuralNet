
function tabulate(divID, data, columns) {
	var table = d3.select(divID)
				  .selectAll(".ANN_Table")
				  .append("table")
				  .attr("style", "margin-left: 250px"),
		thead =   table.append("thead"),
		tbody =   table.append("tbody");

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
	
	return table;
}

function updateTable(c){
	d3.select("#data"+c%10).selectAll("td")
		.data([myData[c%10].T,
			   myData[c%10].HR,
			   myData[c%10].S_true])
		.html(function(d) { return d.toFixed(2); });	
}
