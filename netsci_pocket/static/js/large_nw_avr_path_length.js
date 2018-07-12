
function avr_path_length_large_network() {

    d3.selectAll("svg").remove();
    
    document.getElementById("graph_title_lattice").innerHTML="<h3>Average Path Length between Nodes in a Regular Lattice</h3> <p>The plot of the average path length between nodes as a function of the total node number.</p>"
    
    var margin = {top: 20, right:20, bottom: 30, left: 40},
	width = 650 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;

    var x = d3.scale.linear()
	.range([0, width]);

    var y = d3.scale.linear()
	.range([height, 0]);

    var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");

    var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");
    
    var avr_path_lattice_chart = d3.select(".graph_pic_lattice").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("/jsons/lattice_avr_path.tsv", function(error, data) {
	if (error) throw error;

	data.forEach(function(d) {
	    d.Total_Nodes = +d.Total_Nodes;
	    d.Avr_Path_Length = +d.Avr_Path_Length;
	});

	x.domain(d3.extent(data, function(d) { return d.Total_Nodes; })).nice();
	y.domain(d3.extent(data, function(d) { return d.Avr_Path_Length; })).nice();
	
	avr_path_lattice_chart.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("x", width)
	    .attr("y", -6)
	    .style("text-anchor", "end")
	    .style("font", "20px")
	    .text("Total Nodes");
	
	avr_path_lattice_chart.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Avrage Path Length");

	avr_path_lattice_chart.selectAll(".dot")
	    .data(data)
	    .enter().append("circle")
	    .attr("class", "dot")
	    .attr("r", 10)
	    .attr("cx", function(d) { return x(d.Total_Nodes); })
	    .attr("cy", function(d) { return y(d.Avr_Path_Length); })
	    .attr("fill", "green");
    });

    document.getElementById("graph_title_sf").innerHTML="<h3>Average Path Length between Nodes in a Scale-free Network</h3> <p>The plot of the average path length between nodes as a function of the total node number.</p>"
    
    var avr_path_sf_chart = d3.select(".graph_pic_sf").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("/jsons/ba_avr_path.tsv", function(error, data) {
	if (error) throw error;

	data.forEach(function(d) {
	    d.Total_Nodes = +d.Total_Nodes;
	    d.Avr_Path_Length = +d.Avr_Path_Length;
	});

	x.domain(d3.extent(data, function(d) { return d.Total_Nodes; })).nice();
	y.domain(d3.extent(data, function(d) { return d.Avr_Path_Length; })).nice();
	
	avr_path_sf_chart.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("x", width)
	    .attr("y", -6)
	    .style("text-anchor", "end")
	    .style("font", "20px")
	    .text("Total Nodes");
	
	avr_path_sf_chart.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Avrage Path Length");

	avr_path_sf_chart.selectAll(".dot")
	    .data(data)
	    .enter().append("circle")
	    .attr("class", "dot")
	    .attr("r", 10)
	    .attr("cx", function(d) { return x(d.Total_Nodes); })
	    .attr("cy", function(d) { return y(d.Avr_Path_Length); })
	    .attr("fill", "red");
    });
    
};

function avr_path_length_large_network_log() {
    
    document.getElementById("graph_title_lattice").innerHTML="<h3>Average Path Length between Nodes in a Regular Lattice</h3> <p>The log-log plot of the average path length between nodes as a function of the total node number.</p>"
    
    var margin = {top: 20, right:20, bottom: 30, left: 40},
	width = 650 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;

    var x = d3.scale.log()
	.range([0, width]);

    var y = d3.scale.log()
	.range([height, 0]);

    var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.ticks(10, 0);

    var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.ticks(10, 0);
    
    var avr_path_lattice_chart = d3.select(".graph_pic_lattice").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("/jsons/lattice_avr_path.tsv", function(error, data) {
	if (error) throw error;

	data.forEach(function(d) {
	    d.Total_Nodes = +d.Total_Nodes;
	    d.Avr_Path_Length = +d.Avr_Path_Length;
	});

	x.domain(d3.extent(data, function(d) { return d.Total_Nodes; })).nice();
	y.domain(d3.extent(data, function(d) { return d.Avr_Path_Length; })).nice();
	
	avr_path_lattice_chart.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("x", width)
	    .attr("y", -6)
	    .style("text-anchor", "end")
	    .style("font", "20px")
	    .text("Total Nodes");
	
	avr_path_lattice_chart.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Avrage Path Length");

	avr_path_lattice_chart.selectAll(".dot")
	    .data(data)
	    .enter().append("circle")
	    .attr("class", "dot")
	    .attr("r", 10)
	    .attr("cx", function(d) { return x(d.Total_Nodes); })
	    .attr("cy", function(d) { return y(d.Avr_Path_Length); })
	    .attr("fill", "green");
    });

    document.getElementById("graph_title_sf").innerHTML="<h3>Average Path Length between Nodes in a Scale-free Network</h3> <p>The log-log plot of the average path length between nodes as a function of the total node number.</p>"
    
    var avr_path_sf_chart = d3.select(".graph_pic_sf").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("/jsons/ba_avr_path.tsv", function(error, data) {
	if (error) throw error;

	data.forEach(function(d) {
	    d.Total_Nodes = +d.Total_Nodes;
	    d.Avr_Path_Length = +d.Avr_Path_Length;
	});

	x.domain(d3.extent(data, function(d) { return d.Total_Nodes; })).nice();
	y.domain(d3.extent(data, function(d) { return d.Avr_Path_Length; })).nice();
	
	avr_path_sf_chart.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("x", width)
	    .attr("y", -6)
	    .style("text-anchor", "end")
	    .style("font", "20px")
	    .text("Total Nodes");
	
	avr_path_sf_chart.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Avrage Path Length");

	avr_path_sf_chart.selectAll(".dot")
	    .data(data)
	    .enter().append("circle")
	    .attr("class", "dot")
	    .attr("r", 10)
	    .attr("cx", function(d) { return x(d.Total_Nodes); })
	    .attr("cy", function(d) { return y(d.Avr_Path_Length); })
	    .attr("fill", "red");
    });
    
};
