module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Require functions to have a return type",
      category: "TypeScript",
      recommended: false
    },
    fixable: "code",
    schema: []
  },
  create: context => {

    function checkFunction(node) {
      if ((node.type === "FunctionDeclaration" || node.type === "ArrowFunctionExpression") && !node.returnType) {
        const loc = node.id?.loc || undefined;
        if (!loc) return;
        context.report({
          loc, message: "Function must have a return type.",
          fix: function (fixer) {
            return fixer.insertTextAfterRange([node.id.range[0], node.id.range[1] + 2], ": void");
          }
        });
      }
    }

    return {
      FunctionDeclaration: checkFunction,
      ArrowFunctionExpression: checkFunction
    };
  }
};
