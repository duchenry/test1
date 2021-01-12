function mySet() {
  let collection = [];

  this.has = (element) => {
    return collection.indexOf(element) !== -1;
  };

  this.values = () => {
    return collection;
  };

  this.add = (element) => {
    if (!this.has(element)) {
      collection.push(element);
      return true;
    }
    return false;
  };

  this.remove = (element) => {
    if (this.has(element)) {
      let index = collection.indexOf(element);
      collection.splice(index, 1);
      return true;
    }
    return false;
  };

  this.size = () => {
    return collection.length;
  };

  this.union = (otherSet) => {
    let unionSet = new mySet();
    let firstSet = this.values();
    let secondSet = otherSet.values();
    firstSet.forEach(function (e) {
      unionSet.add(e);
    });
    secondSet.forEach(function (e) {
      unionSet.add(e);
    });
    return unionSet;
  };

  /* find the same value of otherSet and firstSet, afterthat this values will be stored in intersectionSet */
  this.intersection = (otherSet) => {
    let intersectionSet = new mySet();
    let firstSet = this.values();
    firstSet.forEach(function (e) {
      if (otherSet.has(e)) {
        intersectionSet.add(e);
      }
    });
    return intersectionSet;
  };

  this.difference = (otherSet) => {
    let differenceSet = new mySet();
    let firstSet = this.values();
    firstSet.forEach(function (e) {
      if (!otherSet.has(e)) {
        differenceSet.add(e);
      }
    });
    return differenceSet;
  };

  this.subset = (otherSet) => {
    let firstSet = this.values();
    return firstSet.every((value) => otherSet.has(value));
  };
}

let soSet1 = new mySet();
let soSet2 = new mySet();

soSet1.add(1);
soSet1.add(2);
soSet1.add(3);
soSet1.add(1);
soSet2.add(1);
soSet2.add(2);
soSet2.add(3);
soSet2.add(4);

console.log(soSet1.subset(soSet2));
console.log(soSet1.values());
