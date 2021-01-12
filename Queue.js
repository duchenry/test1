function Queue() {
  let collection = [];
  this.print = function () {
    console.log(collection);
  };
  this.enqueue = function (e) {
    collection.push(e);
  };
  this.dequeue = function () {
    return collection.shift();
  };
  this.front = function () {
    return collection[0];
  };
  this.size = function () {
    return collection.length;
  };
  this.isEmpty = function () {
    return collection.length === 0;
  };
}

let a = new Queue();
a.enqueue(1);
a.enqueue(2);
a.enqueue(3);
a.dequeue();
console.log(a.front());
console.log(a.size());
a.isEmpty();
a.print();

function PriorityQueue() {
  let collection = [];
  this.print = function () {
    console.log(collection);
  };
  this.enqueue = function (e) {
    if (this.isEmpty()) {
      collection.push(e);
    } else {
      let added = false;
      for (let i = 0; i < collection.length; i++) {
        if (e[1] < collection[i][1]) {
          collection.splice(i, 0, e);
          added = true;
          break;
        }
      }
      if (!added) {
        collection.push(e);
      }
    }
  };
  this.dequeue = function () {
    let value = collection.shift();
    return value[0];
  };
  this.front = function () {
    return collection[0];
  };
  this.size = function () {
    return collection.length;
  };
  this.isEmpty = function () {
    return collection.length === 0;
  };
}

let value = new PriorityQueue();
value.enqueue(["Henry", 1]);
value.enqueue(["Nasty", 2]);
value.enqueue(["Brew", 2]);
value.enqueue(["Thomas", 1]);
value.print();
