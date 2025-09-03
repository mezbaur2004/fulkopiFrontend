import axios from "axios";

export async function fetchProducts() {
    let data= await axios.get('http://localhost:3030/api/productlist')
    console.log(data.data.data[0])
}