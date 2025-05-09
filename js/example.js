// 배열(array)
// const arr = ['a', 'b', 'c', 'd', 'e'];

//반복문 (loop문)
// for (let i = 0; i < arr.length; i++) {
//     const element = arr[i];
//     console.log(element);
// }

// arr.forEach((arr, index) => {
//     console.log(index, arr);
// })

// arr.map((arr, index) => {
//     console.log(index, arr);
// })

// 객체(object) - {key1 : value1, key2 : value2}
// const objs = {
//     a: 1,
//     b: "a",
//     c: () => {
//         console.log("객체함수 출력");
//     },
//     d: ['a', 'b', 'c']
// }

// objs.d.forEach((arr, index) => {
//     console.log(arr, index);
// })

// 형(type) - 원시타입(primative type), 객체타입(object type)
// 원시타입 : 문자, 숫자, null, undefined, boolean(true, false)
// 객체타입 : 함수, 배열, 객체 ...

const a = "b";
const b = 2;

const c = "a 변수에는 문자 " + a + "가 있고 b 변수에는 숫자 " + b + "이 있다";

//탬플릿 문자열
const d = `a 변수에는 문자 ${a}가 있고 b 변수에는 숫자 ${b}이 있다`
console.log(d);