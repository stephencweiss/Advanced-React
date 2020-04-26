const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ONE_YEAR = 1000 * 60 * 60 * 24 * 365;

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
    return ctx.db.mutation.deleteItem({ where }, info);
  },

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase(); // avoid class of errors due to inconsistent casing
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] } //uses a setter because permissions is an enum
        }
      },
      info
    );
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: ONE_YEAR
    });
    return user;
  }
};

module.exports = Mutations;
