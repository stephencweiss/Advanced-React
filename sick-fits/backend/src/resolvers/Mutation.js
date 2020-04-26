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
  },

  async signin(parent, { email, password }, ctx, info) {
    email = email.toLowerCase();
    // 1. check if a user exists
    const user = await ctx.db.query.user(
      { where: { email } },
      `{id email name password}`
    );
    // 1.error - if not, throw an error
    if(!user){
      throw new Error(`No user found with email,${email}`)
    }
    // 2. check if the password provided is correct
    const validPassword = await bcrypt.compare(password, user.password)
    // 2.error - if not, throw an error
    if (!validPassword) {
      throw new Error(`Incorrect password`)
    }

    // 3. generate a jwt and palce into the cookie of response
    const token = jwt.sign({userId: user.id}, process.env.APP_SECRET)
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: ONE_YEAR
    })
    // 4. return the user
    return user;
  }
};

module.exports = Mutations;
