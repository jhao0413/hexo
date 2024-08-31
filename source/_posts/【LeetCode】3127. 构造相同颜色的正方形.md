---
title: 【LeetCode】构造相同颜色的正方形
tags:
  - LeetCode
categories: Frontnd
abbrlink: promise-usage
date: 2024-08-31 17:00:00
---
[【题目链接】3127. 构造相同颜色的正方形](https://leetcode.cn/problems/make-a-square-with-the-same-color/description/)

### 题目描述

给你一个二维 3 x 3 的矩阵 grid ，每个格子都是一个字符，要么是 'B' ，要么是 'W' 。字符 'W' 表示白色，字符 'B' 表示黑色。

你的任务是改变 至多一个 格子的颜色，使得矩阵中存在一个 2 x 2 颜色完全相同的正方形。

如果可以得到一个相同颜色的 2 x 2 正方形，那么返回 true ，否则返回 false 。

### 实现思路

1. **遍历所有可能的2x2正方形**

* (0,0) 到 (1,1)
* (0,1) 到 (1,2)
* (1,0) 到 (2,1)
* (1,1) 到 (2,2)
2. **统计每个2x2正方形中'B'和'W'的数量**

如果B或W的数量大于等于3（因为测试案例中还有4格都是'B'或'W'的情况）那么就符合条件

### 具体代码

```javascript
// 辅助函数：检查给定的 2x2 正方形是否可以通过改变一个格子来使其颜色完全相同
const checkSquare = (x, y) => {
    let countB = 0;
    let countW = 0;
    // 统计 2x2 正方形中 'B' 和 'W' 的数量
    for (let i = x; i < x + 2; i++) {
        for (let j = y; j < y + 2; j++) {
            if (grid[i][j] === 'B') {
                countB++;
            } else {
                countW++;
            }
        }
    }
    // 判断是否可以通过改变一个格子来满足条件,大于3是因为有可能
    return countB >= 3 || countW >= 3;
};

// 遍历所有可能的 2x2 正方形
for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
        if (checkSquare(i, j)) {
            return true;
        }
    }
}

// 如果没有找到符合条件的 2x2 正方形，返回 false
return false;
```