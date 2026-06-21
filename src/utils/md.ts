import { marked } from 'marked';

marked.use({
  useNewRenderer: true,
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      if (!href) return text;
      const isExternal = /^https?:\/\/|^\/\//.test(href);
      let out = `<a href="${href}"`;
      if (title) out += ` title="${title}"`;
      if (isExternal) out += ' target="_blank" rel="noopener noreferrer"';
      out += `>${text}</a>`;
      return out;
    },
  },
});

export { marked };
