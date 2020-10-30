# hexo-theme-book

## 安装

```
git clone https://github.com/AngelName/hexo-theme-book.git themes/book
```

强依赖scss,所以请安装hexo-rednerer-scss

```
npm install hexo-renderer-scss --save
```

在_config.yml修改主题入口

```
theme: book
```

## Change markdown renderer

为了更好的渲染质量,我建议你应该改变默认渲染,hexo-markdown-it 对于插件的支持并不完美,缺少自定义参数的支持
详情请看 [change markdown renderer](https://github.com/AngelName/hexo-theme-book/wiki/Change-markdown-renderer)

## Katex support

为了支持 katex 把渲染器修改成hexo-renderer-markdown-it
然后,在看下支持列表[katex support](https://github.com/AngelName/hexo-theme-book/wiki/Katex-support)


## Configuration

详细的配置索命看这个 [Configuration](https://github.com/AngelName/hexo-theme-book/wiki/Configuration)

### Smooth Update

For smoothly updating, I recommand to create a config file named `book.yml` in `/source/_data` folder (If it doesn't exist, create one)

> **Notice: source folder is under your hexo work directory, not the theme one!**

Copy the contents of `/themes/book/_config.yml` to `/source/_data/book.yml`, it will replace the contents of config in `/themes/book/_config.yml`. Now you can configure it independently and also, you can update theme more smoothly.

## Post front-matter

```
---
title: <string>
comments: <boolean> (default: true)
---
```

## Update

进入主题目录,运行`git pull`.如果你是用/source/_data/book/yml,请注意更新不同的_config.yml


## Feature List
- [ ] 标签分类
- [ ] 归档 
- [ ] 门户首页
- [ ] 时间线
