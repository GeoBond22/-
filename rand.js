$("#generate").on("click", () => {
  let maxNum = parseInt($("#max").val());
  let minNum = parseInt($("#min").val());
  let numOfValues = parseInt($("#count").val());
  let numberExclusions = $("#remove-btn").prop("checked");
  let repeatNum = $("#repeat").prop("checked");

  if (isNaN(maxNum)) {
    maxNum = 100;
  }

  if (isNaN(minNum)) {
    minNum = 1;
  }

  if (isNaN(numOfValues) || numOfValues === 0) {
    numOfValues = 1;
  }

  generateNumbersWithoutRepeatsAndExclusions(
    minNum,
    maxNum,
    numOfValues,
    numberExclusions,
    repeatNum
  );

  function generateNumbersWithoutRepeatsAndExclusions(
    start,
    end,
    count,
    exclusions,
    repeat
  ) {
    if (repeat) {
      if (count > end - start + 1) {
        count = end - start + 1;
      }

      let availableNumbers = [];
      for (let i = start; i <= end; i++) {
        availableNumbers.push(i);
      }

      let generatedNumbers = [];

      if (count === 1) {
        let randomIndex = Math.floor(Math.random() * availableNumbers.length);
        let selectedNumber = availableNumbers[randomIndex].toString().trim();
        if (selectedNumber !== "") {
          generatedNumbers.push(selectedNumber);
          if (!repeat) {
            availableNumbers.splice(randomIndex, 1);
          }
        }
      } else {
        while (generatedNumbers.length < count) {
          let randomIndex = Math.floor(Math.random() * availableNumbers.length);
          let selectedNumber = availableNumbers[randomIndex].toString().trim();
          if (
            selectedNumber !== "" &&
            (!repeat || !generatedNumbers.includes(selectedNumber))
          ) {
            generatedNumbers.push(selectedNumber);
            if (!repeat) {
              availableNumbers.splice(randomIndex, 1);
            }
          }
        }
      }

      if (exclusions) {
        generatedNumbers = generatedNumbers.filter(
          (number) => !exclusions.includes(number)
        );
      }

      console.log(generatedNumbers);
    } else {
      let generatedNumbers = [];
      for (let i = 0; i < count; i++) {
        let randomNum = Math.floor(Math.random() * (end - start + 1)) + start;
        generatedNumbers.push(randomNum.toString());
      }

      if (exclusions) {
        generatedNumbers = generatedNumbers.filter(
          (number) => !exclusions.includes(number)
        );
      }

      console.log(generatedNumbers);
    }
  }
});
