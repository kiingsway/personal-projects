module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "require <button> and <Buttons> elements to have a 'title' attribute",
      category: "Best Practices",
      recommended: false
    },
    fixable: "code"
  },
  create: context => {
    return {
      JSXOpeningElement: node => {
        if (node.type === "JSXOpeningElement") {

          const { name, attributes, range } = node;
          const tagName = name.name || name.object.name;

          const hasTitleAttribute = attributes.some(({ type, name }) =>
            type === "JSXAttribute" && name.name === "title"
          );

          const isBtn = tagName === "button" || tagName === "Buttons";

          if (isBtn && !hasTitleAttribute) {
            context.report({
              node, message: `The <${tagName}> element should have a 'title' attribute.`,
              fix: function (fixer) {
                const [start, end] = range;
                return fixer.insertTextAfterRange([start, end - 1], ` title=""`);
              }
            });
          }
        }
      }
    };
  }
};