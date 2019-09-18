class UF{
  
  constructor(N){
    this.count = N;
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


//test 

function main(){
  const N = 10;
  const param = `4 3 3 8 6 5 9 4 2 1 8 9 5 0 7 2 6 1 1 0 6 7`.split(" ").map(item=>{return parseInt(item)});
  const uf = new UF(N);
  for(let i = 0;i<N-1;i+=2){
    const p = param[i];
    const q = param[i+1];
    uf.union(p,q)
    console.log(p + " " +q);
  }

  console.log(uf.count+"components")
}

class QuickFindUF extends UF{
  constructor(...args){
    super(args)
  }
  find(p){
    return this.id[p]
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
  const param = `4 3 3 8 6 5 9 4 2 1 8 9 5 0 7 2 6 1 1 0 6 7`.split(" ").map(item=>{return parseInt(item)});
  const uf = new QuickFindUF(N);
  for(let i = 0;i<param.length-1;i+=2){
    const p = param[i];
    const q = param[i+1];
    uf.union(p,q)
    console.log(p + " " +q+" "+uf.id);
  }

  console.log(uf.count+" components")
}
// testQuickFindUF();
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
  const param = `4 3 3 8 6 5 9 4 2 1 8 9 5 0 7 2 6 1 1 0 6 7`.split(" ").map(item=>{return parseInt(item)});
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
  const param = `4 3 3 8 6 5 9 4 2 1 8 9 5 0 7 2 6 1 1 0 6 7`.split(" ").map(item=>{return parseInt(item)});
  const uf = new WeightQuickUnionUF(N);
  for(let i = 0;i<param.length-1;i+=2){
    const p = param[i];
    const q = param[i+1];
    uf.union(p,q)
    console.log(p + " " +q+" "+uf.id,uf.sz);
  }

  console.log(uf.count+" components")
}
testWeightQuickUnionUF();