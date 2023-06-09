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
// let info = {
//     namecar: '',
//     img: '',
//     brand: '',
//     price: '',
//     person: '',
//     hotline: '',
//     email: '',
// }
let rowSelected = null
let rowIndex = null


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
                    rowSelected = datas[`${index}`]
                } 
            })
        }
    })
}

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

// GET value
function getValue() {
    const newInfo = {
        namecar: inputNameCar.value,
        img: inputImg.value,
        brand: selectElement.value,
        price: inputPrice.value,
        person: inputPerson.value,
        hotline: inputHotline.value,
        email: inputEmail.value
    }
    return newInfo
}

// Xóa value trong input sau khi submit
function clearValue() {
    inputElements.forEach((input) => {
        input.value = ''
        selectElement.value = ''
        inputElements[0].focus()
    })
}

// Xử lý lưu thông tin
btnSuccess.onclick = (e => {
    function pushInfo() {
        console.log("push");
        const info = getValue()
        datas.push(info)
    }
    
    function submit() {
        console.log("submit");
        pushInfo()
        // Render info 
        renderInfo(datas)

        clearValue()

        clickShowInfo()
    }

    if((inputNameCar.value && inputPrice.value && inputPerson.value && inputHotline.value && inputEmail.value) !== '') {
        e.preventDefault()
        console.log("...");
        if(rowSelected) {
            console.log("update submit");
            datas = datas.map((data, index) => {
                if(rowIndex === index) {
                    return getValue()
                } else {
                    return data
                }
            })
            clickShowInfo()
            renderInfo(datas)
            console.log("row",datas);
        } else {
            console.log("push submit");
            submit()
            rowSelected = null
        }
    } 
    
})

// Xử lý xóa thông tin
function Delete() {
    const deleteBtn = document.querySelector('.btn-warning')
    
    deleteBtn.onclick = () => { 
        const newDatas = datas.map((data,index) => {
            if(index === rowIndex) {
                datas.splice(rowIndex,1)
            }
        })
        renderInfo(datas)
        clickShowInfo()
        console.log(datas);
    }
}

Delete()
// Xử lí lọc trong phần tìm kiếm
const searchInput = document.querySelector('input[name="search"]')
function search() {
    const searchValue = searchInput.value.toLowerCase()
    const newCar = datas.filter(item => {
        return item.namecar.includes(searchValue) || item.brand.includes(searchValue) 
        || item.price.includes(searchValue) || item.person.includes(searchValue) 
        || item.hotline.includes(searchValue) || item.email.includes(searchValue)
    
        return item.namecar.indexOf(searchValue) || item.brand.indexOf(searchValue) 
        || item.price.indexOf(searchValue) || item.person.indexOf(searchValue) 
        || item.hotline.indexOf(searchValue) || item.email.indexOf(searchValue)
    })
    if(searchValue.length!=0) {
        renderInfo(newCar)
    } else {
        renderInfo(datas)
    }
    clickShowInfo()
}

searchInput.addEventListener('keyup', search)

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



