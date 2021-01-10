class LRUNode {
  constructor(key, value, next = null, previous = null) {
    this.key = key;
    this.value = value;
    this.previous = previous;
    this.next = next;
  }
}

module.exports = LRUNode;
