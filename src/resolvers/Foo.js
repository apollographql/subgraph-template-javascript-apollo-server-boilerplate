module.exports = {
  Foo: {
    __resolveReference(parent, context) {
      // Access datasources on the context
      //
      // return context.foos.getFoo(parent.id)
      return { id: "1", name: "Name" };
    },
  },
};
