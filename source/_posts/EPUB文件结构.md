---
title: EPUB文件结构
tags:
  - 杂谈
categories: 杂谈
abbrlink: epub-structure
date: 2024-10-30 21:00:00
---
EPUB是一种广泛使用的电子书格式。实际上是一个ZIP压缩包，包含了一系列文件和目录，可以任何ZIP解压工具解压缩。

以下是常见的文件结构：

> 虽然EPUB格式有一定的规范，但并没有严格要求必须使用特定的目录名。出版商或开发者可以根据需要自定义目录结构，只要在`container.xml`文件中正确引用这些路径即可。开发者可能会在epub文件中添加一些图片或脚本文件等，可能会导致结构看起来不同。

1. **MIME Type 文件**

    * 文件名：`mimetype`
    * 内容：`application/epub+zip`
    * 说明：这是一个文本文件，必须是压缩包中的第一个文件。它声明了文件的MIME类型。
2. **META-INF 目录**

    * 目录名：`META-INF`
    * 说明：这个目录包含了元数据文件。

      * `container.xml`：定义了内容文件的路径，`container.xml` 文件是EPUB文件结构中的关键文件，通过解析 `container.xml` 文件中的 `full-path` 属性，可以找到并加载电子书的内容文件（`opf` 文件）。只要这个文件存在并且路径正确，电子书阅读器就能正确解析和显示电子书内容。
3. **OEBPS 目录**

    * 目录名：`OEBPS`（或其他名称，这个目录也可能不存在）
    * 说明：这个目录包含了电子书的主要内容。

      * `package.opf`（或`content.opf`）：定义了电子书的结构和内容的元数据。
      * `toc.xhtml/toc.ncx`：定义了电子书的目录结构。
      * 各种XHTML文件：电子书的主要内容。
      * 资源文件：如图像、CSS样式表、JavaScript文件等。

[epub2与epub3的区别](https://www.pen2publishing.com/difference-between-epub-and-epub3/)