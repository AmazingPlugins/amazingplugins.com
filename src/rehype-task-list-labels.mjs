// Markdown task lists (`- [ ] item`) render a bare checkbox with no name; give each one its item text.
const isList = (node) => node.tagName === 'ul' || node.tagName === 'ol';
const text = (node) => (node.type === 'text' ? node.value : isList(node) ? '' : (node.children ?? []).map(text).join(''));
const findBox = (node) => {
  for (const child of node.children ?? []) {
    if (child.tagName === 'input') return child;
    if (!isList(child)) {
      const box = findBox(child);
      if (box) return box;
    }
  }
};

export default function rehypeTaskListLabels() {
  return (tree) => {
    const walk = (node) => {
      if (node.tagName === 'li' && node.properties?.className?.includes('task-list-item')) {
        const box = findBox(node);
        if (box) box.properties.ariaLabel = text(node).replace(/\s+/g, ' ').trim();
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}
