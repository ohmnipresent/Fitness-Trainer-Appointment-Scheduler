var form = document.getElementById("myForm"),
    // imgInput = document.querySelector(".img"),
    file = document.getElementById("f_name"),
    firstname = document.getElementById("f_name"),
    lastname = document.getElementById("l_name"),
    location = document.getElementById("l_ocation"),
    phone = document.getElementById("p_hone"),
    date = document.getElementById("d_ate"),
    time = document.getElementById("t_ime"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form"
    isEdit = false
    form.reset()
})


file.onchange = function(){
    if(file.files[0].size < 1000000){  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("This file is too large!")
    }
}


function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index+1}</td>
            <td>${element.clientfName}</td>
            <td>${element.clientlName}</td>
            <td>${element.clientLocation}</td>
            <td>${element.clientPhone}</td>
            <td>${element.clientDate}</td>
            <td>${element.clientTime}</td>


            <td>
                <button class="btn btn-primary" onclick="readInfo('${element.clientfName}', '${element.clientlName}', '${element.clientLocation}', '${element.clientPhone}', '${element.clientDate}', '${element.clientTime}')" data-bs-toggle="modal" data-bs-target="#viewData"><i class="bi bi-search"></i></button>
    
                <button class="btn btn-success" onclick="editInfo(${index}, '${element.clientfName}', '${element.clientlName}', '${element.clientLocation}', '${element.clientPhone}', '${element.clientDate}', '${element.clientTime}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-fill"></i></button>
    
                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-x-circle-fill"></i></button>
                                
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(f_name, l_name, l_ocation, p_hone, d_ate, t_ime){
    document.querySelector('#showFirstName').value = f_name,
    document.querySelector("#showLastName").value = l_name,
    document.querySelector("#showLocation").value = l_ocation,
    document.querySelector("#showPhone").value = p_hone,
    document.querySelector("#showDate").value = d_ate,
    document.querySelector("#showTime").value = t_ime
}


function editInfo(index, fname, lname, ocation, hone, ate, ime){
    isEdit = true
    editId = index
    firstname.value = fname,
    lastname.value = lname,
    location.value = ocation,
    phone.value = hone,
    date.value = ate,
    time.value = ime

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        clientfName: firstname.value,
        clientlName: lastname.value,
        clientLocation: location.value,
        clientPhone: phone.value,
        clientDate: date.value,
        clientTime: time.value
    }

    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"

    showInfo()

    form.reset()

    
    modal.style.display = "none"
    document.querySelector(".modal-backdrop").remove()
})
