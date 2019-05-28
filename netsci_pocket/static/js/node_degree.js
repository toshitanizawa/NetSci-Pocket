var G = new jsnx.Graph();

G.addNodesFrom([1, 2, 3, 4, 5, 6]);
G.addEdgesFrom([[1,2], [1,4], [1,5]]);
G.addEdgesFrom([[2, 3], [2,5]]);
G.addEdgesFrom([[3, 4], [3,5]]);
G.addEdge(5,6)

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
    nodeAttr: {
	r: 20
    },
    edgeStyle: {
	'stroke-width': 7,
	fill: 'gray'
    }
});
