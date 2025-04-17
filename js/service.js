async function  getCateg() {
    const res = await fetch("https://papajohns-data.onrender.com/category")
    const data = await res.json()
    return data
}

async function  getProductByCat(ctg) {
    const res = await fetch(`https://papajohns-data.onrender.com/${ctg}`)
    const data = await res.json()
    return data
}

async function deleteProductByid(ctg, id) {
    const res = await fetch(`https://papajohns-data.onrender.com/${ctg}/${id}`, {
        method: 'DELETE'
    });
 
    if (res.status === 204) {
        return { message: "Silindi" };
    }

    const data = await res.json();
    return data;
}

async function createProduct(ctg ,prod) {
    const res = await fetch(`https://papajohns-data.onrender.com/${ctg}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(prod)
    })
    const data = await res.json()
    return data
}

async function updateProduct(ctg, id, updatedProd) {
    const res = await fetch(`https://papajohns-data.onrender.com/${ctg}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProd)
    })
    return await res.json()
}

export {
    getCateg,
    getProductByCat,
    deleteProductByid,
    createProduct,
    updateProduct
}