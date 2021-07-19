const allCustomers = () => {
    const allCustomers = JSON.parse(sessionStorage.getItem('allUsersArray'))
    const customerBody = document.getElementById('customerBody')
    let html = ""
    console.log(allCustomers)
    allCustomers.forEach((customer)=>{
        html+=`<tr>
        <td>
            ${customer.name}
        </td>
        <td>
            ${customer.email}
        </td>
        <td>
            ${customer.accountNumber}
        </td>
        <td>
            <button onclick="payRedirect(${customer.accountNumber})">Pay</button>
        </td>
    </tr>`
    })
    customerBody.innerHTML = html;
}

const payRedirect = ( accountNumber ) => {
    sessionStorage.setItem('accountNumber', accountNumber);
    window.location.href= "/pay"
    // windows.location.href = "/pay"
}