---
title: union-find算法
date: 2019-09-17 09:41:07
updated: 2019-09-17 09:41:07
tags:
---

终于到了第一章的最后一部分,在第一章的最后一部分,探讨一个算法union-finde 这个算法在图的部分会继续使用

算法一书的强调对于算法的理念
> 优秀的算法因为能够**解决实际问题**而变得重要
> **高效**算法也可以很简单
> 理解某个实现的性能特点是一项令人满足的挑战
> 在解决同一个问题的多种算法之间进行选择时,科学方法是一种重要的工具
> 迭代式更改能够让算法的效率越来越高

### 动态连通性

问题
: 输入是一列整数对,其中每个整数都表示一个某种类型的对象,一对整数 p q 可以被理解为`p 和 q 是相连的`

假设相连是一种对等关系
: 自反性: p 和 q 是相连的
对称性: 如果 p 和 q 是相连的, 那么 q 和 p 也是相连的
传递性: 如果 p 和 q 是相连的,那么 p 和 r 也是相连的

对等关系能够将对象分为多个等价类.
当且进党两个对象相连时它们才属于同一个等价类

术语
: 将对象称为 **触点**
将整数对称为 **连接**
将等价类称为 **连通分量** 或者简称**分量**

### api

|      UF |                |                            |
| ------: | :------------- | :------------------------- |
|         | UF(N)          | 以整数标示(0到N)           |
|    void | union(p,q)     | 在 p 和 q 之间添加一个链接 |
|     int | find(p)       | p 所在的分量的标识         |
| boolean | connected(p,q) | p q 是否存在于同一个分量   |
|     int | count()        | 连通分量的数量             |

### 分析问题
为了解决动态连通性问题所有的实现都应该
: 定义一种数据结构表示已知的链接
基于此数据结构实现高效的 union() 、find() 、 connected() 和 count()方法

> 数据结构的性质将直接影响到算法的效率

数据结构
: 所以用一个以**触点为索引**的数组id[]作为基本的数据结构来表示所有分量
将使用分量中的某个触点的名称作为分量的标识符,因此每个分量都是由它的触点之一的表示
开始的时候,由N个分量,每个触点都构成了一个含有它自己的分量

<div class="note">
这段话的意思就是说有个id[] 的数组 id[0] 就代表 0 的触点
<br/>
id[0] 的内容就是 0 触点当前所在的分量
<br/>
连通分量本质上是一个构建树的过程
</div>

>

### 实现
对于这个api我们由三种实现

所有的实现都存在一个基类UF这样能少写好多代码
```js UF
class UF{
  constructor(N){
    this.count = N;
     /** 生成 N 长度的数组
      * 数组的索引代表对应的触点
      * 数组索引对应存储的值代表所在分量
      * id[0] 表示 0 触点所在的 分量
      *  **/
    this.id = Array(N)
    for(let i =0;i<N;i++)this.id[i]=i;
  }

  find(p){
    throw new Error("子类需要写")
  }

  union(p,q){
    throw new Error("子类需要写")
  }
  connected(p,q){
    return find(p)==find(q)
  }
}
```

#### quick-find

思想:
: 保证当且仅当 id[p] 等于 id[q] 是连通的.
也就是说 同一个连通分量里的所有触点的**id[触点]** 都是相同的
当查找他是属于那个分量的时候直接可以通过id[触点]就直接找到了它的根
在面对union操作的时候就需要遍历数组把属于另一个分量的触点全部合并

```js QuickFindUF
class QuickFindUF extends UF{
  constructor(...args){
    super(args)
  }
  find(p){
    // 直接返回 p 所在的分量
    return this.id[p];
  }
  union(p,q){
    //获取p 和q 所在的连通分量
    const pId = this.find(p)
    const qId = this.find(q)

    // 如果p和q 在一个分量不做操作
    if(pId === qId)return;

    //将p的分量命名为q 的分量
    for (let index = 0; index < this.id.length; index++) {
        if(this.id[index]===pId)this.id[index]=qId;      
    }
    this.count--;
  }
}

//test 

function testQuickFindUF(){
  const N = 10;
  const paramStr = `4 3 3 8 6 5 9 4 2 1 8 9 5 0 7 2 6 1 1 0 6 7`;
  const param = paramStr.split(" ").map(item=>{return parseInt(item)});
  const uf = new QuickFindUF(N);
  for(let i = 0;i<param.length-1;i+=2){
    const p = param[i];
    const q = param[i+1];
    uf.union(p,q)
    console.log(p + " " +q+" "+uf.id);
  }

  console.log(uf.count+" components")
}
```

![quick-find轨迹](/algorithm-learn/images/quick-find-guiji.png)

分析：
: 这种算法 find 的速度很快，只访问了一次数组
但是在union 操作的时候会遍历一遍数组，根据成本模型，我们看这个循环
循环中 if 中的条件，访问了一次数组，后面的赋值语句访问了一边数组
如果 if 中的条件都不成立也就是最好的情况下我们需要访问 2 + N + 1 次数组
如果 if 中的条件成立了就需要访问 2 + 2N  - 1 次数组了

<div class="note">
  最后加的一是触点本身的时候，减的一也是
</div>

#### quick-union

思想:
: 添加一种 **连接** 关系,每个触点都连接它上一个触点或者他本身
`id[0] = 0` 的意思就是 触点 0 连接自己
`id[0] = 1` 的意思就是 触点 0 连接 1 这个触点
当实现 find 方法的时候，需要访问当前 触点 的上级触点，这样逐级向上查询，最后到达所在的根节点
需要用 union 来维护这种关系，在union中我们找到两个触点的跟触点，然后把一个根触点放到另一个根触点分量中
`id[p] = q` 把 触点 p 的根触点 赋值为 q
```js quick union
class QuickUnionUF extends UF{
  constructor(...args){
    super(args)
  }
  
  find(p){
    // 寻找触点的根节点
    while(p!==this.id[p])p=this.id[p];
    return p
  }
  union(p,q){
    //获取p 和q 所在的连通分量
    const pRoot = this.find(p)
    const qRoot = this.find(q)

    // 如果p和q 在一个分量不做操作
    if(pRoot === qRoot)return;

    //将 p 的根节点挂到 q 的分量上
    this.id[pRoot] = this.id[qRoot]
    this.count--;
  }
}

function testQuickUnionUF(){
  const N = 10;
  const paramStr = `4 3 3 8 6 5 9 4 2 1 8 9 5 0 7 2 6 1 1 0 6 7`;
  const param = paramStr.split(" ").map(item=>{return parseInt(item)});
  const uf = new QuickUnionUF(N);
  for(let i = 0;i<param.length-1;i+=2){
    const p = param[i];
    const q = param[i+1];
    uf.union(p,q)
    console.log(p + " " +q+" "+uf.id);
  }

  console.log(uf.count+" components")
}
testQuickUnionUF();
```

分析：
: quick-union 构造了一个森林,每个 **分量** 代表一个树
：相比与 quick-find 来说 quick-union 仿佛快了,因为 quick-union 对于 find 的操作,访问数组的次数取决于树的深度,当树的深度越浅的时候访问树的次数越少,树的深度的大小取决与输入,当输入的时候一直往一个触点上延伸触点,得到的就是一个链,换句话来说就是,每次都在大树上挂小树的,所以在最坏的情况下会访问次数能达到 平方级别 

思考:
: quick-union 的速度和树的深度有关,如果有一种方法可以减少树的深度,那么是不是就快了呢? 是的. 下面学习关于加权的quick-union

#### quick-union

思路:
: 根据上文知道树的深度决定了 quick-union 的速度,所以可以添加一个数组 sz ,和 id 一样数组的索引代表这触点.
数组的内容代表当前触点所在树的深度.在 union 操作的时候,把权重大的树挂载到权重小的树上面,这样树的深度就会减少很多

```js weight-quick-union

class WeightQuickUnionUF extends UF{
  constructor(...args){
    super(args)
    const [N] = args;
    this.sz = Array(N).fill(1);
    console.log(this.sz,args)
  }
  
  find(p){
    // 寻找触点的根节点
    while(p!==this.id[p])p=this.id[p];
    return p
  }
  union(p,q){
    //获取p 和q 所在的连通分量
    const pRoot = this.find(p)
    const qRoot = this.find(q)

    // 如果p和q 在一个分量不做操作
    if(pRoot === qRoot)return;

    //按照权重去把小树挂在大树上
    if(this.sz[pRoot]<this.sz[qRoot]){
      this.id[pRoot] = this.id[qRoot]
      // 更新 q 根节点的权重
      this.sz[qRoot]+=this.sz[pRoot]
    }else{
      this.id[qRoot] = this.id[pRoot]
      this.sz[pRoot]+=this.sz[qRoot] 
    }
    this.count--;
  }
}

function testWeightQuickUnionUF(){
  const N = 10;
  const paramStr = `4 3 3 8 6 5 9 4 2 1 8 9 5 0 7 2 6 1 1 0 6 7`;
  const param = paramStr.split(" ").map(item=>{return parseInt(item)});
  const uf = new WeightQuickUnionUF(N);
  for(let i = 0;i<param.length-1;i+=2){
    const p = param[i];
    const q = param[i+1];
    uf.union(p,q)
    console.log(p + " " +q+" "+uf.id,uf.sz);
  }

  console.log(uf.count+" components")
}
testWeightQuickUnionUF()
```

命题:
: 对于 N 个触点,加权 quick-union 算法构造的森林中的任意节点的深度最多为 lgN

推论:
: 对于加权 quick-union 算法和 N 个触点,在最坏的情况下 find()、connected()、和union() 的成本的增长数量级为 logN

分析:
: 加权算法处理 N 个触点和 M 条连接时最多访问数组 cMlgN 次,其中 c 为常数.


 #### 最优算法-路径压缩算法

 书中说到一种简单的路径压缩算法.属于最优算法的一种.
 
 思路:
 : 理想情况下,我们希望每个节点都直接连接到它的根节点上,这样书的深度就最小,但是我们又不想想quick-find那样大量修改链接.
 : 接近这种理想状态的方式很简单,在检查节点的时候我们将它们直接连到根节点.
 : 要实现路径压缩算法,只需要为 find() 添加一个循环,将路径上遇到的所有节点都直接链接到根节点.
 : 这样我们就能得到一个几乎扁平化的树
