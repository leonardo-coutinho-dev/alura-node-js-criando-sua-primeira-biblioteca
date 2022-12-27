console.log("01");
console.log("02");
console.log("03");
console.log("04");
let timeoutfunction = () => {
  setTimeout(function () {
    let number = 1;
    let othernumber = 2;
    let soma = number + othernumber;
    console.log(soma);
    let arrayOfNumber = [3.14, 2.74, 42, 7, 13];
    arrayOfNumber.forEach((item) => console.log(item));
  }, 10 * 1000);
};
timeoutfunction();
console.log("Esse é o último!");
console.log("05");
console.log("06");
console.log("07");
console.log("08");
console.log("09");
console.log("10");
console.log("11");
