<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue'
import { getAllProducts } from '@/modules/product/application/get-all'
import type { Product } from '@/modules/product/domain/product'
import { createLocalStorageProductRepository } from '@/modules/product/infrastructure'
import { onMounted, reactive, ref } from 'vue'

const data = reactive({
  isLoading: false,
  error: false,
  products: [] as Product[]
})

async function fetchProducts() {
  try {
    data.isLoading = true
    const res = await getAllProducts(createLocalStorageProductRepository())
    data.products = res
  } catch (error) {
    data.error = true
  } finally {
    data.isLoading = false
  }
}

onMounted(() => {
  fetchProducts()
})
</script>

<template>
  <div v-if="!data.isLoading" class="product-list">
    <ProductCard
      v-for="product in data.products"
      :key="product.id"
      :id="product.id"
      :imageUrl="product.imageUrl"
      :name="product.name"
      :category="product.category"
      :price="product.price"
    />
  </div>

  <div v-else-if="data.isLoading">Loading...</div>
</template>
<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}
</style>
