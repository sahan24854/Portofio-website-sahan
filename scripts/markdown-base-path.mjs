/** Prefix root-relative Markdown links and images for a project Pages deployment. */
export default function markdownBasePath(base = '') {
  return {
    name: 'portfolio-base-path',
    element: {
      filter: ['a', 'img'],
      visit(node, context) {
        for (const attribute of ['href', 'src']) {
          const value = node.properties?.[attribute];
          if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) context.setProperty(node, attribute, base.replace(/\/$/, '') + value);
        }
      }
    }
  };
}
