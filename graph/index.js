const Graph = require('./Graph')

const g = new Graph()

//Set Vertices
g.addVertices('A');
g.addVertices('B');
g.addVertices('C');
g.addVertices('D');
g.addVertices('E');
g.addVertices('F');
g.addVertices('G');

// Set Edges
g.addEdges('A', 'B', 16);
g.addEdges('A', 'C', 22);
g.addEdges('A', 'D', 25);
g.addEdges('B', 'D', 14);
g.addEdges('B', 'E', 26);
g.addEdges('C', 'D', 9);
g.addEdges('C', 'G', 35);
g.addEdges('D', 'F', 24);
g.addEdges('E', 'F', 15);
g.addEdges('E', 'G', 28);
g.addEdges('F', 'G', 8);

//Show Graph
// console.log(g.showGraph())

// Djikstra
console.log('Djikstra: ', g.djikstra('B', 'G'), '\n')

// Prims
console.log('Prims: ', g.prims(), '\n')