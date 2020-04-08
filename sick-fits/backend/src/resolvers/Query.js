const Query = {
  dogs: function(parent, args, ctx, info) {
    return global.dogs || [];
  }
};

module.exports = Query;
