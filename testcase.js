var LRUCache = require("./lrucache");

var lruCache = new LRUCache(3);

lruCache.put("1", 100);
lruCache.put("2", 1000);
lruCache.put("3", 599);
console.log("First time --------");
lruCache.printLRU();

lruCache.get("1");
console.log("Second time --------");
lruCache.printLRU();

lruCache.put("4", 1199);
console.log("Third time --------");
lruCache.printLRU();

lruCache.reset();

lruCache.put("1", 100);
console.log("Fourth time --------");
lruCache.printLRU();
