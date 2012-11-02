exports.actions = function(req, res, ss) {
  return {
    push:function(key) {
      ss.publish.all('queue.push', key);
      res(true);
    }
  }
};
