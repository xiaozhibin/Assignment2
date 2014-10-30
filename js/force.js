//Width and height
var w = 700;
var h = 550;

//Coefficient of the radius
var circleR = parseInt(document.getElementById('circle-size').value);

//Create SVG element
var svg = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h);

//Initialize a default force layout
var force = d3.layout.force()
					 .size([w, h])
					 .linkDistance([200])
					 .charge([-400]);

//Drag start listener
var drag = force.drag()
				.on("dragstart", dragstart)
   			    .on("drag", drag);
 
//Global dataset
var dataset;

d3.json("data/graph.json", function(error, json) {
	if (error) {
		console.log('loading JSON fail!', error);
	} else {
		dataset = json;

		//Using the nodes and edges in dataset
	    force
	    	.nodes(dataset.nodes)
			.links(dataset.edges)
			.start();
		
		//Create edges as lines
		var edges = svg.selectAll("line")
			.data(dataset.edges)
			.enter()
			.append("line")
			.attr("class", "links")
		
		//Create nodes group
		var nodes = svg.selectAll("nodes")
			.data(dataset.nodes)
			.enter()
			.append("g")
			.attr("class", "nodes")
			.on("mouseover", mouseover)
			.on("mouseout", mouseout)
			.on("dblclick", dblclick)
			.call(force.drag);

		//Create nodes as circles
		nodes.append("circle")
			.attr("class", function(d) { return "circles" + " c" + d.index })
			//Transform the weight into radius
			.attr("r", function(d) { return (1 + Math.log(d.weight)) * circleR; })

		//Every time the simulation "ticks", this will be called
		force.on("tick", function() {
			edges.attr("class", function(d) { return "links" + " n" + d.source.index + " n" + d.target.index})
				 .attr("x1", function(d) { return d.source.x; })
				 .attr("y1", function(d) { return d.source.y; })
				 .attr("x2", function(d) { return d.target.x; })
				 .attr("y2", function(d) { return d.target.y; });
		
			nodes.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		});
	}
});

//Emphasize the related links when click one node
function dragstart(d) {
	//Restore the other
	svg.selectAll(".links")
		.style("stroke", "#dddddd")
		.style("stroke-width", "1px");
	svg.selectAll(".circles")
		.style("fill", "#555555");

	//Render current node
	d3.select(this).selectAll("circle")
		.style("fill", "#FF0000");
	for (var i = 0; i < dataset.edges.length; ++i) {
		if (d.index == dataset.edges[i].source.index || d.index == dataset.edges[i].target.index ) {
			//Emphasize links
			svg.selectAll(".n" + d.index)
				.style("stroke", "#999999")
				.style("stroke-width", "1.5px");
			//Emphasize circles
			if (d.index == dataset.edges[i].source.index) {
				svg.select(".c" + dataset.edges[i].target.index)
				.style("fill", "#FF9797");
			} else {
				svg.select(".c" + dataset.edges[i].source.index)
				.style("fill", "#FF9797");
			}
		}
	};

	//Fill the fixed circles
	svg.selectAll(".fixed").style("fill", "#FF0000");
}

//Automatically set "fixed" attribute when drag
function drag(d) {
	d3.select(this).selectAll("circle")
		.classed("fixed", d.fixed = true)
		.style("fill", "#FF0000");
}

//Double click to remove current "fixed" attribute and restore related links
function dblclick(d) {
	d3.select(this).selectAll("circle")
		.classed("fixed", d.fixed = false)
		.style("fill", "#555555");

	for (var i = 0; i < dataset.edges.length; ++i) {
		if (d.index == dataset.edges[i].source.index || d.index == dataset.edges[i].target.index) {
			svg.selectAll(".n" + d.index)
				.style("stroke", "#dddddd")
				.style("stroke-width", "1px");	
			if (d.index == dataset.edges[i].source.index) {
				svg.select(".c" + dataset.edges[i].target.index)
				.style("fill", "#555555");
			} else {
				svg.select(".c" + dataset.edges[i].source.index)
				.style("fill", "#555555");
			}
		}
	};

	//Fill the fixed circles
	svg.selectAll(".fixed").style("fill", "#FF0000");
}

//Display the text and emphasize the node when move over
function mouseover(d) {
	d3.select(this).select("circle")
		.transition()
		.duration(300)
		//1.5 times the orginal one
		.attr("r", function(d) { return (1 + Math.log(d.weight)) * circleR * 1.5; });

	d3.select(this).append("text")
		.attr("class", "text")
		.attr("dx", 24)
		.attr("dy", ".35em")
		.text(function(d) { return d.name });
}

//Remove the text when move out
function mouseout(d) {
	d3.select(this).select("circle")
		.transition()
		.duration(300)
		.attr("r", function(d) { return (1 + Math.log(d.weight)) * circleR; });

	d3.select(this)
		.selectAll("text") 
		.transition()
		.duration(300)
		.remove();
}

//Click to increse the size of circles
function addSize() {
	if (circleR <= 0) {
		circleR = 0;
	}
	circleR = circleR + 1;
	document.getElementById('circle-size').value = circleR.toString();
	svg.selectAll("circle")
		.attr("r", function(d) { return (1 + Math.log(d.weight)) * circleR; })
}

//Click to decrese the size of Circles
function subtractSize() {
	circleR = circleR - 1;
	if (circleR >= 0) {
		document.getElementById('circle-size').value = circleR.toString();
		svg.selectAll("circle")
			.attr("r", function(d) { return (1 + Math.log(d.weight)) * circleR; })
	}
}