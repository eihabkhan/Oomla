const _currencyFrom = document.getElementById("currencyFrom");
const _amountFrom = document.getElementById("amountFrom");
const _currencyTo = document.getElementById("currencyTo");
const _amountTo = document.getElementById("amountTo");
const _rate = document.getElementById("rate");
const _swap = document.getElementById("swap");

const API_KEY = "6c3f935b168c33c87b51ffed";
const EXCHANGE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`

// Fetch Exchange Rate & Update DOM
function calculate() {
    const currencyFrom = _currencyFrom.value;
    const currencyTo = _currencyTo.value;

    fetch(`${EXCHANGE_URL}/${currencyFrom}`)
        .then(res => res.json())
            .then(data => {
                const rate = data.conversion_rates[currencyTo];
                _rate.innerText = `1 ${currencyFrom} = ${rate} ${currencyTo}`
                _amountTo.value = (_amountFrom.value * rate).toFixed(2);
            });

}

// Event Listeners
_currencyFrom.addEventListener("change", calculate);
_amountFrom.addEventListener("input", calculate);
_currencyTo.addEventListener("change", calculate);
_amountTo.addEventListener("input", calculate);
_swap.addEventListener("click", () => {
    const temp = _currencyFrom.value;
    _currencyFrom.value = _currencyTo.value;
    _currencyTo.value = temp;
    calculate();
});

calculate();