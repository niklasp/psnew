const { visit } = require("unist-util-visit");

function remarkAdmonitions() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        if (!["info", "warning", "danger"].includes(node.name)) return;

        const data = node.data || (node.data = {});
        const tagName = "Admonition";

        data.hName = tagName;
        data.hProperties = {
          type: node.name,
          ...(node.attributes || {})
        };
      }
    });
  };
}

module.exports = remarkAdmonitions;
