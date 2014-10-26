import json
import random
def readFile():
    path = "D:\Learning_materials\data.txt"
    dictfile = open(path)
    
    nodeset = set()
    list = []
    slist= []
    while True:
        line = dictfile.readline()
        if not line:
            break
        else:
            contents = line.split("\t")
            jsonmap = dict()
            jsonmap["source"] = contents[0]
            jsonmap["target"] = contents[1]
            jsonmap["value"] = contents[2]
            nodeset.add(contents[0])
            nodeset.add(contents[1])
            list.append(jsonmap)
    return list, nodeset


def writeJson(jsonStr):
    path = "net.json"
    jsonfile = open(path, 'w')
    jsonfile.write(jsonStr)
    jsonfile.close()


def generateNodes(nodeset):
    nodelist = []
    for i in nodeset:
        nodemap = dict()
        nodemap["name"] = i
        groupint = random.randint(1,15)
        nodemap["group"] = str(groupint)
        nodelist.append(nodemap)
    return nodelist
        
def generateNodeIndex(nodeset):
    idxmap = dict()
    count = 0
    for item in nodeset:
        idxmap[item] = count
        count = count + 1
    return idxmap


def dataFilter(maplist, nodeset):
    count = 0;
    mlist = maplist
    cplist = []
    newnode = set()
    eset = set()
    for item in nodeset:
        count = count + 1
        if count % 200 == 0:
            for i in range(len(mlist)):
                map = mlist[i]                
                if map["source"] == item:
                    cplist.append(map)
                if map["target"] == item:
                    cplist.append(map)
    urlListNew = []
    while cplist:
        url = cplist.pop()
        if url not in urlListNew:
            urlListNew.append(url)
            newnode.add(url["source"])
            newnode.add(url["target"])              
    return urlListNew, newnode
                    
            
    

#s = initNode()
list, s = readFile()
ls , ss = dataFilter(list, s)
idxmap = generateNodeIndex(ss)
for i in range(len(ls)):
    ls[i]["source"] = idxmap[ls[i]["source"]]
    ls[i]["target"] = idxmap[ls[i]["target"]]
print "================================"
print len(ss),len(idxmap)
jmap = dict()
jmap["links"] = ls
jmap["nodes"] = generateNodes(ss)
writeJson(json.dumps(jmap))
# result = readFile()
# ss = json.dumps(result)
# print ss
#           
    

