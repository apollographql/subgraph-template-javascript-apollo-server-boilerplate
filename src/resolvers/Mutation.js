module.exports = {
  Mutation: {
    foo(parent, { id }, context) {
      // Access datasources on the context
      //
      // return context.foos.getFoo(args.id)
      return { id: "1", name: "Name" };
    },
  },
};
