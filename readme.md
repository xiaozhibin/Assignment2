﻿The co-occurence in LES Miserables
============
###1. GithubAddress：[liuzengchaoqian_xiaozhibin_A2](https://github.com/vis2014/Assignment2/tree/liuzengchaoqian_xiaozhibin_A2).

###2. Description
The file includes:

+ force.html: The main html.
+ d3.js: D3 library.
+ fisheye.js: fisheye library
+ style.css: define the appearance of the html.
+ force.js: The D3 script to read network data and create visualization.
+ miserables.json: Data of the co-occurence in LES Miserables.
+ screenshot: Some screenshots of our visualization.

###3. Design of the Network Visualization 
+ When focus on a node ,its name will be showed.
+ `When darg one node, then its relevant nodes and links will be emphasized by changing colors`.
+ `When the mouse move over an area, the related area will be enlarged(just like watch throgh the fisheye)`. 
+ Different colors of the nodes show the different group of each person.


###4. Analysis of the Network Visualization
+ The different colors of the nodes show the different group of the person  
+ After selecting one node, we can easier to find the relevant nodes with the help of the emphasized nodes and linksby changing colors. 
+ Besides, the fisheye function help us easy to observe micro and macro features in the graph.

###5. Data
+ Data type: JSON.
+ [miserable.json](http://bl.ocks.org/mbostock/4062045): The data is transformed to "miserable.json".
