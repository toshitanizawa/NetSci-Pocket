var force = d3.layout.force();

var svg_cvs = d3.select(".net_pic").append("svg")
	.attr("width", 500)
	.attr("height", 500)
	.attr("viewBox", "0 0 500 500");

var G;

function draw_lattice() {
    
    document.getElementById("comment_region_sp").innerHTML = "";
    document.getElementById("graph_name").innerHTML="<h3>Regular Lattice</h3>";
    
    d3.selectAll("svg").remove();

    force.charge(-1000)
	.linkDistance(1)
	.linkStrength(10)
	.size([500, 500])
	.start();

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
	    .style("stroke", "Olive")
	    .style("stroke-width", "2")
	    .style("stroke-opacity", ".6");
	
	var node = svg_cvs.selectAll(".node")
	    .data(graph.nodes)
	    .enter().append("circle")
	    .attr("class", "node")
	    .attr("r", 15)
	    .style("fill", "GoldenRod")
	    .style("stroke-width", "3")
	    .style("stroke", "SaddleBrown")
	    .call(force.drag);
	
	var nodelabels = svg_cvs.selectAll(".nodelabel")
	    .data(graph.nodes)
	    .enter()
	    .append("text")
	    .attr({"x":function(d){ return d.x; },
		   "y":function(d){ return d.y; },
		   "class":"nodelabel",
		   "stroke":"MidnightBlue"})
	    .text(function(d){ return d.name; });
	
	
	// node.append("title")
	//     .text(function(d) { return d.name; });
	
	force.on("tick", function() {
	    link.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; });
	    
	    node.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; });

	    nodelabels.attr("x", function(d) { return d.x; })
		.attr("y", function(d) { return d.y; });
	    
	});
	
    });

};

function avr_path_lattice() {
    
    d3.json("/jsons/lattice.json", function(error, d) {

	if (error) throw error;

	G = new jsnx.Graph();

	var i;
	for (i = 0; i < d.nodes.length; i++) {
	    G.addNode(d.nodes[i].name);
	};

	for (i = 0; i < d.links.length; i++) {
	    G.addEdge(d.links[i].source, d.links[i].target);
	};

	var path_length_array = jsnx.allPairsShortestPathLength(G);
	var path_length = 0, node_cnt = 0;

	path_length_array.forEach( function (item, key, mapObj) {
	    
	    item.forEach( function (item2, key2, mapObj2) {
		node_cnt++;
		path_length += item2;
	    });
	});
	
	document.getElementById("comment_region_sp").innerHTML = "<p>The average path length of this regular lattice is " + path_length/node_cnt + ".</p>";
	
    });
    
};

function path_length_lattice() {

    var sourceNode = document.forms.path_length_for_lattice.sourceNodeLattice.value;
    var targetNode = document.forms.path_length_for_lattice.targetNodeLattice.value;

    var svg_cvs = d3.select(".net_pic").transition();
    
    d3.json("/jsons/lattice.json", function(error, graph) {
	
	if (error) throw error;

	// network costruction
	G = new jsnx.Graph();

	var i;
	for (i = 0; i < graph.nodes.length; i++) {
	    G.addNode(graph.nodes[i].name);
	};

	for (i = 0; i < graph.links.length; i++) {
	    G.addEdge(graph.links[i].source, graph.links[i].target);
	};
	// shortest path calcualtion
	var path = jsnx.shortestPath(G, {source: Number(sourceNode), target: Number(targetNode)});
	var op_strng = "";
	path.forEach( function (item, key, mapObj) {
	    op_strng += item + " ";
	});
	
	var link = svg_cvs.selectAll(".link")
	    .style("stroke", function(d) {
		var in_i, in_source, in_target;
		for (in_i = 0; in_i < (path.length-1); in_i++) {
		    in_source = path[in_i];
		    in_target = path[in_i+1];

		    if ( (d.source.name == in_source && d.target.name == in_target) || (d.source.name == in_target && d.target.name == in_source) ){
			return "Black";
		    }
		};
		return "LightGray";
	    })
	    .style("stroke-width", function(d) {
		var in_i, in_source, in_target;
		for (in_i = 0; in_i < (path.length-1); in_i++) {
		    in_source = path[in_i];
		    in_target = path[in_i+1];

		    if ( (d.source.name == in_source && d.target.name == in_target) || (d.source.name == in_target && d.target.name == in_source) ){
			return "5";
		    }
		};
		return "2";
	    })
	
	var node = svg_cvs.selectAll(".node")
	    .attr("r", function(d) { if (d.name == sourceNode) { return 15; }
				     else if (d.name == targetNode) { return 15; }
				     else { return 5; } })
	    .style("fill", function(d) { if (d.name == sourceNode) { return "SkyBlue"; }
					else if (d.name == targetNode) { return "Salmon"; }
					 else { return "LightGray"; }})
	    .style("stroke-width", "0")
	
	document.getElementById("path_length_lattice_answer").innerHTML = "<p>The shortest path is [ " + op_strng +  "], and the path length is " + (path.length-1) + ".</p>"
	
    });
    

};


function draw_sf() {

    document.getElementById("comment_region_sp").innerHTML = "";
    document.getElementById("graph_name").innerHTML="<h3>Scale-free Network</h3>";
    
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
	    .style("stroke", "Olive")
	    .style("stroke-width", "2")
	    .style("stroke-opacity", ".6");
	
	var node = svg_cvs.selectAll(".node")
	    .data(graph.nodes)
	    .enter().append("circle")
	    .attr("class", "node")
	    .attr("r", 15)
	    .style("fill", "GoldenRod")
	    .style("stroke-width", "3")
	    .style("stroke", "SaddleBrown")
	    .call(force.drag);
	
	var nodelabels = svg_cvs.selectAll(".nodelabel")
	    .data(graph.nodes)
	    .enter()
	    .append("text")
	    .attr({"x":function(d){ return d.x; },
		   "y":function(d){ return d.y; },
		   "class":"nodelabel",
		   "stroke":"MidnightBlue"})
	    .text(function(d){ return d.name; });
	
	// node.append("title")
	//     .text(function(d) { return d.name; });
	
	force.on("tick", function() {
	    link.attr("x1", function(d) { return d.source.x; })
		.attr("y1", function(d) { return d.source.y; })
		.attr("x2", function(d) { return d.target.x; })
		.attr("y2", function(d) { return d.target.y; });
	    
	    node.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; });

	    nodelabels.attr("x", function(d) { return d.x; })
		.attr("y", function(d) { return d.y; });
	    
	});
    });
};

function avr_path_sf() {
    
    d3.json("/jsons/ba.json", function(error, d) {

	if (error) throw error;

	G = new jsnx.Graph();

	var i, node;
	for (i = 0; i < d.nodes.length; i++) {
	    G.addNode(d.nodes[i].name);
	};

	var link, source, target;
	for (i = 0; i < d.links.length; i++) {
	    G.addEdge(d.links[i].source, d.links[i].target);
	};

	var path_length_array = jsnx.allPairsShortestPathLength(G);
	var path_length = 0, node_cnt = 0;

	path_length_array.forEach( function (item, key, mapObj) {
	    
	    item.forEach( function (item2, key2, mapObj2) {
		node_cnt++;
		path_length += item2;
	    });
	});
	
	document.getElementById("comment_region_sp").innerHTML = "<p>The average path length of this scale-free network is " + path_length/node_cnt + ".</p>";
	
    });
	

	
};

function path_length_sf() {

    var sourceNode = document.forms.path_length_for_sf.sourceNodeSF.value;
    var targetNode = document.forms.path_length_for_sf.targetNodeSF.value;

    var svg_cvs = d3.select(".net_pic").transition();
    
    d3.json("/jsons/ba.json", function(error, graph) {
	
	if (error) throw error;

	// network costruction
	G = new jsnx.Graph();

	var i;
	for (i = 0; i < graph.nodes.length; i++) {
	    G.addNode(graph.nodes[i].name);
	};

	for (i = 0; i < graph.links.length; i++) {
	    G.addEdge(graph.links[i].source, graph.links[i].target);
	};
	// shortest path calculation
	var path = jsnx.shortestPath(G, {source: Number(sourceNode), target: Number(targetNode)});
	var op_strng = "";
	path.forEach( function (item, key, mapObj) {
	    op_strng += item + " ";
	});
	
	var link = svg_cvs.selectAll(".link")
	    .style("stroke", function(d) {
		var in_i, in_source, in_target;
		for (in_i = 0; in_i < (path.length-1); in_i++) {
		    in_source = path[in_i];
		    in_target = path[in_i+1];

		    if ( (d.source.name == in_source && d.target.name == in_target) || (d.source.name == in_target && d.target.name == in_source) ){
			return "Black";
		    }
		};
		return "LightGray";
	    })
	    .style("stroke-width", function(d) {
		var in_i, in_source, in_target;
		for (in_i = 0; in_i < (path.length-1); in_i++) {
		    in_source = path[in_i];
		    in_target = path[in_i+1];

		    if ( (d.source.name == in_source && d.target.name == in_target) || (d.source.name == in_target && d.target.name == in_source) ){
			return "5";
		    }
		};
		return "2";
	    })
	
	var node = svg_cvs.selectAll(".node")
	    .attr("r", function(d) { if (d.name == sourceNode) { return 15; }
				     else if (d.name == targetNode) { return 15; }
				     else { return 5; } })
	    .style("fill", function(d) { if (d.name == sourceNode) { return "SkyBlue"; }
					else if (d.name == targetNode) { return "Salmon"; }
					 else { return "LightGray"; }})
	    .style("stroke-width", "0")
	
	document.getElementById("path_length_sf_answer").innerHTML = "<p>The shortest path is [ " + op_strng +  "], and the path length is " + (path.length-1) + ".</p>"
	
    });

};

	    
