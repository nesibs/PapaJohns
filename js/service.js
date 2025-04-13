async function  getCateg() {
    const res = await fetch("http://localhost:3000/category")
    const data = await res.json()
    return data
}

async function  getProductByCat(ctg) {
    const res = await fetch(`http://localhost:3000/${ctg}`)
    const data = await res.json()
    return data
}

async function deleteProductByid(ctg, id) {
    const res = await fetch(`http://localhost:3000/${ctg}/${id}`, {
        method: 'DELETE'
    });
 
    if (res.status === 204) {
        return { message: "Silindi" };
    }

    const data = await res.json();
    return data;
}


export {
    getCateg,
    getProductByCat,
    deleteProductByid
}