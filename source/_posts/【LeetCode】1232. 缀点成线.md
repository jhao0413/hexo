---
title: 【LeetCode】缀点成线
tags:
  - LeetCode
categories: Frontnd
abbrlink: check-if-it-is-a-straight-line
date: 2024-09-01 14:07:00
---
[【题目链接】1232. 缀点成线](https://leetcode.cn/problems/check-if-it-is-a-straight-line/description/)

### 题目描述

给定一个数组 coordinates ，其中 coordinates[i] = [x, y] ， [x, y] 表示横坐标为 x、纵坐标为 y 的点。请你来判断，这些点是否在该坐标系中属于同一条直线上。

### 实现思路

1. 如果每两个点的斜率相同，那么就能确定属于同一条直线上
2. 从前两个点开始依次计算斜率并存入数组
3. 所有斜率存入数组后，判断数组中的斜率是否相等，如果全部相等则属于同一条直线

### 具体代码

```javascript
var checkStraightLine = function(coordinates) {
    const slopeArr = []
    for (let i = 0; i < coordinates.length - 1; i++) {
        let dx = coordinates[i + 1][0] - coordinates[i][0]
        let dy = coordinates[i + 1][1] - coordinates[i][1]
        // 考虑如果x为零的情况，代表垂直的直线
        let slope = dx === 0 ? 'vertical' : dy/dx
        // 将结果存入数组
        slopeArr.push(slope)
    }
    
    // 如果所有值相等则为一条直线
    return slopeArr.every(item => item === slopeArr[0])
};
```