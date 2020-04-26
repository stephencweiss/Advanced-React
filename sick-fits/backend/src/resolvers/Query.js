const { forwardTo } = require("prisma-binding");

const Query = {
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  identity: function identity(parent, args, ctx, info) {
    const { userId } = ctx.request;

    // returns the user based on the userId, else null
    if (!userId) return null;
    return ctx.db.query.user(
      {
        where: { id: userId }
      },
      info
    );
  }
};

module.exports = Query;
