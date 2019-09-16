module.exports= class LinkNode {
  constructor(item, node) {
    this.item = item;
    this.next = node;
  }
}
// 双向链表节点
class DoubleLinkNode {
  constructor(preNode, item, nextNode) {
    this.pre = preNode;
    this.item = item;
    this.next = nextNode;
  }
}