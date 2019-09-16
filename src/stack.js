const LinkNode = require('./node')

module.exports= class Stack {
  constructor() {
    this.first =null; //栈顶
    this.N = 0;
  }

  //入栈
  push(item) {
      const oldNode =this.first;
      this.first = new LinkNode(item, null)
      this.first.next=oldNode ;
    this.N++;
  }

  isEmpty() {
    return this.N === 0;
  }

  pop() {
    const node = this.first;
    this.first = this.first.next;
    this.N--;
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

const stack = new Stack();
stack.push('a');
stack.push('b');
for (let node of stack) {
  console.log(node)
}
// console.log(stack.pop())
stack.toString()
console.log()