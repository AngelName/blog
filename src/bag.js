const LinkNode = require('./node')

module.exports = class Bag {
  constructor() {
    this.first =null; 
    this.N = 0;
  }

  add(item) {
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

const bag = new Bag();
bag.add('a');
bag.add('b');
for (let node of bag) {
  console.log(node)
}
bag.toString()
console.log()
