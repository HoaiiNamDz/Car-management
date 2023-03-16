const btnSuccess = document.querySelector('.btn-success')
const inputElements = document.querySelectorAll('input[name]')
const selectElement = document.querySelector('select')
const tableBody = document.querySelector('.table-body')
const inputNameCar = document.querySelector('input[name="namecar"]')
const inputImg = document.querySelector('input[name="img"]')
const inputPrice = document.querySelector('input[name="price"]')
const inputPerson = document.querySelector('input[name="person"]')
const inputHotline = document.querySelector('input[name="hotline"]')
const inputEmail = document.querySelector('input[name="email"]')


let datas = []
let info = {
namecar: '',
img: '',
brand: '',
price: '',
person: '',
hotline: '',
email: '',
}
let rowSelected = null


// Click vào dòng hiện thông tin xe
function clickShowInfo() {
    const rowInfos = tableBody.querySelectorAll('tr')
    rowInfos.forEach((rowInfo, index) => {
        rowInfo.onclick = (e) => {
            const rowNote = e.target.closest('.table-info');
            rowIndex = Number(rowNote.dataset.index)    
            datas.map((data, rowIndex) => {
                if(rowIndex === index) {
                    inputNameCar.value = datas[`${index}`].namecar
                    inputImg.value = datas[`${index}`].img 
                    selectElement.value = datas[`${index}`].brand
                    inputPrice.value = datas[`${index}`].price
                    inputPerson.value = datas[`${index}`].person
                    inputHotline.value = datas[`${index}`].hotline
                    inputEmail.value = datas[`${index}`].email
                } 
            })
        }
    })
}

// Xử lý lưu thông tin
btnSuccess.onclick = (e => {

    function renderInfo(datas) {
        const html = datas.map((data,index) => {
            return `
                <tr data-index=${index} class="table-info">
                    <th scope="col">${index+1}</th>
                    <th scope="col">${data.img}</th>
                    <th scope="col">${data.namecar}</th>
                    <th scope="col">${data.brand}</th>
                    <th scope="col">${data.price}</th>
                    <th scope="col">${data.person}</th>
                    <th scope="col">${data.hotline}</th>
                    <th scope="col">${data.email}</th>
                </tr>
            `
        })
        tableBody.innerHTML = html.join('')
    }
    function pushInfo() {
        info = {
            namecar: inputNameCar.value,
            img: inputImg.value,
            brand: selectElement.value,
            price: inputPrice.value,
            person: inputPerson.value,
            hotline: inputHotline.value,
            email: inputEmail.value
        }
        datas.push(info)
    }
    
    function submit() {
        pushInfo()
        // Render info 
        renderInfo(datas)

        // Xóa value trong input sau khi submit
        inputElements.forEach((input) => {
            input.value = ''
            selectElement.value = ''
            inputElements[0].focus()
        })

        clickShowInfo()
    }

    if((inputNameCar.value && inputPrice.value && inputPerson.value && inputHotline.value && inputEmail.value) !== '') {
        e.preventDefault()
        submit()
    } 
})

// Xử lý xóa thông tin
function Delete() {
    const deleteBtn = document.querySelector('.btn-warning')
    
    function resetInfo(datas) {
        const html = datas.map((data,index) => {
            return `
                <tr data-index=${index} class="table-info">
                    <th scope="col">${index+1}</th>
                    <th scope="col">${data.img}</th>
                    <th scope="col">${data.namecar}</th>
                    <th scope="col">${data.brand}</th>
                    <th scope="col">${data.price}</th>
                    <th scope="col">${data.person}</th>
                    <th scope="col">${data.hotline}</th>
                    <th scope="col">${data.email}</th>
                </tr>
            `
        })
        tableBody.innerHTML = html.join('')
    }
    deleteBtn.onclick = () => { 
        const newDatas = datas.map((data,index) => {
            if(index === rowIndex) {
                datas.splice(rowIndex,1)
            }
        })
        resetInfo(datas)
        clickShowInfo()
        console.log(datas);
    }
}

Delete()

// Update data


// Xử lí lọc trong phần tìm kiếm
const searchInput = document.querySelector('input[name="search"]')

searchInput.oninput = () => {
    datas.map((data,index) => {
        const searchValue = searchInput.value.toLowerCase().trim()
        const name = data.namecar.toLowerCase();
        const email = data.email.toLowerCase();
        const price = data.price.toString();
        const person = data.person.toString();
        const hotline = data.hotline.toString();
        
        console.log(tableInfos);
        if (name.includes(searchValue) || email.includes(searchValue) || price.includes(searchValue) || person.includes(searchValue) || hotline.includes(searchValue)) {
            document.querySelector('.table-info').style.display = "table-row";
        } else {
            document.querySelector('.table-info').style.display = "none";
        }
    }) 
}

// Xử lý phải nhập số điện thoại đúng type
function isPhoneNumber() {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    const inputHotlineValue = inputHotline.value
    if(inputHotlineValue !== '') {
        if (vnf_regex.test(inputHotlineValue) == false) {
            inputHotline.classList.add('is-invalid')
            inputHotline.title = 'Vui lòng nhập số điện thoại hợp lệ'
        } else {
            inputHotline.classList.remove('is-invalid')
            inputHotline.title = ''
        }
    }
}

inputHotline.oninput = () => {
    isPhoneNumber()
}



