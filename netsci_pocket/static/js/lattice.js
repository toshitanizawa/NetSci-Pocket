d3.selectAll("svg").remove();

var force = d3.layout.force()
    .charge(-1000)
    .linkDistance(1)
    .linkStrength(10)
    .size([500, 500]);

var svg_cvs = d3.select(".net_pic").append("svg")
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
