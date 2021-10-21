import $ from 'jquery'

import '@/css/index.css'

$(function() {
  $('li:odd').css('background-color', 'green');
  $('li:even').css('background-color', 'pink');
})

console.log("hello world");