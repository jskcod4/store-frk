<template>
  <div
    role="status"
    class="product-card-skeleton max-w-sm p-4 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
  >
    <div
      class="flex items-center justify-center h-48 mb-4 bg-gray-100 rounded dark:bg-gray-700"
    ></div>
    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div class="flex items-center mt-4">
      <div>
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
        <div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
    </div>
    <span class="sr-only">Loading...</span>
  </div>
</template>
