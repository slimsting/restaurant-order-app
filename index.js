import { menuArray } from '/data.js'


const orderObjectsArray = [] // array to hold selected menu items
const cardDetailsForm = document.getElementById('modal')

//handle form submit
cardDetailsForm.addEventListener('submit', function(e){
    e.preventDefault()
    
    const formData = new FormData(cardDetailsForm)
    const name = formData.get('name')
    
    document.getElementById('order-completed').innerHTML = `
            <p>Thanks, ${name}! Your order is on the way!</p>
    `
    document.getElementById('order-completed').style.display = 'flex'
    document.getElementById('modal').style.display = 'none'
    document.getElementById('order-box').style.display = 'none'
})

// event listener for all clicks on the site
document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }
    
    else if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }
    
    else if(e.target.id === 'btn'){
        handleButtonClick()
    }
    else if(e.target.dataset.backdrop !== 'true'){
        document.getElementById('modal').style.display = 'none'
    }
       
})

function handleAddClick(value){
    const addedItemObj = menuArray.filter(function(item){
        return item.id === Number(value)
    })[0] // store the clciked 
    
   if (orderObjectsArray.includes(addedItemObj)){
       addedItemObj.quantity ++
       addedItemObj.price += addedItemObj.price
   }
   else{
       orderObjectsArray.push(addedItemObj)
   }
    renderOrder()
}

function handleRemoveClick(value){
   for(let i = 0 ; i < orderObjectsArray.length; i++ ){
       if(orderObjectsArray[i].id == value){
           orderObjectsArray.splice(orderObjectsArray[i], 1)
       }
   }
   renderOrder()
}

function handleButtonClick(){
    document.getElementById('modal').style.display = 'flex'
}

function renderOrder(){
    let orderHtml = ''   
    let totalPrice = 0
    
    if(orderObjectsArray.length > 0){
        document.getElementById('order-box').style.display = 'flex'
        
        for(let i = 0 ; i < orderObjectsArray.length; i++ ){
            orderHtml += `
                    <div class="order-box-item">
                        <h1>${orderObjectsArray[i].name}
                            <span class="quantity">x ${orderObjectsArray[i].quantity + 1}</span></h1>
                        <p class="remove" data-remove="${orderObjectsArray[i].id}">remove</p>
                        <h1 class="order-box-item-price">$${orderObjectsArray[i].price}</h1>
                    </div>
            `
            totalPrice += orderObjectsArray[i].price        
        }    
        document.getElementById('order-box-item-list').innerHTML = orderHtml    
        document.getElementById('order-box-total-price').innerText = `$${totalPrice}`  
    }
    else{
        document.getElementById('order-box').style.display = 'none'
    }
}

function renderItems(){
    let itemsHtml = ''
    
    for(let item of menuArray){
        itemsHtml += `
         <div class="item">
                <span class="emoji">${item.emoji}</span>
                <div>
                    <h2>${item.name}</h2>
                    <p class="ingredients">${item.ingredients}</p>
                    <h3>$${item.price}</h3>
                </div>
                <span class="item-add" data-add='${item.id}'>+</span>
            </div>
        `
    }
    document.getElementById('menu-items-list').innerHTML = itemsHtml
}

renderItems()