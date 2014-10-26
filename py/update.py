#! /usr/bin/python

import json
import math
import string

FILE_PATH = 'net.json.bak1'
GROUP_NUM = 5
COLOR_LEV = 3

def init(file_path) :
	data = json.load(file(file_path))
	return data

def count_indegree(data) :
	indegree = {}

	for i in data['links'] :
		node_id = i['source']
		if node_id in indegree :
			indegree[node_id] = indegree[node_id] + 1
		else :
			indegree[node_id] = 1
		node_id = i['target']
		if node_id in indegree:
			indegree[node_id] = indegree[node_id] + 1
		else :
			indegree[node_id] = 1
	
	return indegree

def add_indegree(data, indegree) :
	for i in range(0, len(data['nodes'])) :
		if i in indegree :
			data['nodes'][i]['indegree'] = math.log(indegree[i] + 1, 1.3)
		else :
			data['nodes'][i]['indegree'] = 0
	return data

def add_color(data, level_max) :
	minn = 100;
	maxx = 0;

	for i in data['nodes'] :
		maxx = max(maxx, i['indegree'])
		minn = min(minn, i['indegree'])
	
	step = (maxx - minn) / level_max

	for i in data['nodes'] :
		level = math.floor((i['indegree'] - minn) / step)
		if level >= 3 :
			level = 2;
		i['level'] = level

	return data

def update_group(data, group_num) :
	for i in range(0, len(data['nodes'])) :
		data['nodes'][i]['group'] = string.atoi(data['nodes'][i]['group']) % group_num
	return data


def run() :
	data = {}
	indegree = {}

	data = init(FILE_PATH)
	indegree = count_indegree(data)
	data = add_indegree(data, indegree)
	data = update_group(data, GROUP_NUM)
	data = add_color(data, COLOR_LEV)

	print json.dumps(data)

	return

run()
