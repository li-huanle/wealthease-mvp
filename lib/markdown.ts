// Minimal markdown-to-HTML renderer for blog content (trusted, in-repo text).

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const inline = (raw: string) =>
  escapeHtml(raw)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2" class="text-primary-600 underline hover:text-primary-700">$1</a>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/(^|[^*])\*([^*\s][^*]*?)\*(?!\*)/g, '$1<em>$2</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded text-sm">$1</code>');

const splitRow = (line: string) =>
  line.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

export function renderMarkdown(content: string): string {
  // The page already shows the post title, so drop a leading H1.
  const lines = content.replace(/\r\n/g, '\n').replace(/^\s*# [^\n]*\n/, '').split('\n');
  const out: string[] = [];
  let i = 0;

  const isBlockStart = (l: string) =>
    /^(#{1,4} |```|- |\* |\d+\. |> |---+$)/.test(l) || (l.startsWith('|') && l.includes('|', 1));

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    if (line.startsWith('```')) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++]);
      i++;
      out.push(`<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-6"><code class="text-sm">${escapeHtml(code.join('\n'))}</code></pre>`);
      continue;
    }

    const h = line.match(/^(#{1,4}) (.*)$/);
    if (h) {
      const level = h[1].length;
      const cls = [
        'text-4xl font-bold text-gray-900 mt-10 mb-6',
        'text-3xl font-bold text-gray-900 mt-12 mb-6',
        'text-2xl font-bold text-gray-900 mt-8 mb-4',
        'text-xl font-bold text-gray-900 mt-6 mb-3',
      ][level - 1];
      const tag = level === 1 ? 'h2' : `h${level}`;
      out.push(`<${tag} class="${cls}">${inline(h[2])}</${tag}>`);
      i++;
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      out.push('<hr class="my-10 border-gray-200" />');
      i++;
      continue;
    }

    if (/^(- |\* )/.test(line) || /^\d+\. /.test(line)) {
      const ordered = /^\d+\. /.test(line);
      const marker = ordered ? /^\d+\. / : /^(- |\* )/;
      const items: string[] = [];
      while (i < lines.length && marker.test(lines[i])) {
        let item = lines[i++].replace(marker, '');
        while (i < lines.length && lines[i].trim() && /^\s+\S/.test(lines[i]) && !/^\s*(- |\* |\d+\. )/.test(lines[i])) {
          item += ' ' + lines[i++].trim();
        }
        items.push(`<li class="mb-2">${inline(item)}</li>`);
      }
      const tag = ordered ? 'ol' : 'ul';
      const style = ordered ? 'list-decimal' : 'list-disc';
      out.push(`<${tag} class="${style} list-outside space-y-1 mb-6 ml-6 text-lg text-gray-700">${items.join('')}</${tag}>`);
      continue;
    }

    if (line.startsWith('|') && i + 1 < lines.length && /^\|?[\s:|-]+\|[\s:|-]*$/.test(lines[i + 1])) {
      const head = splitRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(splitRow(lines[i++]));
      out.push(
        `<div class="overflow-x-auto mb-6"><table class="min-w-full border border-gray-200 text-left text-gray-700"><thead class="bg-gray-50"><tr>${head
          .map((c) => `<th class="px-4 py-2 border-b font-semibold">${inline(c)}</th>`)
          .join('')}</tr></thead><tbody>${rows
          .map((r) => `<tr>${r.map((c) => `<td class="px-4 py-2 border-b">${inline(c)}</td>`).join('')}</tr>`)
          .join('')}</tbody></table></div>`
      );
      continue;
    }

    if (line.startsWith('> ')) {
      const q: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) q.push(lines[i++].slice(2));
      out.push(`<blockquote class="border-l-4 border-primary-300 pl-4 italic text-gray-600 mb-6">${inline(q.join(' '))}</blockquote>`);
      continue;
    }

    const para: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i])) para.push(lines[i++]);
    out.push(`<p class="text-lg text-gray-700 leading-relaxed mb-6">${inline(para.join(' '))}</p>`);
  }

  return out.join('');
}
