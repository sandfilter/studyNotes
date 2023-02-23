// const a = []
// for (let i = 0; i < 10; i++) {
//   a[i] = function() {
//     console.log(i);
//   }
  
// };

// a[6]();

////-------------------------------------

// for (let i = 0; i < 3; i++) {
//   let i = 'a'
//   console.log(i);
  
// }

////-------------------------------------

// {let a = 1
//   { let a =2 
//     { let a = 3
//       {
//         let a = 4
//         console.log(a);
//       }
//       console.log(a);
//     }
//     console.log(a);
//   }
//   console.log(a);
// }


////-------------------------------------
// function* fibs() {
//   let a = 0;
//   let b = 1;
//   while (true) {
//     yield a;
//     [a, b] = [b, a + b]
//   }
// }

// let [first, second, third, fourth, fifth, sixth ] = fibs();

// console.log( fifth )

////------------------------------------

// const { log } = console;
// log( 1 + 1 ) 


////------------------------------------
// console.log([[2, 0], [1, 2]].map(([a, b]) => a + b));

////------------------------------------
// console.log([ undefined, 1, 3].map((a = 'yes', b = 3 , c = 1 ) => a + b + c));

////------------------------------------

// let x = 3;
// let y = 2;
// let z = 0;

// if (x = y) {
//   console.log( '1if: ' + x);
// }else if( x = y ){
//   console.log ('2if: ' + x);
// }else { 
//   console.log( '3if: ' + z);
// }

////------------------------------------

// console.log('\u{20BB7}')

////------------------------------------

// function compile(template){
//   const evalExpr = /<%=(.+?)%>/g;
//   const expr = /<%([\s\S]+?)%>/g;

//   template = template
//     .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
//     .replace(expr, '`); \n $1 \n  echo(`');

//   template = 'echo(`' + template + '`);';

//   let script =
//   `(function parse(data){
//     let output = "";

//     function echo(html){
//       output += html;
//     }

//     ${ template }

//     return output;
//   })`;

//   return script;
// }

// let parse = eval(compile(template));
// div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });

////------------------------------------

// let value = 1999;
// delete value;
// const result = value;

// console.log(result)

////------------------------------------


// function orderMyLogic(val) {
//   if ( val < 5 ) {
//     return "Less than 5";
//   } else if (val < 10) {
//     return "Less than 10";
//   } else {
//     return "Greater than or equal to 10";
//   }
// }

// console.log(orderMyLogic(4));
// console.log(orderMyLogic(6));
// console.log(orderMyLogic(11));

////------------------------------------

// function caseInSwitch(val) {
//   let answer = "";
//   // Only change code below this line
//   switch (val) {
//     case 1:
//       answer = "alpha";
//       break;
//     case 2:
//       answer = "beta";
//       break;
//     case 3:
//       answer = "gamma";
//       break;
//     case 4:
//       answer = "delta";
//       break;
//   }
  

//   // Only change code above this line
//   return answer;
// }

// console.log(caseInSwitch(1));

////------------------------------------
// let count = 0;
// function cc(card) {

//   // Only change code below this line
//   switch (card){
//     case 2:
//     case 3:
//     case 4:
//     case 5:
//     case 6:
//       count++;
//       break;
//     case 10:
//     case 'J':
//     case 'Q':
//     case 'K':
//     case 'A':
//       count--;
//       break;
//   }
//   let holdbet = 'Hold'
//   if (count > 0) {
//      holdbet = 'Bet'
//   }

//   return count + " " + holdbet;
//   // Only change code above this line
// }
// console.log(  cc(10), cc("J"), cc("A"), cc(5), cc(6));


////------------------------------------
// console.log(0.1+0.2 === 0.3)

////------------------------------------

// function updateRecords(records, id, prop, value) {
//   if (prop != 'tracks' && value !== '' ) {
//     records[id][prop] = value;
//   }else if( prop === 'tracks' && records[id].hasOwnProperty("tracks") === false) {
//     records[id][prop] = [value];
//   }else if( prop === 'tracks' && value !== '' ){
//     records[id][prop].push(value);
//   }else if( value === ''){
//     delete records[id][prop];
//   }
//   return records;
// }

// function updateRecords(records, id, prop, value) {
//   if( value === ''){
//     delete records[id][prop];
//   }else if( prop === 'tracks'){
//     records[id][prop] = records[id][prop] || [];
//     records[id][prop].push(value);
//   }else {
//      records[id][prop] = value;
//   }
//   return records;
// }

// function updateRecords(records, id, prop, value) {
//   if( value === ''){
//     delete records[id][prop];
//   }else if( prop !== 'tracks'){
//    records[id][prop] = value;
//   }else {
//     records[id][prop] = records[id][prop] || [];
//     records[id][prop].push(value);
//   }
//   return records;
// }

////------------------------------------

// const mul = ( multoip, ...theArgs ) => {
//   return theArgs.map (function (e) {
//     return multoip * e;
//   })
// }
// var arr = mul ( 1,1,1);
// console.log(arr);

////------------------------------------
// function throwIfMissing() {
//   throw new Error('Missing parameter');
// }

// function foo(mustBeProvided = throwIfMissing()) {
//   return mustBeProvided;
// }

// foo()

////------------------------------------

// function foo(optional = undefined) { 
//   console.log(optional);
//   return optional;
// }
// foo('11');

////------------------------------------

/*
https://es6.ruanyifeng.com/#docs/function#尾递归优化的实现
*/ 
// 蹦床函数（trampoline）
// function trampoline(f) {
//   while (f && f instanceof Function) {
//     f = f();
//   }
//   return f;
// }


// function tco(f) {
//   var value;
//   var active = false;
//   var accumulated = [];

//   return function accumulator() {
//     accumulated.push(arguments);
//     if (!active) {
//       active = true;
//       while (accumulated.length) {
//         value = f.apply(this, accumulated.shift());
//       }
//       active = false;
//       return value;
//     }
//   };
// }

// 习近平
// 赵乐际
// 胡春华
// 陈敏尔
// 丁薛祥
// 李希
// 李强

////------------------------------------
// function f(v, w, x, y, z) { 
//   console.log(v, w, x, y, z)
// }
// const args = [0, 1];
// f(-1, ...args, 2, ...[3]);

////------------------------------------
// console.log(false = '0');

////------------------------------------
// let a = 3 ** 5;
// let b = 3 * 3 * 3* 3 *3;
// console.log( a == b)
// console.log(a **= 5);
////------------------------------------
// const obj = {};
// let a = Symbol('a');
// let b = Symbol('b');

// obj[a] = 'Hello';
// obj[b] = 'World';

// const objectSymbols = Object.getOwnPropertySymbols(obj);

// console.log(objectSymbols);

////------------------------------------
// let obj = {
//   [Symbol('my_key')]: 1,
//   enum: 2,
//   nonEnum: 3
// };

// console.log(Reflect.ownKeys(obj))
