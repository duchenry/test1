function LinkedList() {
  let length = 0;
  let head = null;

  let Node = function (e) {
    this.e = e;
    this.next = null;
  };

  this.size = function () {
    return length;
  };

  this.head = function () {
    return head;
  };

  this.add = function (e) {
    let node = new Node(e);
    if (head === null) {
      head = node;
    } else {
      currentNode = head;

      while (currentNode.next) {
        currentNode = currentNode.next;
      }

      currentNode.next = node;
    }

    length++;
  };

  this.remove = function (e) {
    let currentNode = head;
    let previousNode;
    if (currentNode.e === e) {
      head = currentNode.next;
    } else {
      while (currentNode.e !== e) {
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      previousNode.next = currentNode.next;
    }
    length--;
  };

  this.isEmpty = function () {
    return length === 0;
  };

  this.indexOf = function (e) {
    let currentNode = head;
    let index = -1;

    while (currentNode) {
      index++;
      if (currentNode.e === e) {
        return index;
      }
      currentNode = currentNode.next;
    }
    return -1;
  };

  this.elementAt = function (index) {
    let currentNode = head;
    let count = 0;
    while (count < index) {
      count++;
      currentNode = currentNode.next;
    }
    return currentNode.e;
  };

  this.addAt = function (index, e) {
    let node = new Node(e);
    let currentNode = head;
    let previousNode;
    let currentIndex = 0;

    if (index > length) {
      return false;
    }

    if (index === 0) {
      node.next = currentNode;
      head = node;
    } else {
      while (currentIndex < index) {
        currentIndex++;
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      node.next = currentNode;
      previousNode.next = node;
    }
    length++;
  };
}
