The co-occurence in LES Miserables
============
###1. GithubAddress：[liuzengchaoqian_xiaozhibin_A2](https://github.com/vis2014/Assignment2/tree/liuzengchaoqian_xiaozhibin_A2").

###2. Description
The file includes:

+ force.html: The main html.
+ d3.js: D3 library.
+ force.js: The D3 script to read network data and create visualization.
+ miserables.json: Data of the co-occurence in LES Miserables.
+ screenshot: Some screenshots of our visualization.

###3. Design of the Network Visualization 
+ When focus on a node ,its name will be showed.
+ 'When darg one node, then its relevant nodes and links will be emphasized by changing colors'.
+ 'When the mouse move over an area, the related area will be enlarged(just like watch throgh the fisheye)'. 
+ Different colors of the nodes show the different group of each person.


###4. Usage and Analysis
+ The sizes of the nodes in the network are initially not the same due to their different weights. We can infer that the "n0", "n1", "n3", "n9", "n16", "n22", "n23", "n27", "n54", "n55", "n63" which in larger size are somehow important.
+ After selecting one node, it's easier for you to find the relevant nodes with the help of the emphasized nodes and links. Take the "n10" as an example, the relevant "n1", "n9", "n63" can be easily found. Besides, if you click the "n54", most of the other nodes are highlighted. So we can speculate that the "n54" is indispensable.
+ In order to have a better observation, you can prevent the force layout from subsequently changing the position of the nodes by fixing them in some place.

###5. Data
+ Data type: JSON.
+ [Network of Macaque's Brain](http://mrbrain.cs.jhu.edu/graph-services/download/ "Brain Network"): The data is transformed to "graph.json".
