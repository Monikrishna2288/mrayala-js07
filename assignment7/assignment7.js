document.getElementById('add-button').addEventListener('click', addNameAndEmailToList);
document.getElementById('search-button').addEventListener('click', searchTextFunction);

let table_data = document.querySelector('.table.table-success.table-striped.m-3.w-75');

function addNameAndEmailToList()
{
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    name = name.trim().toLowerCase();
    email = email.trim().toLowerCase();
    if(validateNameAndEmail(name, email))
    {
        addRowsToTable(name, email);
    }
    
    // for(let i=0;i<nameEmailList.length;i++)
    // {
    //     message += "Name: " + nameEmailList[i].name + " Email: " + nameEmailList[i].email +"\n";
    // }
    // alert(message);
}

function validateNameAndEmail(name, email)
{
    
    if(name.length == 0)
    {
        alert("No name provided");
        return false;
    }
    else
    if(name.length<=1)
    {
        alert("At least 2 chars of name required");
        return false;
    }
    else
    if(email.length == 0)
    {
        alert("No email provided!");
        return false;
    }
    else
    if(!email.includes('@'))
    {
        alert("Invalid email: should contain @");
        return false;
    }
    return true;
}

function addRowsToTable(name, email)
{
    let row = document.createElement('tr');
    row.innerHTML = `<td>${name}</td>
    <td>${email}</td>
    <td><button onclick="removeRowFromTable(this)" class="btn btn-danger">Remove</button></td>`
    let table_body = table_data.querySelector('tbody');
    table_body.appendChild(row);
    displayMessage("Added: " + name + " : " + email);
}

function removeRowFromTable(button)
{
    button.closest('tr').remove();
}

function displayMessage(message)
{
    let messageElement = document.getElementById("message");
    messageElement.innerText = message;
}

function searchForNameInTableRow(searchMessage)
{
    let table_body = table_data.querySelector('tbody');
    let rowsOfTable = table_body.querySelectorAll('tr');
    let message = "";
    for(let i=0 ; i<rowsOfTable.length; i++)
    {
        let nameFromTable = rowsOfTable[i].cells[0].innerText.trim().toLowerCase();
        let emailFromTable = rowsOfTable[i].cells[1].innerHTML.trim().toLowerCase();
        if((searchMessage === nameFromTable) || (searchMessage === emailFromTable))
        {
            message += "Found => [name: " + nameFromTable + ", email: " + emailFromTable + "]"  + "\n";
        }
    }
    if(message === "")
    {
        message = searchMessage + " not found!";
    }
    displayMessage(message);
}

function searchTextFunction()
{
    let searchMessage = document.getElementById('search-text').value;
    if(searchMessage !== "")
    {
        searchMessage = searchMessage.trim().toLocaleLowerCase();
        searchForNameInTableRow(searchMessage);
    }
    else{
        alert("No search key provided");
    }
}