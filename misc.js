// var showMe = function(s){
//   console.log(arguments.callee.caller.toString().match(/showMe\((\S)\)/)[1] + 
//   ' = '+ s)
// }
// yy=2
// showMe(yy)

let param = 234
let a = 'showMe('+param+')'
console.log(a.match(/showMe/)[0])
// console.log(a.match(/w/))