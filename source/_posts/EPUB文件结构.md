---
title: EPUB文件结构
tags:
  - 文件格式
  - EPUB
  - XML
  - 技术知识
categories: 技术知识
abbrlink: epub-structure
date: 2024-10-30
---

EPUB 是一种广泛使用的电子书格式。实际上是一个 ZIP 压缩包，包含了一系列文件和目录，可以任何 ZIP 解压工具解压缩。

以下是常见的文件结构：

> 虽然 EPUB 格式有一定的规范，但并没有严格要求必须使用特定的目录名。出版商或开发者可以根据需要自定义目录结构，只要在`container.xml`文件中正确引用这些路径即可。开发者可能会在 epub 文件中添加一些图片或脚本文件等，可能会导致结构看起来不同。

1. **MIME Type 文件**

   - 文件名：`mimetype`
   - 内容：`application/epub+zip`
   - 说明：这是一个文本文件，必须是压缩包中的第一个文件。它声明了文件的 MIME 类型。

2. **META-INF 目录**

   - 目录名：`META-INF`
   - 说明：这个目录包含了元数据文件。

     - `container.xml`：定义了内容文件的路径，`container.xml` 文件是 EPUB 文件结构中的关键文件，通过解析 `container.xml` 文件中的 `full-path` 属性，可以找到并加载电子书的内容文件（`opf` 文件）。只要这个文件存在并且路径正确，电子书阅读器就能正确解析和显示电子书内容。

3. **OEBPS 目录**

   - 目录名：`OEBPS`（或其他名称，这个目录也可能不存在）
   - 说明：这个目录包含了电子书的主要内容。

     - `package.opf`（或`content.opf`）：定义了电子书的结构和内容的元数据。
     - `toc.xhtml/toc.ncx`：定义了电子书的目录结构。
     - 各种 XHTML 文件：电子书的主要内容。
     - 资源文件：如图像、CSS 样式表、JavaScript 文件等。

4. **toc.ncx**

   > Table of Contents 的缩写，定义电子书的目录和导航结构

   application/x-dtbncx+xml 是一种 MIME 类型，通常用于表示一种特定格式的 XML 文件，称为 NCX（Navigation Center eXtended），通常包含以下元素

   - `<navMap>`：包含所有导航点的容器。
   - `<navPoint>`：表示一个导航点（例如章节或节）。
   - `<navLabel>`：包含导航点的可读文本。
   - `<content>`指定导航点对应的内容文件和位置

### Epub 解析

本质上我们都是在解析 xml 或者 html 文件，所以第一种方法比较直观，在获取到 Dom 并解析后，直接通过 querySelector 找到相应的元素并获取内容即可。这种方法存在的问题是，Epub 文件结构与指定的结构相同，部分 Epub 文件由于制作时间过早，或者制作者的规范问题，可能会导致解析失败。

第二种方法是使用 xpath 解析，这种方法的优点是，可以解析出 epub 文件中的所有元素，而且可以根据具体的命名空间直接查找到想要的内容（这就需要对 Epub 文件有更深的认知，同时需要了解 xpath 的使用方法，这里也是我看了部分 Epub Cfi 解析的项目代码后，才了解到）。

### CFI

CFI 是 Content Fragment Identifier 的缩写，是一种用于标识电子书内容片段的标识符。CFI 可以用于在电子书中定位特定的内容，例如在电子书中跳转到特定的页面或章节，在保存阅读进度或者书签时经常使用。

但个人了解下来，可能因为制作规范一直没有变更的原因，很多库停留在 jQuery 的时代，部分近几年的库也是根据之前的库修改而来，也没有相对详细的文档，不同项目解析的结构也差距甚远，对于解析结果没有明确的说明，需要对照 Epub 文件内容和源码才能知道表示的意思。

[epub2 与 epub3 的区别](https://www.pen2publishing.com/difference-between-epub-and-epub3/)
