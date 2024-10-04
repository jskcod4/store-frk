<script setup lang="ts">
import type { Product } from '@/modules/product/domain/product'
import { useShoppingCartStore } from '@/stores/shopping-cart'
import IconShoppingcart from './icons/IconShoppingcart.vue'
import { ref } from 'vue'

const product = defineProps<Omit<Product, 'description' | 'stock'>>()
const store = useShoppingCartStore()
const test = ref('test')

const addToCart = () => {
  store.addToCart({
    id: product.id,
    name: product.name,
    price: product.price
  })
}
</script>
<template>
  <div class="product-card">
    <img :src="product.imageUrl" :alt="product.name" />
    <div class="product-card-content">
      <h3>{{ product.name }}</h3>
      <div class="product-card-content-info">
        <p>{{ product.category }}</p>
        <p>{{ product.price }}</p>
      </div>
      <IconShoppingcart class="product-card-content-icon" @click="addToCart" />
    </div>
  </div>
</template>
<style scoped>
.product-card {
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.product-card img {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
}

.product-card-content {
  --padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: var(--padding);
}

.product-card-content h3 {
  text-align: left;
  font-weight: bold;
  color: rgb(30, 36, 77);
}

.product-card-content-info {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}

.product-card-content .product-card-content-icon {
  position: absolute;
  top: calc(var(--padding) * -1);
  right: calc(var(--padding));
  height: 40px;
  width: 40px;
  background-color: white;
  border-radius: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 5px;
  cursor: pointer;
}

.product-card-content-icon:active {
  transform: scale(0.9);
}
</style>
