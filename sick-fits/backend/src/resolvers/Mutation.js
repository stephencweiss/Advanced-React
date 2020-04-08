const Mutations = {
  createDog: function(parent, args, ctx, info) {
    global.dogs = global.dogs || [];
    const dog = { name: args.name, breed: args.breed };
    global.dogs.push(dog);
    return dog;
  }
};

module.exports = Mutations;
