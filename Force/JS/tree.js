//图像区域大小
var w = 960;
var h = 600;
var img_w = 77;
var img_h = 90;
//定义一个Tree对象
var tree = d3.layout.tree()
    .size([w-img_w,h-img_h])
    .separation(function(a,b) { return a.parent == b.parent ? 1 : 2;});//设置相隔节点之间的间隔

//新建画布
var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h)
    .append("g");

//根据JSON数据生成树
d3.json("Data/StarkTree.json", function(error, json) {

    //根据数据生成nodes集合
    var nodes = tree.nodes(json);

    //获取node集合的关系集合
    var links = tree.links(nodes);

    console.log(links);
    //为关系集合设置贝塞尔线连接
    var link=svg.selectAll(".link")
        .data(links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d",d3.svg.diagonal());

    //根据node集合生成节点
    var node = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g");
    var img_dx=-30;
    var img_dy=-40;
    //添加图像
    node
        .append("image")
        .attr("width",img_w)
        .attr("height",img_h)
        .attr("dx",img_dx)
        .attr("dy",img_dy)
        .attr("xlink:href",function(d){
            return d.image+".png";
        })
        .attr("class", "node")
        .attr("transform", function(d){ return "translate("+(d.x-img_w/2)+"," + (d.y-img_h/2) + ")";})
        .on("mouseover",function(d){
            //取得条形的x/y的值，增大后作为提示条的坐标
            var xPosition=d.x+img_w/1.5;
            var yPosition=d.y-img_h/2;

            //更新提示条的位置和值
            d3.select("#tooltip")
                .style("left",xPosition+"px")
                .style("top",yPosition+"px")
                .select("#value")
                .text(d.description);

            //显示提示条
            d3.select("#tooltip").classed("hidden",false);
        })
        .on("mouseout",function(d,i){
            //影藏提示条
            d3.select("#tooltip").classed("hidden",true);
        });
    //图像下面添加名字
    var text_dx = -20;
    var text_dy = 20;
    node.append("text")
        .attr("class","nodetext")
        .attr("dx",text_dx)
        .attr("dy",text_dy)
        .text(function(d){
            return d.name;
        })
        .attr("transform", function(d){ return "translate("+(d.x-img_w/4)+"," + (d.y+img_h/2) + ")";});
});