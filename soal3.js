arrProduct = [
    { id: 1579581080923,categ: 'Beverages' , name: "Ramen", price: 15000, stock: 20, qtyCart: 1},
    { id: 1579581081130,categ: 'Electronic' , name: "Iphone", price: 7000000, stock: 5, qtyCart: 1},
    { id: 1579581081342,categ: 'Clothes' , name: "Pants", price: 100000, stock: 15, qtyCart: 1},
    { id: 1579581081577,categ: 'Electronic' , name: "Samsung", price: 4000000, stock: 7, qtyCart: 1}
  ]

var arrCateg = ["Select", "Electronic", "Beverages", "Clothes"]

var cartProduct = []

const displayInput = (arr) => {
    var listName = arr.map((val, ind) => {
        return (
            `<tr>
                <td>${val.id}</td>
                <td id="categR${ind}">${val.categ}</td>
                <td id="nameR${ind}">${val.name}</td>
                <td id="priceR${ind}">${val.price}</td>
                <td id="stockR${ind}">${val.stock}</td>
                <td>
                    <input type="button" id="add" value="Add to cart" onclick="addToCart(${ind})">
                </td>
                <td>
                    <input type="button" id="delete" value="Delete" onclick="deleteProd(${ind})">
                </td>
                <td>
                    <input type="button" id="edit" value="Edit" onclick="editProd(${ind})">
                </td>
            </tr>`
        )
    }).join('')
    
    var listCateg = arrCateg.map(val => {
        return (
            `<option value='${val}'>${val}</option>`
        )
    }).join('')
    document.getElementById('categoryFilter').innerHTML = listCateg
    document.getElementById('categoryInput').innerHTML = listCateg
    document.getElementById('render').innerHTML = listName
}

const funInputData = () => {
    var name = document.getElementById('nameInput').value
    var price = document.getElementById('priceInput').value
    var categ = document.getElementById('categoryInput').value
    var stock = document.getElementById('stockInput').value
    var id = new Date().getTime()
    
    arrProduct.push({id, categ, name, price, stock})
    
    document.getElementById('nameInput').value = '' //Data is inputed already, then back to blank input form
    document.getElementById('priceInput').value = ''
    document.getElementById('categoryInput').value = ''
    document.getElementById('stockInput').value = ''
    displayInput(arrProduct)
}

const funFilter = () => {
    var inputName = document.getElementById('keyword').value
    var inputMax = document.getElementById('max').value
    var inputMin = document.getElementById('min').value
    var inputCateg = document.getElementById('categoryFilter').value

    var listChange = arrProduct.filter(val => {
        var names = val.name.toLowerCase().includes(inputName.toLowerCase())
        if(!inputName) {
            names = true
        }
        var minMax = val.price >= inputMin && val.price <= inputMax
        if(!inputMin || !inputMax) {
            minMax = true
        }
        var catego = val.categ == inputCateg && inputCateg !== 'Select'
        if(inputCateg == 'Select') {
            catego = true
        }
        return names && minMax && catego //it will return to true
    })
    document.getElementById('render').innerHTML = showFilter(listChange).join('')
}

const showFilter = (filt) => {
    return filt.map((val, ind) => {
        return (
            `<tr>
                <td>${val.id}</td>
                <td>${val.categ}</td>
                <td>${val.name}</td>
                <td>${val.price}</td>
                <td>${val.stock}</td>
                <td>
                    <input type="button" id="add" value="Add to cart" onclick="addToCart(${ind})">
                </td>
                <td>
                    <input type="button" id="delete" value="Delete" onclick="deleteProd(${ind})">
                </td>
                <td>
                    <input type="button" id="edit" value="Edit" onclick="editProd(${ind})">
                </td>
            </tr>`
        )
    })
}

const deleteProd = (getInd) => {
    var output = ''
    arrProduct.forEach((val, ind) => {
        if(ind == getInd) {
            output += 
            `<tr>
                <td>${val.id}</td>
                <td>${val.categ}</td>
                <td>${val.name}</td>
                <td>${val.price}</td>
                <td>${val.stock}</td>
                <td>
                    <input type="button" id="yes" value="Yes" onclick="yesb(${ind})">
                </td>
                <td>
                    <input type="button" id="cancel" value="Cancel" onclick="nob(${ind})">
                </td>
            </tr>`
        } else {
            output += 
            `<tr>
                <td>${val.id}</td>
                <td>${val.categ}</td>
                <td>${val.name}</td>
                <td>${val.price}</td>
                <td>${val.stock}</td>
                <td>
                    <input type="button" id="delete" value="Delete" onclick="deleteProd(${ind})">
                </td>
                <td>
                    <input type="button" id="edit" value="Edit" onclick="editProd(${ind})">
                </td>
            </tr>`
        }
    })
    return document.getElementById('render').innerHTML = output
}

const yesb = (ind) => {
    arrProduct.splice(ind, 1)
    document.getElementById('render').innerHTML = showFilter(arrProduct).join('')
}

const nob = () => {
    document.getElementById('render').innerHTML = showFilter(arrProduct).join('')
}

const editProd = (getInd) => {
    var output = ''
    arrProduct.forEach((val, ind) => {
        if(ind == getInd) {
            var listCateg = arrCateg.map(val => {
                if(val == arrProduct[getInd].categ) {
                    return (
                        `<option value='${val}' selected>${val}</option>`
                    )
                }
                return `<option value='${val}'>${val}</option>`
            }).join('')

            output += 
            `<tr>
                <td>${val.id}</td>
                <td>
                    <select id="categs${ind}">${listCateg}</select>
                </td>
                <td>
                    <input type="text" id="names${ind}" value="${val.name}">
                </td>
                <td>
                    <input type="number" id="prices${ind}" value="${val.price}">
                </td>
                <td>
                    <input type="number" id="stocks${ind}" value="${val.stock}">
                </td>
                <td>
                    <input type="button" id="save" value="Save" onclick="saveb(${ind})">
                </td>
                <td>
                    <input type="button" id="cancel" value="Cancel" onclick="nobb(${ind})">
                </td>
            </tr>`
        } else {
            output += 
            `<tr>
                <td>${val.id}</td>
                <td>${val.categ}</td>
                <td>${val.name}</td>
                <td>${val.price}</td>
                <td>${val.stock}</td>
                <td>
                    <input type="button" id="delete" value="Delete" onclick="deleteProd(${ind})">
                </td>
                <td>
                    <input type="button" id="edit" value="Edit" onclick="editProd(${ind})">
                </td>
            </tr>`
        }
    })
    return document.getElementById('render').innerHTML = output
}

const saveb = (getInd) => {
    var arrSaved = []
    var id = arrProduct[getInd].id
    var categ = document.getElementById(`categs${getInd}`).value
    var name = document.getElementById(`names${getInd}`).value
    var price = document.getElementById(`prices${getInd}`).value
    var stock = document.getElementById(`stocks${getInd}`).value

    arrSaved.push({id, categ, name, price, stock})
    arrProduct.splice(getInd, 1, ...arrSaved)

    document.getElementById('render').innerHTML = showFilter(arrProduct).join('')
}

const nobb = () => {
    document.getElementById('render').innerHTML = showFilter(arrProduct).join('')
}

displayInput(arrProduct)

const checkedCart = () => {
    if(cartProduct.length) {
        var cartOutput = ''
        cartProduct.forEach((val, ind) => {
            cartOutput +=
            `<tr>
                <td>${val.id}</td>
                <td>${val.categ}</td>
                <td>${val.name}</td>
                <td>${val.price}</td>
                <td>${val.qtyCart}</td>
                <td>
                    <input type="button" id="delete" value="Delete" onclick="deleteCart(${ind})">
                </td>
            </tr>`
        })
        var lastOutput = 
        `<fieldset>
            <legend>Cart</legend>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Category</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${cartOutput}
                </tbody>
            </table><br><br>
            <p id="checkout"></p>
        </fieldset>`
        document.getElementById('added').innerHTML = lastOutput
        document.getElementById('checkout').innerHTML= `<button onclick='checkOut(event)'>Checkout</button>`
    } else {
        document.getElementById('added').innerHTML = ''
    }
}

const addToCart = (getInd) => {
    var indexCart = -1
    for(let i=0; i < cartProduct.length; i++) {
        if(cartProduct[i].name == arrProduct[getInd].name) {
            indexCart = i
        } 
    }

    if(indexCart < 0) {
        cartProduct.push(arrProduct[getInd])
    } else {
        if(arrProduct[getInd].stock < 1) {
            alert('Stok habis!')
            arrProduct[getInd].stock += 1
        } else {
            cartProduct[indexCart].qtyCart += 1
        }
    }
    arrProduct[getInd].stock -= 1

    displayInput(arrProduct)
    checkedCart()
    console.log(arrProduct[getInd].stock)
}

const deleteCart = (getInd) => {
    arrProduct.forEach((val, ind) => {
        if(val.name == cartProduct[getInd].name) {
            var arrProd = parseInt(arrProduct[ind].stock)
            var result = arrProd + cartProduct[getInd].qtyCart
            arrProduct[ind].stock = ''
            arrProduct[ind].stock += result
        }
    })
    cartProduct.splice(getInd, 1)
    checkedCart()
    document.getElementById('render').innerHTML = showFilter(arrProduct).join('')
}

const checkOut = (e) => {
    e.preventDefault()
    var sure = confirm('Are you sure?')
    if(sure) {
        var checkOutDisplay = 
        `<fieldset>
            <legend>Total</legend>
            ${totalCart()}
        </fieldset>`
        document.getElementById('counted').innerHTML = checkOutDisplay
    } else {
        alert('Make sure all product already checked!')
    }
}

const totalCart = () => {
    var total = 0
    cartProduct.forEach((val, ind)=> {
        total += val.price * cartProduct[ind].qtyCart
    })

    var ppn = (1/100) * total

    var lastTotal = total + ppn

    return (
        `<div>
            Total Biaya sebelum PPN = Rp.${total},00
        </div><br>
        <div>
            PPN = Rp.${ppn},00
        </div><br>
        <div>
            Total harga yang harus dibayarkan = Rp.${lastTotal},00
        </div>`
    )
}