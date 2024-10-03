import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useShoppingCartStore = defineStore('shoppingCart', () => {
  const products = ref<{ id: string; name: string; price: number; quantity: number }[]>([])
  const totalProductsAdded = computed(() => products.value.length)

  function addToCart({ id, name, price }: { id: string; name: string; price: number }) {
    const existingProduct = products.value.find((product) => product.id === id)

    if (existingProduct) {
      existingProduct.quantity += 1
    } else {
      products.value.push({ id, name, price, quantity: 1 })
    }
  }

  function removeFromCart(id: string) {
    products.value = products.value.filter((product) => product.id !== id)
  }

  function decrementQuantity(id: string) {
    const existingProduct = products.value.find((product) => product.id === id)

    if (existingProduct && existingProduct.quantity > 1) {
      existingProduct.quantity -= 1
    } else {
      removeFromCart(id)
    }
  }

  return { products, addToCart, totalProductsAdded, removeFromCart, decrementQuantity }
})
