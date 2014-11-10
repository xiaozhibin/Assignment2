var width = 960,
    height = 500;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-200)
    .linkDistance(40)
    .size([width, height]);


var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var fisheye = d3.fisheye.circular()
    .radius(80)
    .distortion(2.4);

var drag = force.drag()
    .on("dragstart", dragstart)
    .on("dragend",dragend);

d3.json("miserable.json", function(error, graph) {

    dataset = graph;
    force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();

    var link = svg.selectAll(".links")
        .data(graph.links)
        .enter().append("line")
        .attr("class", function(d) { return "links" + " node" + d.source.index + " node" + d.target.index})
        .style("stroke","#999999")
        .style("stroke-width", function(d) { return Math.sqrt(d.value); });

    var node = svg.selectAll(".nodes")
        .data(graph.nodes)
        .enter()
        .append("g")
        .attr("class", "nodes")
        .append("circle")
        .attr("class", function(d) { return "circles" + d.index })
        .attr("r",5+"px")
        .style("fill", function (d) {
            return color(d.group);
        })
        . on("mousemove", function() {
            fisheye.focus(d3.mouse(this));

            node.each(function(d) { d.fisheye = fisheye(d); })
                .attr("cx", function(d) { return d.fisheye.x; })
                .attr("cy", function(d) { return d.fisheye.y; })
                .attr("r", function(d) { return d.fisheye.z * 4.5; });

            link.attr("x1", function(d) { return d.source.fisheye.x; })
                .attr("y1", function(d) { return d.source.fisheye.y; })
                .attr("x2", function(d) { return d.target.fisheye.x; })
                .attr("y2", function(d) { return d.target.fisheye.y; });
        })
        .call(force.drag);

    node.append("title")
        .text(function(d) { return d.name; });
    node.attr("title",function(d){return d.index+ d.name});

    force.on("tick", function() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    })
});
function dragstart(d){
    for (var i = 0; i < dataset.links.length; ++i) {
        if (d.index == dataset.links[i].source.index || d.index == dataset.links[i].target.index ) {
            svg.selectAll(".node" + d.index)
                .style("stroke", "blue")
                .style("stroke-width", function(d) { return Math.sqrt(d.value)+0.2; });
            if (d.index == dataset.links[i].source.index) {
                svg.select(".circles" + dataset.links[i].target.index)
                    .style("fill", "red");
            } else {
                svg.select(".circles" + dataset.links[i].source.index)
                    .style("fill", "red");
            }
        }
    };
}function dragend(d){
    svg.selectAll("circle")
        .style("fill", function (d) {
            return color(d.group);
        });
    svg.selectAll(".links")
        .style("stroke","#999999")
        .style("stroke-width", function(d) { return Math.sqrt(d.value); });
}
