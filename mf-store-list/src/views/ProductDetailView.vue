<template>
  <div class="wrapper">
    <div class="wrapper-product-detail">
      <div class="container-images">
        <img :src="getActiveImage()" alt="Product Image" />

        <div class="container-images-tiny">
          <img
            v-for="(image, index) in images"
            :src="image"
            alt="Product Image"
            width="100"
            v-bind:class="{ active: isActiveImage(index) }"
            @click="setActiveImage(index)"
          />
        </div>
      </div>
      <div class="container-description">
        <h1>My Product of the testing, into my H1</h1>

        <div class="container-actions">
          <button class="btn-shopping-cart">Agregar a carro de compras</button>

          <div class="container-price">$ 100.00</div>
        </div>
      </div>
    </div>

    <div class="wrapper-product-container">
      <ul
        class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
      >
        <li class="me-2">
          <a
            href="#"
            aria-current="page"
            class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
            >Profile</a
          >
        </li>
        <li class="me-2">
          <a
            href="#"
            class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >Dashboard</a
          >
        </li>
        <li class="me-2">
          <a
            href="#"
            class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >Settings</a
          >
        </li>
        <li class="me-2">
          <a
            href="#"
            class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            >Contacts</a
          >
        </li>
        <li>
          <a
            class="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500"
            >Disabled</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const activeImage = ref(0)

const images = [
  'https://picsum.photos/id/1/600/600',
  'https://picsum.photos/id/2/600/600',
  'https://picsum.photos/id/3/600/600',
  'https://picsum.photos/id/4/600/600'
]

const getActiveImage = () => {
  return images[activeImage.value]
}

const setActiveImage = (index) => {
  activeImage.value = index
}

const isActiveImage = (index) => {
  return activeImage.value === index
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}

.wrapper-product-detail {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  background-color: #eeeef1;
  width: 100%;
  height: 100%;
}

.container-description {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: red;
  height: 100%;
}

.container-images {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  background-color: red;
}

.container-images img {
  border-radius: 10px;
}

.container-images-tiny {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 20px;
}

.container-images-tiny img {
  border-radius: 5px;
}

.container-images-tiny img.active {
  border: 4px solid var(--primary-color);
}

.container-description h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-dark-color);
}

.container-description p {
  color: var(--text-light-color);
}

.container-actions {
  display: flex;
  align-items: center;
  padding: 20px 0;
}

.container-actions .btn-shopping-cart {
  margin-right: 20px;
}

.btn-shopping-cart {
  background-color: var(--primary-color);
  color: white;
  padding: 15px 20px;
  border-radius: 20px;
  font-weight: bold;
}

.container-price {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-dark-color);
}
</style>
