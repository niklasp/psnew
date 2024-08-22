import { visit } from "unist-util-visit";

export function remarkAdmonitions() {
  return (tree) => {
    console.log("tree", tree);
    visit(tree, (node) => {
      if (
        node.type === "paragraph" &&
        node.children &&
        node.children[0] &&
        node.children[0].type === "text"
      ) {
        const match = node.children[0].value.match(
          /^:::(info|warning|danger)\s*$/
        );
        if (match) {
          const type = match[1];
          const admonitionContent = [];
          let endIndex = tree.children.indexOf(node) + 1;

          for (let i = endIndex; i < tree.children.length; i++) {
            const child = tree.children[i];
            if (
              child.type === "paragraph" &&
              child.children[0] &&
              child.children[0].type === "text" &&
              child.children[0].value === ":::"
            ) {
              endIndex = i;
              break;
            }
            admonitionContent.push(child);
          }

          const admonition = {
            type: "admonition",
            data: {
              hName: "Admonition",
              hProperties: { type }
            },
            children: admonitionContent
          };

          tree.children.splice(
            tree.children.indexOf(node),
            endIndex - tree.children.indexOf(node) + 1,
            admonition
          );
          return [visit.SKIP, tree.children.indexOf(admonition)];
        }
      }
    });
  };
}

export default remarkAdmonitions;
