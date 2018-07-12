var G = new jsnx.Graph();

G.addWeightedEdgesFrom([[2, 3, 10]]);
G.addStar([3,4,5,6], {weight: 5});
G.addStar([2,1,0,-1], {weight: 3});

G.addEdgesFrom([[1,2],[2,3]]);

jsnx.draw(G, {
    element: '.net_pic',
    weighted: true,
    width: 500,
    height: 500,
    edgeStyle: {
	'stroke-width': 10
    }
});
