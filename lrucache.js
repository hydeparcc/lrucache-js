var LRUNode = require("./lrunode");

class LRUCache {
  constructor(size, head = null, tail = null) {
    this.currSize = 0;
    this.maxSize = size;
    this.head = head;
    this.tail = tail;
    this.lrumap = new Map();
  }

  /**
   * Function to get value of a key in LRUCache
   * @param {*} key
   */
  get(key) {
    if (this.lrumap.has(key)) {
      var returnNode = this.lrumap.get(key);

      /**
       *  if the node is a tail node then we will make it head node and make the tail.previous node as the new tail node
       */
      if (returnNode.next == null) {
        returnNode.previous.next = null;
        this.head.previous = returnNode;
        returnNode.next = this.head;
        this.head = returnNode;
        returnNode.previous = null;
      }

      /**
       * if this is not a head or tail node then delete it and add to head
       */
      if (returnNode.next != null && returnNode.previous != null) {
        returnNode.previous.next = returnNode.next;
        returnNode.next.previous = returnNode.previous;
        this.head.previous = returnNode;
        returnNode.next = this.head;
        this.head = returnNode;
      }
      return returnNode.value;
    }
    return -1;
  }

  /**
   * Function to put value of a key in LRUCache
   * @param {*} key
   * @param {*} value
   */
  put(key, value) {
    /**
     *  checking if the maxSize of LRUCache has reached then we will have to remove a node from the tail
     */
    if (this.currSize == this.maxSize) {
      this.delete(this.tail.key);
    }

    /**
     *  1. check if LRUCache(DLL) is empty
     *  2. If empty then create a new LRUNode and assign head and tail to the node
     *  3. If not empty check if the LRUCache maxSize has reached
     *  4. If maxSize not reached then add the new LRUNode to the tail of LRUCache
     *  5. If maxSize reached then remove the node from the tail, since it is the least recently used and add the new LRUNode to the tail
     *
     * */

    var newNode;

    if (this.head == null) {
      newNode = new LRUNode(key, value);
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode = new LRUNode(key, value);
      this.head.previous = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }

    this.lrumap.set(key, newNode);
    this.currSize += 1;
  }

  /**
   * Function to remove a key from LRUCache
   * @param {*} key
   */
  delete(key) {
    var deleteNode = this.lrumap.get(key);

    if (deleteNode.previous != null) {
      deleteNode.previous.next = deleteNode.next;
    } else {
      /**
       * If deleting head node
       */

      this.head = deleteNode.next;
    }

    if (deleteNode.next != null) {
      deleteNode.next.previous = deleteNode.previous;
    } else {
      /**
       * If deleting tail node
       */
      this.tail = deleteNode.previous;
    }

    /**
     * deleting the key from the map and decrementing current size of the LRUCache
     */
    this.lrumap.delete(key);
    this.currSize -= 1;
  }

  /**
   *  Function to reset the LRUCache and remove all the items from cache
   */
  reset() {
    this.head = null;
    this.tail = null;
    this.currSize = 0;
    this.lrumap.clear();
  }

  /**
   *  Function to iterate and print the key of the LRUCache for unit testing
   */
  printLRU() {
    var itrNode = this.head;
    for (var i = 0; i < this.currSize; i++) {
      console.log(itrNode.key);
      itrNode = itrNode.next;
    }
  }
}

module.exports = LRUCache;
