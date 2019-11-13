
const htmlToText = HTML => {
  var input = HTML;
  return input.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, '').replace(/<[^>]+?>/g, '').replace(/\s+/g, ' ').replace(/ /g, ' ').replace(/>/g, ' ');
}

module.exports = {
  htmlToText, //html转换文本
}