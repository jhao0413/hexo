---
title: Promise用法详解
tags:
  - JavaScript
categories: Frontnd
abbrlink: promise-usage
date: 2024-08-30 23:10:00
---

## 什么是Promise

Promise是一个对象，代表了异步操作的最终完成或者失败。

下图为MDN中的Promise流程图

Promise存在三种状态分别为：

> 其中fulfill和reject状态也被称之为已敲定（settled），即非pending状态

* pending（等待中）：初始状态，还没有确定的结果
* fulfill（已兑现）：成功状态，操作已完成
* reject（已拒绝）：失败状态，操作未完成

‍

​![image](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/promises.png)​

## thenable

[Promises/A+](https://promisesaplus.com/)对于thenable的定义是：一个定义 then 方法的对象或函数

例如：

```javascript
const thenableFn = () => {
    return {
        then: (resolve, reject) => [
            resolve('thenableFn Success')
        ]
    }
}

const thenableobj = {
    then: (resolve, reject) => {
        resolve('thenableFn Success')
    }
}

thenableFn().then((res) => {
    console.log(res); //thenableFn Success
})

thenableobj.then((res) => {
    console.log(res); //thenableFn Success
})
```

## Promise中的方法有哪些

### 实例方法

#### then

**then**方法接受两个参数，分别用于Promise在fulfilled与reject情况下的回调函数，then也会返回一个promise对象，这也就是为什么可以实现链式调用的原因

```javascript
const promise = new Promise((resolve, reject) => {
  resolve('resolved1');
})

promise.then((value) => {
  console.log(value); // resolved1
  // 即使返回的是一个字符串，then也会将其包裹在一个promise中返回
  return 'resolved2';
}).then((value) => {
  console.log(value); // resolved2
  return 'resolved3';
}).then((value) => {
  console.log(value); // resolved3
});
```

#### catch

**catch**是在promise被拒绝时使用的一个函数，它也会返回一个promise对象。

```javascript
const promise = new Promise((resolve, reject) => {
	reject('error');
})

promise.then((res) => {
	console.log('first then:', res); //因为reject，所以此处的代码不会执行
}).catch((err) => {
	console.log(err); //error
}).then((res) => {
	console.log('second then:', res); //second then:undefined
})
```

#### finally

**finally**在promise敲定（settled，无论是resolve还是reject）后执行,同时它也返回一个promise，在后面依旧可以进行链式调用。

```javascript
const promise = new Promise((resolve, reject) => {
	reject('error');
})

promise.then((res) => {
	console.log('first then:', res); //因为reject，所以此处的代码不会执行
}).catch((err) => {
	console.log(err); //error
}).then((res) => {
	console.log('second then:', res); //second then:undefined
}).finally(() => {
  console.log('finally'); //finally
}).then((res) => {
  console.log('third then:', res); //third then:undefined
});
```

### 静态方法

#### reslove

返回一个promise对象，并附带兑现的值

#### reject

返回一个promise对象，并附带拒绝的原因

#### all

接收一个promise可迭代对象，并返回一个promise。在所有传入的promise兑现后，返回一个包含所有promise对象兑现值的数组；如果其中有promise被拒绝，那么返回第一个promise被拒绝的原因

```javascript
//全都fulfilled时
const promiseA = new Promise((resolve, reject) => {
	resolve('successA');
})

const promiseB = new Promise((resolve, reject) => {
	resolve('successB');
})

const promiseC = new Promise((resolve, reject) => {
	resolve('successC');
})

Promise.all([promiseA, promiseB, promiseC]).then((res) => {
  console.log(res); // [ 'successA', 'successB', 'successC' ]
}).catch((err) => {
  console.log(err);
});
```

```javascript
//其中有一个reject时
const promiseA = new Promise((resolve, reject) => {
	resolve('successA');
})

const promiseB = new Promise((resolve, reject) => {
	reject('errorB');
})

const promiseC = new Promise((resolve, reject) => {
	resolve('successC');
})

Promise.all([promiseA, promiseB, promiseC]).then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err); // errorB
});
```

#### allSettled

接收一个promise的可迭代对象，返回每个promise结果描述的数组

```javascript
const promiseA = new Promise((resolve, reject) => {
	resolve('successA');
})

const promiseB = new Promise((resolve, reject) => {
	reject('errorB');
})

const promiseC = new Promise((resolve, reject) => {
	resolve('successC');
})

Promise.allSettled([promiseA, promiseB, promiseC]).then((res) => {
  console.log(res);
})

//[
//  { status: 'fulfilled', value: 'successA' },
//  { status: 'rejected', reason: 'errorB' },
//  { status: 'fulfilled', value: 'successC' }
//]
```

#### race

接收一个promise可迭代对象，返回一个promise，哪个promise先敲定就先返回哪个（无论是resolve还是reject）

```javascript
// 这里就用mdn的例子了
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then((value) => {
  console.log(value);
  // 这里两个promise都被兑现了，但promise2的兑现时间更快
});
```

```javascript
// 如果reject先执行，那么就会先返回reject
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, 'two');
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 200, 'three');
});

Promise.race([promise1, promise2, promise3]).then((value) => {
  console.log(value);
}).catch((err) => {
  console.log(err); // two
});
```

#### any

接收一个promise可迭代对象，返回第一个被兑现（resolve）promise的兑现值（会忽略之前的reject），如果所有promise都被拒绝，那么以数组的形式返回所有被拒绝的原因。

> 如果文中有任何错误欢迎指正~还是建议直接看官网理解可能会更好

[Promise - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[Promises/A+](https://promisesaplus.com/)

[45道Promise题](https://github.com/LinDaiDai/niubility-coding-js/blob/master/JavaScript/%E5%BC%82%E6%AD%A5/%E8%A6%81%E5%B0%B1%E6%9D%A545%E9%81%93Promise%E9%9D%A2%E8%AF%95%E9%A2%98%E4%B8%80%E6%AC%A1%E7%88%BD%E5%88%B0%E5%BA%95.md)

‍
