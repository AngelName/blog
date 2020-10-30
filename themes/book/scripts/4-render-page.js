/* global hexo */

'use strict';

hexo.extend.generator.register('post', function (locals) {
  var posts = locals.posts.toArray();
  var pattern = /(?<=\().*?(?=\))/g;
  var titlePattern = /(?<=\[).*(?=\])/g;
  var menu = hexo.theme.config.menu_page;
  var pages = hexo.locals.get('pages')
  var match;
  var matchTitle;
  pages.forEach(function(page){
    if(page.source ===  menu) {
     match= page.raw.match(pattern);
     matchTitle = page.raw.match(titlePattern);
      if(match.length!=matchTitle.length){
        throw TypeError("根据菜单生成的两个匹配的不相同",match,matchTitle);
      }
    }
  })
  return locals.posts.map(function (post, i) {
    post.hasNext=post.hasPrev = true;
    var current =matchTitle.indexOf(post.title);
    if(current!=-1){
      if(current===0)post.hasPrev = false;
      if(current===match.length-1) post.hasNext = false;
      post.nextPath = match[current+1]||null;
      post.nextTitle = matchTitle[current+1]||null;
      post.prevPath = match[current-1]||null;
      post.prevTitle = matchTitle[current-1]||null;
    }

    return {
      path: post.path,
      data: post,
      layout: 'post'
    };
  });
});