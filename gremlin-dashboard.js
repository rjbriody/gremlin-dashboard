// create angular app
var app = angular.module("GremlinDashboard", [])

// wire up main controller
app.controller("GremlinReplController", function ($scope) {

    // initialize gremlin-client
    $scope.gClient = gremlin.createClient(8182, 'localhost')
    $scope.gScript = 'g = TinkerGraph.open(); TinkerFactory.generateModern(g); g.V'
    $scope.res = ''

    // shared holds things that we expect to share like the graph
    $scope.shared = {g: {nodes: [], edges: []}}

    $scope.submit = function () {
        if (!$scope.gScript) {
            // nothing to do
            return
        }

        console.log("Submit" + $scope.gScript)

        // submit gremlin script to server via gremlin-client
        $scope.gClient.execute($scope.gScript, function (error, d) {
            $scope.res = JSON.stringify(d.result, null, 2)
//                console.log($scope.res)
//                $scope.shared.g = d.result
            // generating a pretend graph for now
            $scope.shared.g = generateGraph()
            // the internet told me that i need to $apply the changes made to g. not really sure why they aren't
            // automatically detected by angular.
            $scope.$apply()
        })
    }

})

/* sigmaGraph Directive */
app.directive('sigmaGraph', function () {

    return {
        // bind this directive's g to the parent g ('=' is shorthand for "same name")
        scope: {g: '='},
        restrict: 'E',
        // wire up a link function
        link: link
    }

    function link(scope, element, attrs) {
        console.log(element)
        scope.sigma = new sigma({
            graph: scope.g,
            container: element[0]
        })

        // add a watch to capture changes to g
        scope.$watch('g', function (g) {
            scope.sigma.graph.clear()
            scope.sigma.graph.read(g)
            scope.sigma.refresh()
        })

    }
})


// This is just here for testing purposes until graph object is handled correctly
function generateGraph() {
    var i, s, N = 100, E = 500
    var g = {
        nodes: [],
        edges: []
    }

    // generate nodes
    for (i = 0; i < N; i++) {
        g.nodes.push({
            id: 'n' + i,
            label: 'Node ' + i,
            x: Math.random(),
            y: Math.random(),
            size: Math.random(),
            color: '#666'
        })
    }

    // generate edges
    for (i = 0; i < E; i++) {
        g.edges.push({
            id: 'e' + i,
            source: 'n' + (Math.random() * N | 0),
            target: 'n' + (Math.random() * N | 0),
            size: Math.random(),
            color: '#ccc'
        })
    }

    // return graph
    return g
}
