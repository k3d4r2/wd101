let element = (id) => document.getElementById(id);

let classes = (classes) => document.getElementsByClassName(classes);

let user_entries = [];

function writeTable(){
    let obj = sessionStorage.getItem("user_entries");
    if(obj){
        user_entries = JSON.parse(obj);
    }else{
        user_entries = [];
    }
    return user_entries;
}1
user_entries = writeTable();

let username = element("name"),
  email = element("email"),
  password = element("password"),
  tc = element("tc"),
  dob = element("dob");

let errormsg = classes("errormsg");

let form = element("form");

function verify(elem,message,cnd){
    if(cnd){
        elem.style.border = "2px solid red";
        elem.setCustomValidity(message);
        elem.reportValidity();
    }else{
        elem.style.border = "2px solid green";
        elem.setCustomValidity('');

    }
}

function checkDOB(){
    let age = new Date().getFullYear() - new Date(dob.value).getFullYear();
    if(age < 18 || age>55){
        return false;
    }else{
        return true;
    }
}

let email_err_message = "Not a valid E-mail";
let tc_err_message = "You must agree to the terms and conditions";
let dob_err_message = "Your age must be between 18 and 55 to continue";

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

email.addEventListener("input", (e) => {
    let cond_email = (validateEmail(email));
    e.preventDefault();
    verify(email,email_err_message,cond_email);
});

dob.addEventListener("input", (e) => {
    let cond_dob = !checkDOB();
    e.preventDefault();
    verify(dob,dob_err_message,cond_dob);
});
tc.addEventListener("input", (e) => {
    let cond_agree = !tc.checked;
    e.preventDefault();
    verify(tc,tc_err_message,cond_agree);
});

function createObj(){
    let check = false;
    if(tc.checked){
        check = true;
    }
    let obj = {
        name: username.value,
        email: email.value,
        password: password.value,
        dob: dob.value,
        checked: check
    }
    return obj;
}


function showTable(){
    let table = element("user-table");
    let entries = user_entries;
    let str = `<tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Dob</th>
                    <th>Accepted terms?</th>
                </tr>\n`;
    for(let i=0;i<entries.length;i++){
        str += `<tr>
                    <td>${entries[i].name}</td>
                    <td>${entries[i].email}</td>
                    <td>${entries[i].password}</td>
                    <td>${entries[i].dob}</td>
                    <td>${entries[i].checked}</td>
                </tr>\n`;
    }
    table.innerHTML = str;
}

form.addEventListener("submit", (e) => {
    let cond_agree= !tc.checked;
    e.preventDefault();
    if (!cond_agree) {
        let obj = createObj();
        user_entries.push(obj);
        sessionStorage.setItem("user_entries", JSON.stringify(user_entries));
    }
    showTable();
});
window.onload = (event) => {
    showTable();
};
