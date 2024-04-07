import products from "../data/product-data";
const a = 1998;

function show(){
    console.log('Hiển thị danh sách sản phẩm');
}

class Product {
    constructor() {

    }
    render() {
        console.log('Xuất ra danh sách sản phẩm lên giao diện!');
    }
}
export {Product as default, a, products, show};