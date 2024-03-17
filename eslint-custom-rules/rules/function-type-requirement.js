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
      if ((node.type === "FunctionDeclaration" || node.type === "ArrowFunctionExpression") && !node.returnType)
        context.report({ node, message: "Function must have a return type." });
    }

    return {
      FunctionDeclaration: checkFunction,
      ArrowFunctionExpression: checkFunction
    };
  }
};

