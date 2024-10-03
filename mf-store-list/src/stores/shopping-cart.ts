import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useShoppingCartStore = defineStore('shoppingCart', () => {
  const products = ref<{ id: string; name: string; price: number; quantity: number }[]>([])
  const totalProductsAdded = computed(() => products.value.length)

  function addToCart({ id, name, price }: { id: string; name: string; price: number }) {
    const existingProduct = products.value.find((product) => product.id === id)
    let quantity = 1

    if (existingProduct) {
      quantity = existingProduct.quantity + 1
    }

    products.value.push({ id, name, price, quantity })
  }

  function removeFromCart(id: string) {
    products.value = products.value.filter((product) => product.id !== id)
  }

  return { products, addToCart, totalProductsAdded, removeFromCart }
})
