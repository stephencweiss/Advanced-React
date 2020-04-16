const Mutations = {
  createItem(parent, args, ctx, info) {
    // TODO: Auth check
    return ctx.db.mutation.createItem(
      {
        data: { ...args }
      },
      info
    );
  },
  updateItem(parent, args, ctx, info) {
    // TODO: Auth check
    const data = { ...args }; // needs to be in ItemUpdateInput shape
    delete data.id;
    return ctx.db.mutation.updateItem(
      {
        data,
        where: { id: args.id }
      },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    // TODO: Auth check
    const where = { id: args.id };
    // find item
    const item = await ctx.db.query.item(
      { where },
      `{
        id
        title
      }`
    ); // note: here the second argument is a "raw" graphql query in lieu of using info - which is the query from the front end
    // check if they have permissions
    // delete if permitted
    return ctx.db.mutation.deleteItem({where}, info);
  }
};

module.exports = Mutations;
