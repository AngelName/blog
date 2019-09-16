const LinkNode = require('./node')


module.exports =  class Queue {
  constructor() {
    this.first = null; // 队头
    this.last = null; // 队尾
    this.N = 0;
  }

  //入队
  enqueue(item) {
    let oldNode = this.last;
    this.last = new LinkNode(item,null);
    if(this.isEmpty())this.first = this.last;
    else{
      oldNode.next = this.last;
    }
    this.N++;
  }

  isEmpty() {
    return this.N === 0;
  }
  // 出队
  dequeue() {
    const node = this.first;
    this.first = this.first.next;
    this.N--;
    if(this.isEmpty())this.last=null;
    return node.item;
   
  }


  toString() {
    let node = this.first;
    let str = ""
    while (node !== null) {
      str += node.item
      node = node.next;
      if (node) { str += " - " }
    }
    console.log(str)
  }

  [Symbol.iterator]() {
    var iterator = { next: next };
    let node = this.first;
    let result = {};
    function next() {
      if (node) {
        result = { done: false, value: node.item }
        node = node.next;
      } else {
        result = { done: true }
      }
      return result;
    }
    return iterator;
  }
}

const queue = new Queue();
queue.enqueue('a');
queue.enqueue('b');
queue.toString()
for (let node of queue) {
  console.log(node)
}
console.log()
