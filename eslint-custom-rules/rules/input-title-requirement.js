module.exports = {
  meta: {
    type: "suggestion",
    fixable: "code",
    docs: {
      description: "require <Input> elements to have a 'title' or 'placeholder' attribute.",
      category: "Best Practices",
      recommended: false
    },
  },
  create: context => {
    return {
      JSXOpeningElement: node => {
        if (node.type === "JSXOpeningElement") {

          const { name, attributes, range } = node;
          const tagName = name.name || name.object.name;

          const has_tit_plach_attr = attributes.some(({ type, name }) =>
            type === "JSXAttribute" && (name.name === "title" || name.name === "placeholder")
          );

          const is_the_element = tagName === "Input";

          if (is_the_element && !has_tit_plach_attr) {
            context.report({
              node, message: `The <${tagName}> element should have a 'title' or 'placeholder' attribute.`,
              fix: function (fixer) {
                const [start, end] = range;
                return fixer.insertTextAfterRange([start, end - 1], ` placeholder=""`);
              }
            });
          }
        }
      }
    };
  }
};