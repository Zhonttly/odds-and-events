// Initialize the state variables
let numberBank = [];
let odds = [];
let evens = [];

/**
 * Adds a number to a number bank
 *
 * @param {number} n number to add the number bank
 */
function AddToNumberBank(n) {
  numberBank.push(n);

  render();
}

/**
 * Sorts the first number in the bank to either the evens or odds
 */
function Sort1() {
  const number = numberBank.shift();

  number % 2 === 0 ? evens.push(number) : odds.push(number);
  render();
}

/**
 * Sorts all numbers from the number bank to either evens or odds
 */
function SortAll() {
  for (const num of numberBank) {
    num % 2 === 0 ? evens.push(num) : odds.push(num);
  }

  numberBank = [];
  render();
}

/**
 * Form that allows the user to add a number to the number bank
 */
function NumberBankForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
        <label>
            Add a number to the bank
            <input name="inputNumber" type="number"/>
        </label>
        <button id="addNumber">Add number</button>
        <button id="sort1">Sort 1</button>
        <button id="sortAll">Sort All</button>
    `;

  // Add number submit event listener
  $form.querySelector("#addNumber").addEventListener("click", (event) => {
    event.preventDefault();

    const $data = new FormData($form);
    const number = Number($data.get("inputNumber"));

    AddToNumberBank(number);
  });

  // Add sort 1 submit event listener
  $form.querySelector("#sort1").addEventListener("click", (event) => {
    event.preventDefault();

    Sort1();
  });

  // Add sort 1 submit event listener
  $form.querySelector("#sortAll").addEventListener("click", (event) => {
    event.preventDefault();

    SortAll();
  });

  return $form;
}

/**
 * List numbers from an array as an unordered list
 *
 * @param {num[]} numList Array of numbers
 * @returns
 */
function ListNums(numList) {
  const $ul = document.createElement("ul");
  numList.map((num) => {
    const $li = document.createElement("li");
    $li.innerText = num;
    $ul.appendChild($li);
  });

  return $ul;
}

/**
 * Renders the application
 */
function render() {
  const $app = document.querySelector("#app");

  $app.innerHTML = `
        <h1>Odds and Events</h1>
        <AddNumber></AddNumber>
        <h2>Bank</h2>
        <Bank></Bank>
        <h2>Odds</h2>
        <Odds></Odds>
        <h2>Evens</h2>
        <Evens></Evens>
    `;

  $app.querySelector("AddNumber").replaceWith(NumberBankForm());
  $app.querySelector("Bank").replaceWith(ListNums(numberBank));
  $app.querySelector("Odds").replaceWith(ListNums(odds));
  $app.querySelector("Evens").replaceWith(ListNums(evens));
}

render();
