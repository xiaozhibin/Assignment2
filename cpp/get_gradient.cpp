/*************************************************************************
    > File Name: get_gradient.cpp
    > Author: HouJP
    > Mail: peng_come_on@126.com 
    > Created Time: 五 10/24 15:23:02 2014
 ************************************************************************/

#include <cstdio>
#include <cmath>

int get_dec(char c) {
	if (c >= '0' && c <= '9') {
		return c - '0';
	} else {
		return 10 + c - 'a';
	}
}

void get_rgb(char * color, int * rgb) {
	for (int i = 0; i < 3; ++i) {
		rgb[i] = get_dec(color[2 * i + 2]);
		rgb[i] += 16 * get_dec(color[2 * i + 1]);
	}
}

int get_step(char * s, double * step, int * rgb) {
	int n = s[0] - '0';
	for (int i = 0; i < 3; ++i) {
		step[i] = (0xff - rgb[i] + 0.0) / n;
	}
	return n;
}

void print(int * rgb, double * step, int n) {
	for (int j = 0; j < n; ++j) {
		printf("\"#");
		for (int i = 0; i < 3; ++i) {
			printf("%x", (unsigned int)(rgb[i] + j * step[i]));
		}
		printf("\"\n");
	}
}

int main(int args, char * argv[]) {
	int n;
	int rgb[3];
	double step[3];
	
	get_rgb(argv[1], rgb);
	n = get_step(argv[2], step, rgb);
	print(rgb, step, n);

	return 0;
}
