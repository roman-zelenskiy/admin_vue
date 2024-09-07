<script setup lang="ts"></script>

<template>
  <div class="d-flex flex-column align-items-center">
    <div class="show_without_image_wrapper">
      <svg class="icon" viewBox="0 0 65 65" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M32.5 0.0644531C36.8098 0.0644531 40.943 1.76861 43.9905 4.80203C47.038 7.83546 48.75 11.9497 48.75 16.2396C48.75 20.5295 47.038 24.6437 43.9905 27.6771C40.943 30.7105 36.8098 32.4147 32.5 32.4147C28.1902 32.4147 24.057 30.7105 21.0095 27.6771C17.962 24.6437 16.25 20.5295 16.25 16.2396C16.25 11.9497 17.962 7.83546 21.0095 4.80203C24.057 1.76861 28.1902 0.0644531 32.5 0.0644531ZM32.5 8.15201C30.3451 8.15201 28.2785 9.00409 26.7548 10.5208C25.231 12.0375 24.375 14.0946 24.375 16.2396C24.375 18.3845 25.231 20.4416 26.7548 21.9583C28.2785 23.475 30.3451 24.3271 32.5 24.3271C34.6549 24.3271 36.7215 23.475 38.2452 21.9583C39.769 20.4416 40.625 18.3845 40.625 16.2396C40.625 14.0946 39.769 12.0375 38.2452 10.5208C36.7215 9.00409 34.6549 8.15201 32.5 8.15201ZM32.5 36.4585C43.3469 36.4585 65 41.8367 65 52.6336V64.7649H0V52.6336C0 41.8367 21.6531 36.4585 32.5 36.4585ZM32.5 44.1416C20.4344 44.1416 7.71875 50.0456 7.71875 52.6336V57.0817H57.2812V52.6336C57.2812 50.0456 44.5656 44.1416 32.5 44.1416Z"
        />
      </svg>
    </div>
    <input
      type="file"
      class="form-control input"
      id="exampleFormControlFile1"
    />
  </div>
</template>

<style lang="scss" scoped>
.show_without_image_wrapper {
  width: clamp(80px, 10vw, 150px);
  height: clamp(80px, 10vw, 150px);
  position: relative;
  border-radius: 50%;
  background: var(--bs-light);
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  width: 50%;
  height: 40%;
  fill: var(--bs-theme);
}
.input {
  margin-top: 10px;
}
</style>
