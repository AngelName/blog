class Stack {


  push(item){
    this.items[this.N++]=item;
  }
  pop(){
     return this.items[--this.N]
  }
  constructor(){
    this.items = []
    this.N = 0
  }
  toString(){
    
    console.log(this.items,this.N)
  }
}
const stack = new Stack()
stack.push(1)
stack.toString()
stack.pop()
stack.toString()