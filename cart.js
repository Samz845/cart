const cartContainer = document.getElementById('container');
const itemCountSpan = document.getElementById('item-count');
const cartList = document.getElementById('cart-list-container');
const totalContainer = document.getElementById("total-container");
const subTotalSpan = document.getElementById("sub-total");
const logoContainer = document.getElementById('logo-container');
const orderConfirmed = document.getElementById('order-confirmed');
const confirmBtn = document.getElementById('confirm-btn');
const subTotalSpan2 = document.getElementById("sub-total-2");
const products = [
    {   
        id: 0,
        count: 1,
        img: "images/image-1.jpg",
        name:"Pistachio Baklava",
        price: 6.50,
        initial: "Baklava"
    },

    {
        id: 1,
        count: 1,
        img: "images/image-2.jpg",
        name:"Salted Caramel Brownie",
        price: 5.50,
        initial: "Brownie"
    },

    {
        id: 2,
        count: 1,
        img: "images/image-3.jpg",
        name:"Red Velvet Cake",
        price: 4.50,
        initial: "Cake"
    },

    
    {
        id: 3,
        count: 1,
        img: "images/image-4.jpg",
        name:"Vanilla Bean Creme Brulee",
        price: 7.00,
        initial: "Creme Brulee"
    },

    
    {
        id: 4,
        count: 1,
        img: "images/image-5.jpg",
        name:"Macaron Mix of Five",
        price: 4.50,
        initial: "Macaron",
    },

    
    {
        id: 5,
        count: 1,
        img: "images/image-6.jpg",
        name:"Lemon Meringue Pie",
        price: 4.50,
        initial: "Pie",
    },

    
    {
        id: 6,
        count: 1,
        img: "images/image-7.jpg",
        name:"Vanilla Panna Cotta",
        price: 6.50,
        initial: "Pana Cotta",
    },

    
    {
        id: 7,
        count: 1,
        img: "images/image-8.jpg",
        name:"Classic Tiramisu",
        price: 5.50,
        initial: "Tiramisu",
    },

    
    {
        id: 8,
        count: 1,
        img: "images/image-9.jpg",
        name:"Waffle with Berries",
        price: 6.50,
        initial: "Waffle",
    }
];

products.forEach(({img, name, price, initial, id}) =>{
    cartContainer.innerHTML += `
       <div class="card">
           <img src="${img}" alt="" id="img-${id}" class="img-display">
           <p class="initial">${initial}</p>
           <p class="name">${name}</p>
           <p class="price-tag">$${price}</p>
           <button id=${id} class="cart-btn" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>Add to Cart</button>

           <div class="control-btn hide" id="control-btn-${id}">
               <button class="control" type="button" onclick="cart.decrementItem(${id})"><span class="block">-</span></button>
               <span id="item-count-${id}" class="white"></span>
               <button class="control" type="button" onclick="cart.incrementItem(${id})"><span class="block">+</span></button>
           </div>
       </div>
    `
})

class shoppingCart{
    constructor(){
        this.items = [];
        this.sum = 0;
        this.taxRate = 8.25;
    }


          addToCart(id,products){
            const product = products.find((item) => item.id === id)
            const {name, price} = product;
            this.items.push(product);
        const totalCountPerProduct = {};
        this.items.forEach((dessert) => {
            totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
        });
        const currentCount = totalCountPerProduct[product.id];
        

            cartList.innerHTML += `
        <div id="cart-item-${id}" class="cart-container">
            <div class="name-div">
                 <p>${name}</p>
                 <p><span id="current-product-count-${id}" class="count-span">${currentCount}x</span> <span class="initial">@${price}</span>  <span class="initial">$${price}</span></p>
           </div>
           <button class="delete" type="button" onclick="cart.deleteCart(${id})"><svg height="10px" width="10px"xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg></button>
        </div>
        <hr id="line-${id}">
      `
    
             
              const controlBtn = document.getElementById(`control-btn-${id}`)
              controlBtn.classList.remove('hide');
              const img = document.getElementById(`img-${id}`);
              img.style.border = "4px solid hsl(14, 91%, 42%)";
              const itemCount = document.getElementById(`item-count-${id}`);
              itemCount.textContent = `${currentCount}`;
        }

                    
          incrementItem(id) {
            const product = this.items.find(item => item.id === id);
            if (product) {
                this.items.push(product);
                const itemElement = document.getElementById(`cart-item-${id}`);
                const currentCount = this.items.filter(item => item.id === id).length;
        
                const countSpan = itemElement.querySelector(`#current-product-count-${id}`);
                const priceSpan = itemElement.querySelector('.initial:last-of-type');
                const itemCount = document.getElementById(`item-count-${id}`);
                itemCount.textContent =`${currentCount}`;
                countSpan.textContent = `${currentCount}x`;
                priceSpan.textContent = `$${(currentCount * product.price).toFixed(2)}`;
                this.calculateTotal();
                itemCountSpan.innerText = cart.getCounts();
            }
        }

            decrementItem(id) {
                const itemIndex = this.items.findIndex(item => item.id === id);
            
                if (itemIndex !== -1) {
                    this.items.splice(itemIndex, 1);
                    console.log(this.items);
                    const currentCount = this.items.filter((item) =>item.id === id).length;
                    console.log(this.items);
                    if (currentCount === 0) {
                        const itemElement = document.getElementById(`cart-item-${id}`);
                        if (itemElement) {
                            itemElement.remove();
                            const controlBtn = document.getElementById(`control-btn-${id}`)
                            controlBtn.classList.add('hide');
                            const hrTag = document.getElementById(`line-${id}`);
                            hrTag.remove()
                            const img = document.getElementById(`img-${id}`);
                            img.style.border = "none";
                        }
                    } else {
                        const countSpan = document.querySelector(`#current-product-count-${id}`);
                        const priceSpan = document.querySelector(`#cart-item-${id} .initial:last-of-type`);
                        const itemCount = document.getElementById(`item-count-${id}`);
                        itemCount.textContent= `${currentCount}`;
                        countSpan.textContent = `${currentCount}x`;
                        priceSpan.textContent = `$${(currentCount * this.items[itemIndex].price).toFixed(2)}`;
                    }

                    if(this.items.length === 0){
                        totalContainer.style.display = "none";
                        logoContainer.style.display = 'block';
                    }
                    this.calculateTotal();
                    itemCountSpan.innerText = cart.getCounts();
                }
            }
            
        

          getCounts(){
            return this.items.length;
          }

          calculateTaxes(amount){
            return parseFloat((this.taxRate/100) * amount).toFixed(2);
          }

          calculateTotal(){
            const midTotal = this.items.reduce((total, item) => total + item.price, 0 );
            const tax = parseFloat(this.calculateTaxes(midTotal));
            this.sum = midTotal + tax;
            subTotalSpan.textContent = `$${this.sum.toFixed(2)}`;
            return this.sum
        }

     deleteCart(id){
            this.items = this.items.filter(item => item.id !== id);
            itemCountSpan.innerText = this.getCounts()
            const itemElement = document.getElementById(`cart-item-${id}`);
            if (itemElement) {
                itemElement.remove();
                const controlBtn = document.getElementById(`control-btn-${id}`)
                controlBtn.classList.add('hide');
                const hrTag = document.querySelector('hr');
                hrTag.remove()
                const img = document.getElementById(`img-${id}`);
                img.style.border = "none";
            }

            if(this.items.length === 0){
                totalContainer.style.display = "none";
                logoContainer.style.display = 'block';
            }
            this.calculateTotal()
            return this.items;
     }

     confirm() {
        const finalStage = document.getElementById('final-stage');
        orderConfirmed.style.display = "block";
        const midTotal = this.items.reduce((total, item) => total + item.price, 0);
        const tax = parseFloat(this.calculateTaxes(midTotal));
        this.sum = midTotal + tax;
        subTotalSpan2.textContent = `$${this.sum.toFixed(2)}`;
        const cartListContainer = document.querySelector('.cart-list');
        finalStage.innerHTML = "";
        if(window.innerWidth <= 555){
            cartListContainer.style.display = 'none'
            cartContainer.style.display = 'none';
        }
        const groupedItems = this.items.reduce((acc, item) => {
            if (!acc[item.id]) {
                acc[item.id] = { ...item};
            } else {
                acc[item.id].count += 1;
            }
            return acc;
        }, {});
        const groupedArray = Object.values(groupedItems);

            finalStage.innerHTML = groupedArray.map(({id,price,img,name,count}) =>`
                <div id="${id}" class="confirm-food">
                    <div class="img-con">
                        <img src="${img}" alt="">
                    </div>
                    <div class="name-div">
                        <p>${name}</p>
                        <p><span id="current-product-count-${id}" class="count-span price-tag">${count}x</span> <span class="initial">@${price}</span></p>
                    </div>
                    <p>${(count *  price).toFixed(2)}</p>
                </div>
            `).join("");
    }
    

    
    
}

const cart = new shoppingCart()

const addToCartBtns = document.getElementsByClassName('cart-btn');
[...addToCartBtns].forEach((btn) =>{
    btn.addEventListener("click", (e)=>{
        logoContainer.style.display = 'none';
        cart.addToCart(Number(e.target.id), products);
        itemCountSpan.innerText = cart.getCounts();
        totalContainer.style.display = "block";
        cart.calculateTotal();
    })
})

confirmBtn.addEventListener('click', ()=>{
    cart.confirm();
})
