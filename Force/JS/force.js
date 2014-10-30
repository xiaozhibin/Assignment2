/**
 * Created by Shikai on 14-10-27.
 */
//定义图像的和网页的相关属性
var width =  1000;
var height = 800;
var img_w = 77;
var img_h = 90;

//定义SVG
var svg = d3.select("body").append("svg")
.attr("width",width)
.attr("height",height);

//定义SVG相关属性
svg.dataSet="Stark";//定义数据集
svg.picStyle="circle";//定义图片展示样式
svg.netStyle="force";//定义网络展示样式
//绑定前台的selection。
svg.picStyleSelectionId="picStyle";
svg.netStyleSelectionId="netStyle";

d3.json("Data/"+svg.dataSet+".json",function(error,json){

    refresh();
    if( error ){
    return console.log(error);
    }
console.log(json);

var force = d3.layout.force()
                        .nodes(json.nodes)
                        .links(json.edges)
                        .size([width,height])
                        .linkDistance(300)
                        .charge(-150)
                        .start();

var edges_line = svg.selectAll("line")
                    .data(json.edges)
                    .enter()
                    .append("line")
                    .style("stroke","#ccc")
                    .style("stroke-width",1);

var edges_text = svg.selectAll(".linetext")
                    .data(json.edges)
                    .enter()
                    .append("text")
                    .attr("class","linetext")
                    .text(function(d){
                        return d.relation;
                        });


var nodes_img = svg.selectAll("image")
                    .data(json.nodes)
                    .enter()
                    .append("image")
                    .attr("width",img_w)
                    .attr("height",img_h)
                    .attr("xlink:href",function(d){
                        return d.image+".png";
                        })
                    .on("mouseover",function(d,i){
                        d.show = true;
                        })
                    .on("mouseout",function(d,i){
                        d.show = false;
                        })
                    .call(force.drag);



var text_dx = -20;
var text_dy = 20;

var nodes_text = svg.selectAll(".nodetext")
    .data(json.nodes)
    .enter()
    .append("text")
    .attr("class","nodetext")
    .attr("dx",text_dx)
    .attr("dy",text_dy)
    .text(function(d){
        return d.name;
        });

var nodeDesc_dx=50;
var nodeDesc_dy=-50;

var node_desc=svg.selectAll(".nodeDescription")
    .data(json.nodes)
    .enter()
    .append("text")
    .attr("class","nodeDescription")
    .attr("dx",nodeDesc_dx)
    .attr("dy",nodeDesc_dy)
    .text(function(d){
        return d.description;
    });

force.on("tick", function(){

    //限制结点的边界
    json.nodes.forEach(function(d,i){
        d.x = d.x - img_w/2 < 0     ? img_w/2 : d.x ;
        d.x = d.x + img_w/2 > width ? width - img_w/2 : d.x ;
        d.y = d.y - img_h/2 < 0      ? img_h/2 : d.y ;
        d.y = d.y + img_h/2 + text_dy > height ? height - img_h/2 - text_dy : d.y ;
    });

//更新连接线的位置
    edges_line.attr("x1",function(d){ return d.source.x; });
    edges_line.attr("y1",function(d){ return d.source.y; });
    edges_line.attr("x2",function(d){ return d.target.x; });
    edges_line.attr("y2",function(d){ return d.target.y; });

//更新连接线上文字的位置
    edges_text.attr("x",function(d){ return (d.source.x + d.target.x) / 2 ; });
    edges_text.attr("y",function(d){ return (d.source.y + d.target.y) / 2 ; });

//是否绘制连接线上的文字
    edges_text.style("fill-opacity",function(d){
    return d.source.show || d.target.show ? 1.0 : 0.0 ;
    });

//更新结点图片和文字
    nodes_img.attr("x",function(d){ return d.x - img_w/2; });
    nodes_img.attr("y",function(d){ return d.y - img_h/2; });

    nodes_text.attr("x",function(d){ return d.x });
    nodes_text.attr("y",function(d){ return d.y + img_w/2; });
    nodes_text.text(function(d){
        return d.name;
    });

    node_desc.attr("x",function(d){ return d.x });
    node_desc.attr("y",function(d){ return d.y + img_w/2; });
    node_desc.text(function(d){
        if(d.show)
            return d.description;
    });
});
});

function refresh(){
    //获取前台的选项,并设置值
    svg.picStyle=document.getElementById(svg.picStyleSelectionId);
    svg.netStyle=document.getElementById(svg.netStyleSelectionId);
}
function reload(){
    refresh();

    //更新节点的图片
    if(svg.picStyle.value=="hexagon"){
        svg.selectAll("image")
            .attr("xlink:href",function(d){
                return d.image+"1"+".png";
            })
    }
    if(svg.picStyle.value=="circle"){
        svg.selectAll("image")
            .attr("xlink:href",function(d){
                return d.image+".png";
            })
    }
}
