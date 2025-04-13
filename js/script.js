import { getCateg, getProductByCat, deleteProductByid } from "./service.js";

const cards = document.getElementById("cards")
const categList = document.getElementById("categList");
const headSec = document.getElementById("headSec"); 



let categData = []

async function  printCateg() {
    categData = await getCateg()
    categData.forEach(element => {
        const onclckEvent = `onclick="printCatProds('${element.slug}')"`
        const printHeadSec = `onclick='printHeadSec(${true})'`
        categList.innerHTML += ` <li class="flex" ${element.slug != "kampaniyalar" ? onclckEvent : printHeadSec}>
        <a rel="noopener noreferrer" href="#" class="flex items-center uppercase hover:text-white ">
        ${element.slug}</a>
        </li>`
    });
}
printCateg(); 

  window.printHeadSec = (status) =>{
    status && localStorage.clear()   
    console.log('qaqa islirem')
    cards.innerHTML = `<section id="headSec">
       
    </section>`
}
 printHeadSec()

window.printCatProds = async (ctg) => {
    headSec.style.display = 'none'
    cards.innerHTML = ''
    const cardsData = await getProductByCat(ctg)
    cardsData.forEach(element =>{
        cards.innerHTML += `<div class="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-50 dark:text-gray-900">
        <img src="${element.img}" alt="" class="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500">
        <div class="mt-6 mb-2">
		<span class="block text-xs font-medium tracking-widest uppercase dark:text-violet-600">${element.category}</span>
		<h2 class="text-xl font-semibold tracking-wide">${element.title}</h2>
        </div>
        <p class="dark:text-gray-800">${element.composition}</p>
        <p class="dark:text-gray-800 font-semibold">Qiymet: ${element.price}$</p>
        <button onclick="handleDelete('${ctg}', '${element.id}')" class=" p-2 bg-red-600 text-white border rounded-[10px]">Delete</button>
        <button class="p-2 bg-amber-600 text-white border rounded-[10px]">Edit</button>
        </div>`
    })
}


window.handleDelete = async (ctg, id) => {
    await deleteProductByid( ctg, id)
    localStorage.setItem('catagory', ctg)
}

function  staticRender() {
    const catagory = localStorage.getItem('catagory') 
    if(catagory){
        printCatProds(catagory)
    } 
}
staticRender()