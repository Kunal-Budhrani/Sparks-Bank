const transactionHistory = () => {
    const history = JSON.parse(sessionStorage.getItem('userData')).history
    let html = ""
    history.forEach( (history) => {
        // console.log(history,'++++++++')
        html+= `
        <tr>
    <td>
        ${history.dateAndTime}
    </td>
    <td>
        ${history.amount}
    </td>
    <td>
        ${history.status}
    </td>
    </tr>`
    });
    if(html){

        document.getElementById('history').innerHTML = html;
    } else {
        let table = document.getElementById('table');
        table.innerHTML = "No Transactions made yet";
        table.style.border='none'
        table.style.fontSize = "25px";

    }
}