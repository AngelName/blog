/* global hexo */

"use strict";

var ejs = require("ejs");

var menufile;

hexo.on("generateAfter", function () {
  var menu = hexo.theme.config.menu_page;
  var pages = hexo.locals.get("pages");
  pages.forEach(function (page) {
    if (page.source === menu) {
      menufile = page;
    }
  });
});

hexo.extend.renderer.register(
  "ejs",
  "html",
  function (data, options) {
    options.filename = data.path;
    if(!process.env.NODE_ENV){
      options.sidebar = menufile
      ? menufile.content.replace(
          /href="\/(.*)"/gi,
          `href="${options.config.root}$1"`
        )
      : "";
    }else{
      options.sidebar = menufile ? menufile.content : '';
    }
 
    if (
      options.page &&
      options.page.content &&
      options.page.content.indexOf(options.config.root) === -1
    ) {
      options.page.content = options.page.content.replace(
        /href="\/(.*)"/gi,
        `href="${options.config.root}$1"`
      );
      options.page.content = options.page.content.replace(
        /src="\/(.*)"/gi,
        `src="${options.config.root}$1"`
      );
    }
    return ejs.render(data.text, options);
  },
  true
);
