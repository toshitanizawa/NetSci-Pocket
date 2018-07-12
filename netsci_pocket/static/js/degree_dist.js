var force = d3.layout.force()
    .charge(-200)
    .linkDistance(70)
    .size([500, 500]);

var svg_cvs = d3.select(".net_pic").append("svg")
	.attr("width", 500)
	.attr("height", 500)
	.attr("viewBox", "0 0 500 500");

function draw_lattice() {

    document.getElementById("graph_name").innerHTML="<h3>A Regular Lattice</h3>"
    
    d3.selectAll("svg").remove();

    force.charge(-1000)
	.linkDistance(1)
	.linkStrength(10)
	.size([500, 500]);

    svg_cvs = d3.select(".net_pic").append("svg")
	.attr("width", 500)
	.attr("height", 500)
	.attr("viewBox", "0 0 500 500");
    
    d3.json("/jsons/lattice.json", function(error, graph) {
	
	if (error) throw error;
	
	force
	    .nodes(graph.nodes)
	    .links(graph.links)
	    .start();
	
	var link = svg_cvs.selectAll(".link")
	    .data(graph.links)
	    .enter().append("line")
	    .attr("class", "link")
	    .style("stroke", "#999")
	    .style("stroke-width", "2")
	    .style("stroke-opacity", ".6");
	
	var node = svg_cvs.selectAll(".node")
	    .data(graph.nodes)
	    .enter().append("circle")
	    .attr("class", "node")
	    .attr("r", 7)
	    .style("fill", "brown")
	    .call(force.drag);
	
	node.append("title")
	    .text(function(d) { return d.name; });
	
	force.on("tick", function() {
	    link.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; });
	    
	    node.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; });
	});
    });
};

function draw_sf() {

    document.getElementById("graph_name").innerHTML="<h3>A Scale-free Network</h3>"
    
    d3.selectAll("svg").remove();
    
    force.charge(-200)
	.linkDistance(70)
	.linkStrength(1)
	.size([500, 500]);
    
    svg_cvs = d3.select(".net_pic").append("svg")
	.attr("width", 500)
	.attr("height", 500)
	.attr("viewBox", "0 0 500 500");
    
    d3.json("/jsons/ba.json", function(error, graph) {
	
	if (error) throw error;
	
	force
	    .nodes(graph.nodes)
	    .links(graph.links)
	    .start();
	
	var link = svg_cvs.selectAll(".link")
	    .data(graph.links)
	    .enter().append("line")
	    .attr("class", "link")
	    .style("stroke-width", "2");
	
	var node = svg_cvs.selectAll(".node")
	    .data(graph.nodes)
	    .enter().append("circle")
	    .attr("class", "node")
	    .attr("r", 7)
	    .style("fill", "brown")
	    .call(force.drag);
	
	node.append("title")
	    .text(function(d) { return d.name; });
	
	force.on("tick", function() {
	    link.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; });
	    
	    node.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; });
	});
    });
};


function deg_dist_ba() {
    
    d3.select("svg").remove();

    draw_sf();
    document.getElementById("graph_name").innerHTML="<h3>Degree Distribution of a Scale-free Network</h3>"
    
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

    var deg_dist_chart = d3.select(".graph_pic").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("/jsons/ba_deg_dist.tsv", function(error, data) {
	if (error) throw error;

	data.forEach(function(d) {
	    d.Degree = +d.Degree;
	    d.Frequency = +d.Frequency;
	});

	x.domain(d3.extent(data, function(d) { return d.Degree; })).nice();
	y.domain(d3.extent(data, function(d) { return d.Frequency; })).nice();
	
	deg_dist_chart.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("x", width)
	    .attr("y", -6)
	    .style("text-anchor", "end")
	    .style("font", "20px")
	    .text("Degree");
	
	deg_dist_chart.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Frequency");

	deg_dist_chart.selectAll(".dot")
	    .data(data)
	    .enter().append("circle")
	    .attr("class", "dot")
	    .attr("r", 10)
	    .attr("cx", function(d) { return x(d.Degree); })
	    .attr("cy", function(d) { return y(d.Frequency); })
	    .attr("fill", "green");
    });
};

function deg_dist_ba_log() {
    
    d3.select("svg").remove();

    draw_sf();
    document.getElementById("graph_name").innerHTML="<h3>Degree Distribution of a Scale-free Network (log-log scale)</h3>"
    
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
	.ticks(10,0);

    var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.ticks(10,0);

    var deg_dist_chart = d3.select(".graph_pic").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("/jsons/ba_deg_dist.tsv", function(error, data) {
	if (error) throw error;

	data.forEach(function(d) {
	    d.Degree = +d.Degree;
	    d.Frequency = +d.Frequency;
	});

	x.domain(d3.extent(data, function(d) { return d.Degree; })).nice();
	y.domain(d3.extent(data, function(d) { return d.Frequency; })).nice();
	
	deg_dist_chart.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("x", width)
	    .attr("y", -6)
	    .style("text-anchor", "end")
	    .style("font", "20px")
	    .text("Degree");
	
	deg_dist_chart.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Frequency");

	deg_dist_chart.selectAll(".dot")
	    .data(data)
	    .enter().append("circle")
	    .attr("class", "dot")
	    .attr("r", 10)
	    .attr("cx", function(d) { return x(d.Degree); })
	    .attr("cy", function(d) { return y(d.Frequency); })
	    .attr("fill", "red");
    });
};

function deg_dist_lattice() {
    
    d3.select("svg").remove();

    draw_lattice();
    document.getElementById("graph_name").innerHTML="<h3>Degree Distribution of a Regular Lattice</h3>"
    
    var margin = {top: 20, right:20, bottom: 30, left: 40},
	width = 650 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;

    var x = d3.scale.linear()
	.domain([1, 10])
	.range([0, width]);

    var y = d3.scale.linear()
	.domain([0, 70])
	.range([height, 0]);

    var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");

    var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

    var deg_dist_chart = d3.select(".graph_pic").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("/jsons/lattice_deg_dist.tsv", function(error, data) {
	if (error) throw error;

	data.forEach(function(d) {
	    d.Degree = +d.Degree;
	    d.Frequency = +d.Frequency;
	});

	// x.domain(d3.extent(data, function(d) { return d.Degree; })).nice();
	// y.domain(d3.extent(data, function(d) { return d.Frequency; })).nice();
	
	deg_dist_chart.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("x", width)
	    .attr("y", -6)
	    .style("text-anchor", "end")
	    .text("Degree");
	
	deg_dist_chart.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Frequency");

	deg_dist_chart.selectAll(".dot")
	    .data(data)
	    .enter().append("circle")
	    .attr("class", "dot")
	    .attr("r", 10)
	    .attr("cx", function(d) { return x(d.Degree); })
	    .attr("cy", function(d) { return y(d.Frequency); })
	    .attr("fill", "green");
    });
};

function deg_dist_ba_large() {
    
    d3.selectAll("svg").remove();
    document.getElementById("graph_name").innerHTML="<h3>Degree Distribution of a Large Scale-free Network</h3>"
    
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

    var deg_dist_chart = d3.select(".net_pic").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("/jsons/ba_large_deg_dist.tsv", function(error, data) {
	if (error) throw error;

	data.forEach(function(d) {
	    d.Degree = +d.Degree;
	    d.Frequency = +d.Frequency;
	});

	x.domain(d3.extent(data, function(d) { return d.Degree; })).nice();
	y.domain(d3.extent(data, function(d) { return d.Frequency; })).nice();
	
	deg_dist_chart.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("x", width)
	    .attr("y", -6)
	    .style("text-anchor", "end")
	    .style("font", "20px")
	    .text("Degree");
	
	deg_dist_chart.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Frequency");

	deg_dist_chart.selectAll(".dot")
	    .data(data)
	    .enter().append("circle")
	    .attr("class", "dot")
	    .attr("r", 10)
	    .attr("cx", function(d) { return x(d.Degree); })
	    .attr("cy", function(d) { return y(d.Frequency); })
	    .attr("fill", "green");
    });
};

function deg_dist_ba_large_log() {
    
    d3.selectAll("svg").remove();

    document.getElementById("graph_name").innerHTML="<h3>Degree Distribution of a Large Scale-free Network (log-log scale)</h3>"
    
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
	.ticks(10,0);

    var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.ticks(10,0);

    var deg_dist_chart = d3.select(".net_pic").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("/jsons/ba_large_deg_dist.tsv", function(error, data) {
	if (error) throw error;

	data.forEach(function(d) {
	    d.Degree = +d.Degree;
	    d.Frequency = +d.Frequency;
	});

	x.domain(d3.extent(data, function(d) { return d.Degree; })).nice();
	y.domain(d3.extent(data, function(d) { return d.Frequency; })).nice();
	
	deg_dist_chart.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("x", width)
	    .attr("y", -6)
	    .style("text-anchor", "end")
	    .style("font", "20px")
	    .text("Degree");
	
	deg_dist_chart.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Frequency");

	deg_dist_chart.selectAll(".dot")
	    .data(data)
	    .enter().append("circle")
	    .attr("class", "dot")
	    .attr("r", 10)
	    .attr("cx", function(d) { return x(d.Degree); })
	    .attr("cy", function(d) { return y(d.Frequency); })
	    .attr("fill", "red");
    });
};

function deg_dist_lattice() {
    
    d3.select("svg").remove();

    draw_lattice();
    document.getElementById("graph_name").innerHTML="<h3>Degree Distribution of a Regular Lattice</h3>"
    
    var margin = {top: 20, right:20, bottom: 30, left: 40},
	width = 650 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;

    var x = d3.scale.linear()
	.domain([1, 10])
	.range([0, width]);

    var y = d3.scale.linear()
	.domain([0, 70])
	.range([height, 0]);

    var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");

    var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

    var deg_dist_chart = d3.select(".graph_pic").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("/jsons/lattice_deg_dist.tsv", function(error, data) {
	if (error) throw error;

	data.forEach(function(d) {
	    d.Degree = +d.Degree;
	    d.Frequency = +d.Frequency;
	});

	// x.domain(d3.extent(data, function(d) { return d.Degree; })).nice();
	// y.domain(d3.extent(data, function(d) { return d.Frequency; })).nice();
	
	deg_dist_chart.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("x", width)
	    .attr("y", -6)
	    .style("text-anchor", "end")
	    .text("Degree");
	
	deg_dist_chart.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	    .append("text")
	    .attr("class", "label")
	    .attr("transform", "rotate(-90)")
	    .attr("y", 6)
	    .attr("dy", ".71em")
	    .style("text-anchor", "end")
	    .text("Frequency");

	deg_dist_chart.selectAll(".dot")
	    .data(data)
	    .enter().append("circle")
	    .attr("class", "dot")
	    .attr("r", 10)
	    .attr("cx", function(d) { return x(d.Degree); })
	    .attr("cy", function(d) { return y(d.Frequency); })
	    .attr("fill", "green");
    });
}
