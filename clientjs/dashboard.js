let c=true;
const profile = () =>{
    if(c){
        document.getElementById('DP').style.display='block';
        c=false;
    }else {
        c=true;
        document.getElementById('DP').style.display='none';
    }
}
console.log('KKKKKKKKKk')

const renderData = () => {
    let user = JSON.parse(sessionStorage.getItem('userData'))
    document.getElementById('name').innerHTML='Name : ' + user.name;
    document.getElementById('email').innerHTML='Email : ' + user.email;
    document.getElementById('accountNumber').innerHTML='Account Number: ' + user.accountNumber;
    document.getElementById('balance').innerHTML='Balance : ' + user.balance;
    document.getElementById('welcome').innerHTML = 'Welcome ' + user.name;
    
}
const userData = ()=> {
    let user = document.getElementById('user');
    let userData = user.innerHTML
    let allUsers = document.getElementById('allUsers');
    let allUsersArray = allUsers.innerHTML
    console.log(userData)
    sessionStorage.setItem('userData',userData)
    sessionStorage.setItem('allUsersArray',allUsersArray)
    user.remove()
    allUsers.remove()
    renderData();
}

const logout = () => {
    sessionStorage.clear();
}
// let c=1;
// document.getElementById('profile').addEventListener('click',()=> {
//     if(c){
//         document.getElementById('DP').style.display='none';
//         c=0;
//     }else {
//         c=1;
//         document.getElementById('DP').style.display='none';
//     }
// })