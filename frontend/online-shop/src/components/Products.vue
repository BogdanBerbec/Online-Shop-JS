<template>
    <div>
        <div class="slidecontainer">
            <input v-model="value" @input="prodFilter" type="range" min="1" max="3000000" value="3000000" class="slider" id="myRange">
        </div>
        <section>
            <article 
                v-for="product in filteredProducts" 
                :key="product.product_id"
            >
                <p>{{ product.category }}</p>
                <p>{{ product.name }}</p>
                <div>{{ product.description }}</div>
                <p>{{ product.price }}</p>
                <button type="button" class="btn btn-primary">Buy</button>
            </article>
        </section>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            products: [],
            value: 3000000,
            filteredArray: [],
            filteredProducts: []
            // max: 3000000,
            // min: 1
        }
    },
    methods: {
        fetchProducts() {
            axios
                .get('http://localhost:8080/products')
                .then(response => {
                    this.products = response.data.sort((a, b) => {
                        return a.price - b.price
                    }).reverse()
                    this.filteredProducts = this.products
                })
                .catch(error => console.log(error))
        },
        prodFilter() {
            this.filteredProducts = this.products.filter(product => product.price <= this.value)
        }
    },
    // computed: {
    //     productsFiltered() {
    //         return this.products.filter(product => product.price < this.value)
    //     }
    // },
    mounted() {
        this.fetchProducts()
    },
}
</script>

<style>
/* body {
    background-color: white;
} */
div {
    background-color: white;
    color: black;
}
section {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}
article {
    width: 25em;
    height: 20em;
    border-width: 3px;
    border-style: solid;
    border-color: darkblue;
    border-radius: 10px;
    margin-top: 10px;
}
#number {
    display: flex;
    justify-content: space-around;
}
#myRange {
    width: 60em;
}
</style>