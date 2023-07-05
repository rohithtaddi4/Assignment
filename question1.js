function addNum(a, b, ...c) {
  //number of inputs validation
  const ObjectLength = Object.keys(arguments).length;
  if (ObjectLength < 2) {
    throw {
      error: "input validation failed",
      details: `Number of inputs are ${ObjectLength}, should be more than 2`,
    };
  }
  // type of input validation check
  for (var i = 0; i < ObjectLength; i++) {
    if (typeof arguments[i] !== "number") {
      throw {
        error: "input validation failed",
        details: `${i + 1} parameter is not a number, it's a ${typeof arguments[
          i
        ]}`,
      };
    }
  }
  //calculating the sum
  const sum = Object.values(arguments).reduce((acc, cur) => {
    return acc + cur;
  });
  console.log(sum);
}

addNum(3, 4, 5, 6, -20 ,10);
