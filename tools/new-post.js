#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline/promises');
const { stdin, stdout } = require('node:process');

const postsDirectory = path.join(__dirname, '..', 'source', '_posts');
const args = process.argv.slice(2);

function option(name) {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : '';
}

function positionalTitle() {
  const optionIndex = args.findIndex((arg) => arg.startsWith('--'));
  const titleArgs = optionIndex < 0 ? args : args.slice(0, optionIndex);
  return titleArgs.join(' ').trim();
}

function safeFilename(value) {
  return value
    .replace(/[\\/:*?"<>|]/g, '-')
    .replace(/\s+/g, ' ')
    .replace(/[. ]+$/g, '')
    .trim();
}

function yamlString(value) {
  return `'${value.replaceAll("'", "''")}'`;
}

function formatDate(date) {
  const pad = (value) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

async function main() {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  try {
    const title = positionalTitle() || (await rl.question('文章标题：')).trim();
    if (!title) throw new Error('文章标题不能为空');

    const filenameInput = option('filename') || (await rl.question(`文件名（默认 ${title}.md）：`)).trim();
    const filename = safeFilename(filenameInput || title);
    if (!filename) throw new Error('文件名不能为空');

    const category = option('category') || (await rl.question('分类（可留空）：')).trim();
    const tagsInput = option('tags') || (await rl.question('标签（用英文逗号分隔，可留空）：')).trim();
    const abbrlink = option('abbrlink') || (await rl.question(`固定链接（默认 ${filename}）：`)).trim() || filename;
    const tags = tagsInput.split(',').map((tag) => tag.trim()).filter(Boolean);
    const postPath = path.join(postsDirectory, `${filename}.md`);

    if (fs.existsSync(postPath)) throw new Error(`文章已存在：${postPath}`);

    const frontMatter = [
      '---',
      `title: ${yamlString(title)}`,
      'tags:',
      ...tags.map((tag) => `  - ${yamlString(tag)}`),
      `categories: ${category}`,
      `abbrlink: ${abbrlink}`,
      `date: ${formatDate(new Date())}`,
      '---',
      '',
      '',
    ].join('\n');

    fs.mkdirSync(postsDirectory, { recursive: true });
    fs.writeFileSync(postPath, frontMatter, { encoding: 'utf8', flag: 'wx' });
    console.log(`\n已创建：${path.relative(process.cwd(), postPath)}`);
  } finally {
    rl.close();
  }
}

main().catch((error) => {
  console.error(`创建失败：${error.message}`);
  process.exitCode = 1;
});
