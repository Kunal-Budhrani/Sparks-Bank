let user = JSON.parse(sessionStorage.getItem('userData'));
document.getElementById('balance').innerHTML = 'Balance in your account is ' + user.balance
document.getElementById('user').value = sessionStorage.getItem('userData');

const getAccountNumber = () => {
    const accountNumber = parseInt(sessionStorage.getItem('accountNumber'))
    document.getElementById('accountNumber').value = accountNumber;
}






// const fetchData = () => {
//     let accountNumber = document.getElementById('accountNumber').value;
//     let amount = document.getElementById('amount').value;
//     let user = JSON.parse(sessionStorage.getItem('userData'))
//     fetch('http://localhost:3000/pay', {
//         method: "POST",
//         headers: {
//             'Content-Type' : 'application/json'
//         },
//         body: {
//             accountNumber : accountNumber,
//             amount : amount,
//             user : user
//         }
//     })
// }