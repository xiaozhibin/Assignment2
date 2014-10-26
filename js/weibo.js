var width = 1500, height = 1200;

//节点的颜色
var color = [
	["#1f77b4", "#69a4cd", "#b4d1e6"],
	["#ff7f0e", "#ffa95e", "#ffd4ae"],
	["#2ca02c", "#72bf72", "#b8dfb8"],
	["#d62728", "#e36f6f", "#f1b7b7"],
	["#9467bd", "#b799d3", "#dbcce9"]
];

var force = d3.layout.force().charge(-120).linkDistance(100).size(
		[ width, height ]);

var svg = d3.select("#chart").append("svg").attr("width", width).attr("height",
		height);

d3.json("net.json", function(json) {
	force.nodes(json.nodes).links(json.links).start();

	//添加边
	var link = svg.selectAll("line.link").data(json.links).enter().append(
			"line").attr("class", "link").style("stroke-width", function(d) {
		return Math.sqrt(d.value);
	});

	//添加节点
	var node = svg.selectAll("circle.node").data(json.nodes).enter().append(
			"circle").attr("class", "node").attr("r", 
			function(d) {
				return d.indegree + 5;
			}).style("fill", 
			function(d) {
				return color[d.group][2 - d.level];
			}).call(force.drag);

	//添加节点的显示名称
	node.append("title").text(function(d) {
		return d.name;
	});


	//添加拖动节点的响应函数
	force.on("tick", function() {
		link.attr("x1", function(d) {
			return d.source.x;
		}).attr("y1", function(d) {
			return d.source.y;
		}).attr("x2", function(d) {
			return d.target.x;
		}).attr("y2", function(d) {
			return d.target.y;
		});

		node.attr("cx", function(d) {
			return d.x;
		}).attr("cy", function(d) {
			return d.y;
		});
	});
});
