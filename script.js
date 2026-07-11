const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");
const transactionList = document.getElementById("transactionList");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateValues() {
  const amounts = transactions.map(item => item.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0);
  const incomeTotal = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => acc + item, 0);
  const expenseTotal = amounts
    .filter(item => item < 0)
    .reduce((acc, item) => acc + item, 0);
  balance.innerText = `₹${total}`;
  income.innerText = `₹${incomeTotal}`;
  expense.innerText = `₹${Math.abs(expenseTotal)}`;
}

function renderTransactions() {
  transactionList.innerHTML = "";
  transactions.forEach((transaction, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>
        ${transaction.text} : ₹${transaction.amount}
      </span>
      <button class="delete-btn" onclick="deleteTransaction(${index})">
        X
      </button>
    `;
    transactionList.appendChild(li);
  });
  updateValues();
}

function addTransaction() {
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please fill all fields");
    return;
  }
  transactions.push({
    text: text.value,
    amount: Number(amount.value)
  });
  saveData();
  renderTransactions();
  text.value = "";
  amount.value = "";
}
function deleteTransaction(index) {

  transactions.splice(index, 1);

  saveData();
  renderTransactions();
}

addBtn.addEventListener("click", addTransaction);

renderTransactions();