<script setup lang="ts">
import type { Product } from '@/modules/product/domain/product'
import { useShoppingCartStore } from '@/stores/shopping-cart'
import IconShoppingcart from './icons/IconShoppingcart.vue'

const product = defineProps<Omit<Product, 'description' | 'stock'>>()
const store = useShoppingCartStore()

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
    <div class="product-card-body">
      <img :src="product.imageUrl" :alt="product.name" />
    </div>
    <div class="product-card-content">
      <h3 :title="product.name">{{ product.name }}</h3>
      <div class="product-card-content-info">
        <div class="product-card-content-info-left">
          <p>Precio</p>
          <p class="product-card-content-price">${{ product.price }}</p>
        </div>
        <div class="product-card-content-info-right">
          <IconShoppingcart :fill="'white'" class="product-card-content-icon" @click="addToCart" />
        </div>
      </div>
    </div>
    <div class="product-card-tag">
      {{ product.tag }}
    </div>
  </div>
</template>
<style scoped>
.product-card {
  --padding-right-left: 15px;
  position: relative;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.product-card-tag {
  position: absolute;
  font-weight: bold;
  color: var(--primary-color);
  left: var(--padding-right-left);
  top: 20px;
  background-color: var(--primary-color-light);
  padding: 2px 4px;
  border-radius: 5px;
  font-size: 12px;
}

.product-card-body {
  padding: 10px;
}

.product-card-body img {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  height: 250px;
  object-fit: contain;
}

.product-card-content {
  display: flex;
  flex-direction: column;
  padding: 20px var(--padding-right-left);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.product-card-content h3 {
  text-align: left;
  font-weight: bold;
  color: rgb(30, 36, 77);
  font-size: 18px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-card-content-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
}

.product-card-content-info-left p {
  margin: 0;
  font-weight: 300;
  color: rgb(153, 150, 150);
  text-align: left;
}

.product-card-content-info-left p.product-card-content-price {
  font-weight: bold;
  font-size: 20px;
  color: black;
}

.product-card-content .product-card-content-icon {
  display: flex;
  align-items: center;
  justify-self: center;
  height: 40px;
  width: 40px;
  background-color: var(--primary-color);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 5px;
  cursor: pointer;
}

.product-card-content-icon:active {
  transform: scale(0.9);
}
</style>
