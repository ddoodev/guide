/*document$.subscribe(() => {
  hljs.highlightAll()
})*/

/*document.addEventListener('Do', function() {
  KotlinPlayground('code')
})*/

document$.subscribe(() => {
  //const codes = document.getElementsByTagName('code')

  //for (let code of codes) {
    //code.setAttribute('data-target-platform', 'js')
    //code.setAttribute('theme', 'darcula')
    //code.setAttribute('data-highlight-only', 'nocursor')
    //code.setAttribute('mode', 'js')
  //}

  //KotlinPlayground('code')
  hljs.highlightAll()
})
