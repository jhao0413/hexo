---
title: 【LeetCode】重新排列句子中的单词
tags:
  - LeetCode
categories: Frontnd
abbrlink: rearrange-words-in-a-sentence
date: 2024-09-01 14:07:00
---
[【题目链接】3127. 重新排列句子中的单词](https://leetcode.cn/problems/rearrange-words-in-a-sentence/description/)

### 题目描述

「句子」是一个用空格分隔单词的字符串。给你一个满足下述格式的句子 text :

句子的首字母大写
text 中的每个单词都用单个空格分隔。
请你重新排列 text 中的单词，使所有单词按其长度的升序排列。**如果两个单词的长度相同，则保留其在原句子中的相对顺序。**

请同样按上述格式返回新的句子。

### 实现思路

1. 将句子按照空格分割为数组
2. 根据每个单词的长度进行升序排序
3. 将第一项的首字母大写
4. 将数组转换为字符串的格式返回

### 具体代码

**方法一**

这种是目前想出来最简单的解决方案，直接使用js的sort方法

> 这里不同的JavaScript引擎实现的方法会有所不同，V8引擎（Chrome和Node.js使用的引擎）中使用的是Timsort算法，是一种稳定的排序算法。

```javascript
var arrangeWords = function(text) {
  const textArr = text.toLowerCase().split(' ')
  // 直接使用sort方法进行排序   
  textArr.sort((a, b) => a.length - b.length);
  textArr[0] = textArr[0][0].toUpperCase() + textArr[0].slice(1)
  return textArr.join(' ');
};
```

**方法二**

上面提到了稳定的排序算法，起因是一开始打算使用选择排序，发现不符合题目中“如果两个单词的长度相同，则保留其在原句子中的相对顺序。”的要求。

排序算法分为非稳定排序和稳定排序。

* **非稳定性排序** 指在排序过程中，相等元素的相对位置可能会发生改变的排序算法。如果序列中有两个元素相等，经过非稳定排序后，它们的相对顺序可能与排序前不同。常见的非稳定性排序有：
    * 快速排序
    * 选择排序
    * 堆排序
    
* **稳定性排序**指在排序过程中，相等元素的相对位置保持不变的排序算法。如果序列中有两个元素相等，经过稳定排序后，它们的相对顺序与排序前相同。常见的稳定性排序有：
    * 冒泡排序
    * 插入排序
    * 归并排序
    * 计数排序
    * 基数排序
    * 桶排序

使用桶排序

```javascript
var arrangeWords = function(text) {
  const textArr = text.toLowerCase().split(' ')
  const buckets = {}
  for (const item of textArr) {
    if (buckets[item.length]) {
      buckets[item.length].push(item)
    } else {
      buckets[item.length] = [item]
    }
  }

  let result = []
  Object.keys(buckets).forEach(keys => {
    result = result.concat(buckets[keys])
  })

  result[0] = result[0][0].toUpperCase() + result[0].slice(1)
  return result.join(' ');
};
```

[Array.prototype.sort() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

[Getting things sorted in V8 · V8](https://v8.dev/blog/array-sort#timsort)

[Timsort - 维基百科，自由的百科全书](https://zh.wikipedia.org/wiki/Timsort)