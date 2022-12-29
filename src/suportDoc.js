console.log("01");
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
