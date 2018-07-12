var G;

var output_strng;

function make_lattice64() {

    document.getElementById("graph_name").innerHTML = "<h3>Regular Lattice (node number: 64)</h3>"

    output_strng = "";
    document.getElementById("path_length_answer").innerHTML = output_strng;    

    d3.json("/jsons/lattice.json", function(error, graph) {

	if (error) throw error;

	// network construction
	G = new jsnx.Graph();

	var i;
	for (i=0; i < graph.nodes.length; i++) {
	    G.addNode(graph.nodes[i].name);
	};

	for (i = 0; i < graph.links.length; i++) {
	    G.addEdge(graph.links[i].source, graph.links[i].target);
	};

    });

    document.getElementById("comment").innerHTML = "<p>Regular Lattice (node number: 64) Generation Done.</p>"

};

function make_lattice16384() {

    document.getElementById("graph_name").innerHTML = "<h3>Regular Lattice (node number: 16384)</h3>"

    output_strng = "";
    document.getElementById("path_length_answer").innerHTML = output_strng;    

    d3.json("/jsons/lattice16384.json", function(error, graph) {

	if (error) throw error;

	// network construction
	G = new jsnx.Graph();

	var i;
	for (i=0; i < graph.nodes.length; i++) {
	    G.addNode(graph.nodes[i].name);
	};

	for (i = 0; i < graph.links.length; i++) {
	    G.addEdge(graph.links[i].source, graph.links[i].target);
	};

    });

    document.getElementById("comment").innerHTML = "<p>Regular Lattice (node number: 16384) Generation Done.</p>"

};

function make_lattice65536() {

    document.getElementById("graph_name").innerHTML = "<h3>Regular Lattice (node number: 65536)</h3>"

    output_strng = "";
    document.getElementById("path_length_answer").innerHTML = output_strng;    

    d3.json("/jsons/lattice65536.json", function(error, graph) {

	if (error) throw error;

	// network construction
	G = new jsnx.Graph();

	var i;
	for (i=0; i < graph.nodes.length; i++) {
	    G.addNode(graph.nodes[i].name);
	};

	for (i = 0; i < graph.links.length; i++) {
	    G.addEdge(graph.links[i].source, graph.links[i].target);
	};

    });

    document.getElementById("comment").innerHTML = "<p>Regular Lattice (node number: 65536) Generation Done.</p>"

};


function path_length_lattice(graph) {

    graph = G;

    var sourceNode = document.forms.path_length_for_lattice.sourceNodeLattice.value;
    var targetNode = document.forms.path_length_for_lattice.targetNodeLattice.value;

    // shortest path calcualtion
    var path = jsnx.shortestPath(graph, {source: Number(sourceNode), target: Number(targetNode)});
    var op_strng = "";
    path.forEach( function (item, key, mapObj) {
	op_strng += item + " ";
    });

    output_strng += "<p>The shortest path from Node " + sourceNode + " to Node " + targetNode + " is [ " + op_strng +  "], and the path length is " + (path.length-1) + ".</p>"
    
    document.getElementById("path_length_answer").innerHTML = output_strng;

};


function make_sf64() {

    document.getElementById("graph_name").innerHTML = "<h3>Scale-free Network (node number: 64)</h3>"

    output_strng = "";
    document.getElementById("path_length_answer").innerHTML = output_strng;    

    d3.json("/jsons/ba.json", function(error, graph) {

	if (error) throw error;

	// network construction
	G = new jsnx.Graph();

	var i;
	for (i=0; i < graph.nodes.length; i++) {
	    G.addNode(graph.nodes[i].name);
	};

	for (i = 0; i < graph.links.length; i++) {
	    G.addEdge(graph.links[i].source, graph.links[i].target);
	};

    });

    document.getElementById("comment").innerHTML = "<p>Scale-free Network (node number: 64) Generation Done.</p>"

};

function make_sf16384() {

    document.getElementById("graph_name").innerHTML = "<h3>Scale-free Network (node number: 16384)</h3>"

    output_strng = "";
    document.getElementById("path_length_answer").innerHTML = output_strng;    

    d3.json("/jsons/ba16384.json", function(error, graph) {

	if (error) throw error;

	// network construction
	G = new jsnx.Graph();

	var i;
	for (i=0; i < graph.nodes.length; i++) {
	    G.addNode(graph.nodes[i].name);
	};

	for (i = 0; i < graph.links.length; i++) {
	    G.addEdge(graph.links[i].source, graph.links[i].target);
	};

    });

    document.getElementById("comment").innerHTML = "<p>Scale-free Network (node number: 16384) Generation Done.</p>"

};

function make_sf65536() {

    document.getElementById("graph_name").innerHTML = "<h3>Scale-free Network (node number: 65536)</h3>"

    output_strng = "";
    document.getElementById("path_length_answer").innerHTML = output_strng;    

    d3.json("/jsons/ba65536.json", function(error, graph) {

	if (error) throw error;

	// network construction
	G = new jsnx.Graph();

	var i;
	for (i=0; i < graph.nodes.length; i++) {
	    G.addNode(graph.nodes[i].name);
	};

	for (i = 0; i < graph.links.length; i++) {
	    G.addEdge(graph.links[i].source, graph.links[i].target);
	};

    });

    document.getElementById("comment").innerHTML = "<p>Scale-free Network (node number: 65536) Generation Done.</p>"

};


function path_length_sf(graph) {

    graph = G;

    var sourceNode = document.forms.path_length_for_sf.sourceNodeSF.value;
    var targetNode = document.forms.path_length_for_sf.targetNodeSF.value;

    // shortest path calcualtion
    var path = jsnx.shortestPath(graph, {source: Number(sourceNode), target: Number(targetNode)});
    var op_strng = "";
    path.forEach( function (item, key, mapObj) {
	op_strng += item + " ";
    });

    output_strng += "<p>The shortest path from Node " + sourceNode + " to Node " + targetNode + " is [ " + op_strng +  "], and the path length is " + (path.length-1) + ".</p>"
    
    document.getElementById("path_length_answer").innerHTML = output_strng;

};
