class Graph {
  constructor() {
    this.vertices = [];
    this.adjacencyList = {}
  }

  addVertices(vertice) {
    this.vertices.push(vertice);
    this.adjacencyList[vertice] = {};
  }

  addEdges(vertice1, vertice2, weight) {
    this.adjacencyList[vertice1][vertice2] = weight;
    this.adjacencyList[vertice2][vertice1] = weight;
  }

  showGraph() {
    const vertices = this.vertices
    const edges = this.adjacencyList
    return { vertices, edges }
  }

  djikstra(source, to) {
    let distances = {}
    let verticePathFrom = {}
    let isVisited = {}

    // Inisiasi awal
    for (let i = 0; i < this.vertices.length; i++) {
      if (this.vertices[i] === source) {
        distances[this.vertices[i]] = 0
      } else {
        distances[this.vertices[i]] = Infinity
      }
      verticePathFrom[this.vertices[i]] = this.vertices[i]
      isVisited[this.vertices[i]] = false
    }

    let currVisited = source //Inisiasi mulai

    while (currVisited !== null) {
      let distance = distances[currVisited]
      let edges = this.adjacencyList[currVisited]
      for (const key in edges) {
        let newDistance = distance + edges[key]
        if (newDistance < distances[key]) {
          distances[key] = newDistance
          verticePathFrom[key] = currVisited
        }
      }
      isVisited[currVisited] = true

      // Mencari vertice yang belum dikunjungi dan mempunyai distance paling kecil
      let minDistance = Infinity // Initialvalue
      let currVertice = null //Initialvalue
      for (const key in distances) {
        if (distances[key] < minDistance && isVisited[key] !== true) {
          minDistance = distances[key]
          currVertice = key
        }
      }

      currVisited = currVertice
    }

    //Return value
    let shortest = `Shortest distance from ${source} -> ${to} is ${distances[to]}`
    let arrPath = this.djikstraPath(verticePathFrom, source, to)
    let path = arrPath.reverse().join(' -> ') + ` -> ${to} `
    return { distances, verticePathFrom, shortest, path }
  }

  djikstraPath(verticePath, source, to) {
    let temp = source != to ? verticePath[to] : ''
    let temp2 = source != to ? this.djikstraPath(verticePath, source, temp) : undefined
    let path = temp2 ? [temp, ...temp2] : temp

    return path
  }

  prims() {
    let distances = [],
      activeNodes = {},
      activeEdges = []

    //Inisiasi active node All False
    for (let i = 0; i < this.vertices.length - 1; i++) {
      activeNodes[this.vertices[i]] = false
    }

    //Current Vertice
    let currVertice = 'D'

    // Rekursif
    while (currVertice !== null) {
      activeNodes[currVertice] = true

      // Cek setiap percabangan setiap node/vertice yang telah aktif/connect ( di cari terkecil )
      let distance = Infinity
      let edges = this.adjacencyList[currVertice]
      let fromVertice = null
      let toVertice = null
      for (const key in activeNodes) {
        if (activeNodes[key]) {
          let edgeslast = this.adjacencyList[key]
          for (let edge in edgeslast) {
            if (distance > edgeslast[edge] && !activeNodes[edge]) {
              distance = edgeslast[edge]
              toVertice = edge
              fromVertice = key
            }
          }
        }
      }

      // Cek hasil perulangan
      if (distance == Infinity || toVertice === null || fromVertice === null) {
        // Semua terkoneksi / selesai,.. keluar rekursif
        currVertice = null
      } else {
        // Push distance terkecil dan push percabangan,.. mengganti currVertice
        distances.push(distance)
        activeEdges.push([fromVertice, '->', toVertice])
        currVertice = toVertice
      }
    }

    // Return Value
    let MST = 0;
    distances.map(e => MST += e)
    return { activeEdges, distances, MST }
  }
}

module.exports = Graph
