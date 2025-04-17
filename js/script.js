import {createProduct, getCateg, getProductByCat, deleteProductByid, updateProduct } from "./service.js";

const cards = document.getElementById("cards")
const categList = document.getElementById("categList");
const headSec = document.getElementById("headSec"); 
const inps = document.querySelectorAll('#inps input')



let cardsData = []
let categData = []

const notyf = new Notyf({
    duration: 1000,
    position: {
        x: 'right',
        y: 'top',
    },
    types: [
        {
            type: 'warning',
            background: 'orange',
            icon: {
                className: 'material-icons',
                tagName: 'i',
                text: 'warning'
            }
        },
        {
            type: 'error',
            background: 'indianred',
            duration: 2000,
            dismissible: true
        }
    ]
})


//------------- EDIT EMELIYYATI --------------

let editMode = false;
let editId = null;
let editCtg = null;

window.handleEdit = (id, category) => {
    const product = cardsData.find(item => item.id == id)
    if (!product) return;

    inps[0].value = product.img
    inps[1].value = product.title
    inps[2].value = product.composition
    inps[3].value = product.price
    inps[4].value = product.category

    editMode = true
    editId = id
    editCtg = category

    // Əlavə Update düyməsi göstər
    if (!document.getElementById('updateBtn')) {
        const btn = document.createElement("button")
        btn.id = "updateBtn"
        btn.innerText = "Update Pizza"
        btn.className = "bg-white text-shadow-black px-5 py-1 border rounded-[15px]"
        btn.onclick = handleUpdate
        document.getElementById("inps").appendChild(btn)
    }
}

async function handleUpdate() {
    const updatedObj = {
        img: inps[0].value,
        title: inps[1].value,
        composition: inps[2].value,
        price: inps[3].value,
        category: inps[4].value
    }

    const updatedProd = await updateProduct(editCtg, editId, updatedObj)

    // Əvəz et cardsData içində
    cardsData = cardsData.map(p =>
        p.id == editId ? updatedProd : p
    )

    notyf.success("Məhsul yeniləndi!")
    printCard()

    // Reset state
    editMode = false
    editId = null
    editCtg = null
    document.getElementById('updateBtn')?.remove()

    // input-ları təmizlə
    inps.forEach(inp => inp.value = "")
}


// ------------- Kategoriyalarin Capi ----------------

async function printCateg() {
    categData = await getCateg()
    categData.forEach(element => {
        const onclckEvent = `onclick="printCatProds('${element.slug}')"`
        const printHeadSec = `onclick="printHeadSec(${true})"`
        categList.innerHTML += ` <li class="flex " ${element.slug != 'kampaniyalar' ? onclckEvent : printHeadSec}>
                                    <a rel="noopener noreferrer" href="#"
                                            class="flex items-center uppercase px-4 -mb-1 border-b-2 dark:border-transparent hover:text-white">${element.slug}
                                    </a>
                                </li>`
    });
}
printCateg()

window.printHeadSec = (status) => {
    status && localStorage.clear()
    cards.innerHTML = ` <section id="headSec" class="flex justify-center items-center w-full">
                           <div class='w-full'> 
                            <div class="flex justify-center mt-4 bg-gray-100">
                                    <div class="bg-gray-100 flex items-center gap-2 ">
                                    <span class="text-lg font-semibold text-gray-800">
                                        Promo kodunuz var?
                                    </span>
                                    <a href="#" class="text-teal-600 font-semibold hover:underline">
                                        Endirimdən istifadə edin!
                                    </a>
                                    <input
                                        type="text"
                                        placeholder="Promo kodu daxil edin"
                                        class="border border-teal-600 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-teal-400"
                                    />
                                    <button
                                        class="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded shadow"
                                    >
                                        OK
                                    </button>
                                    </div>
                                </div>
                                <div id="slider"></div>
                            </div>
                        </section>`
}
printHeadSec()

window.printCatProds = async (ctg) => {
    cards.innerHTML = ''
    printLoad()
    cardsData = await getProductByCat(ctg)
    printCard(ctg)

}

function printCard() {
    cards.innerHTML = ''
    cardsData.forEach(element => {
        cards.innerHTML += `<div class="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-50 hover:shadow-[2px_0px_28px_-4px_#ff0000]">
                                    <img alt="burda product var idi" onerror="this.src='https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png'" src="${element.img}" alt="" class="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500">
                                    <div class="mt-6 mb-2">
                                        <span class="block text-xs font-medium tracki uppercase dark:text-violet-400">Quisque</span>
                                        <h2 class="text-xl font-semibold tracki">${element.title}</h2>
                                    </div>
                                    <p> Qiymet: ${element.price}$</p>
                                    <p class="dark:text-gray-100">Mauris et lorem at elit tristique dignissim et ullamcorper elit. In sed feugiat mi. Etiam ut lacinia dui.</p>
                                    <button type="button" onclick="handleDelete('${element.category}', '${element.id}')" class="border bg-[red] rounded-md p-1 cursor-pointer">delete</button>
                                    <button type="button" onclick="handleEdit('${element.id}', '${element.category}')" class="border bg-[orange] rounded-md p-1 cursor-pointer">edit</button>
                                </div>`
    });
}

function printLoad() {
    for (let i = 0; i < 8; i++) {
        cards.innerHTML += `<div class="flex flex-col m-8 rounded shadow-md w-60 sm:w-80 animate-pulse h-96">
        <div class="h-48 rounded-t dark:bg-gray-700"></div>
        <div class="flex-1 px-4 py-8 space-y-4 sm:p-8 dark:bg-gray-900">
            <div class="w-full h-6 rounded dark:bg-gray-700"></div>
            <div class="w-full h-6 rounded dark:bg-gray-700"></div>
            <div class="w-3/4 h-6 rounded dark:bg-gray-700"></div>
        </div>
        </div>`
    }
}


window.handleDelete = async (ctg, id) => {
    await deleteProductByid(ctg, id)
    cardsData = cardsData.filter(item => item.id != id)
    printCard()

    Swal.fire({
        title: `Product deleted successfully.`,
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'Cool'
    }) 
}



window.handleCrate = () => {
    const obj = {
        img: inps[0].value,
        title: inps[1].value,
        composition: inps[2].value,
        price: inps[3].value,
        category: inps[4].value
    }
    createProduct(obj.category ,obj)
    cardsData.push(obj)
    printCard()
}


function  staticRender() {
    const catagory = localStorage.getItem('catagory') 
    if(catagory){
        printCatProds(catagory)
    } 
}
staticRender()
