const Mutations = {
  createItem(parent, args, ctx, info){
    // TODO: Auth check
    console.log({args, info})
    return ctx.db.mutation.createItem({
      data: {...args}
    }, info)
  }
};

module.exports = Mutations;
