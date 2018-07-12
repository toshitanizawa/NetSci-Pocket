var G = new jsnx.Graph();

function init_ba() {
    
    G.addNode(1, {color:'gray'});
    G.addNode(2, {color:'gray'});
    G.addNode(3, {color:'gray'});
    G.addEdgesFrom([[1,2], [1,3], [2,3]]);
    
    jsnx.draw(G, {
	element: '.net_pic',
	width: 500,
	height: 300,
	withLabels: true,
	labelStyle: {fill: 'white'},
	layoutAttr: {
	    charge:-500,
	    linkDistance: 100
	},
	nodeStyle: {
	    r: 20,
	    fill: function(d) { return d.data.color; }
	},
	edgeStyle: {
	    'stroke-width': 7,
	    fill: 'gray'
	}
    });
};

function add_one_node() {

    G.addNode(4,{color:'blue'});
    G.addEdgesFrom([[4,1],[4,2]]);
    jsnx.draw(G, {
	element: '.net_pic',
	width: 500,
	height: 300,
	withLabels: true,
	labelStyle: {fill: 'white'},
	layoutAttr: {
	    charge:-500,
	    linkDistance: 100
	},
	nodeStyle: {
	    r: 20,
	    fill: function(d) {return d.data.color;}
	},
	edgeStyle: {
	    'stroke-width': 7,
	    fill: 'gray'
	}
    });
};

function add_one_node_again() {

    G.addNode(5, {color:'red'});
    G.addEdgesFrom([[5,1],[5,2]]);
    jsnx.draw(G, {
	element: '.net_pic',
	width: 500,
	height: 300,
	withLabels: true,
	labelStyle: {fill: 'white'},
	layoutAttr: {
	    charge:-500,
	    linkDistance: 100
	},
	nodeStyle: {
	    r: 20,
	    fill: function(d) { return d.data.color; }
	},
	edgeStyle: {
	    'stroke-width': 7,
	    fill: 'gray'
	}
    });
};

function add_one_node_again_again() {

    G.addNode(6, {color:'green'});
    G.addEdgesFrom([[6,1],[6,2]]);
    jsnx.draw(G, {
	element: '.net_pic',
	width: 500,
	height: 300,
	withLabels: true,
	labelStyle: {fill: 'white'},
	layoutAttr: {
	    charge:-500,
	    linkDistance: 100
	},
	nodeStyle: {
	    r: 20,
	    fill: function(d) { return d.data.color; }
	},
	edgeStyle: {
	    'stroke-width': 7,
	    fill: 'gray'
	}
    });
};
