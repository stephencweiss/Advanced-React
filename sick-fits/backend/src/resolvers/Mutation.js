const Mutations = {
  createItem(parent, args, ctx, info){
    // TODO: Auth check
    return ctx.db.mutation.createItem({
      data: {...args}
    }, info)
  },
  updateItem(parent, args, ctx, info){
    // TODO: Auth check
    const data = {...args} // needs to be in ItemUpdateInput shape
    delete data.id
    return ctx.db.mutation.updateItem({
      data,
      where: {id: args.id}
    }, info)
  }

};

module.exports = Mutations;
