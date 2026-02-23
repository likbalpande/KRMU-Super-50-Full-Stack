const getTotalPrice = (data) => {
    const { products } = data;

    const totalPrice = 0;
    products.forEach((product) => {
        totalPrice += product.price;
    });

    return totalPrice;
};

const getProducts = async () => {
    try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
    } catch (err) {
        console.log("---> Error:", err.message);
    }
};

const main = () => {
    getProducts();
    getTotalPrice();

    console.log(totalPrice);
};

main();
