<script setup lang="ts">
import { ref, type PropType } from 'vue'
import { AwsProductRepository } from '@/config'

import { DefaultErrorFetchMessage, type ProductRepository } from '@/modules/product/domain'

import ProductCard from '@/components/ProductCard.vue'

import ProductCardSkeleton from './ProductCardSkeleton.vue'
import { useFetchProducts } from '@/hooks/fetch-products.hooks'

const { repository } = defineProps({
  repository: {
    type: Object as PropType<ProductRepository>,
    default: AwsProductRepository
  }
})

const messageError = ref(DefaultErrorFetchMessage)
const { data } = useFetchProducts(repository)
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

  <div v-if="data.isLoading" class="product-list">
    <ProductCardSkeleton v-for="i in 6" :key="i" />
  </div>

  <div v-if="data.error" class="product-wrapper-error">
    <p>{{ messageError }}</p>
  </div>
</template>
<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}
</style>
