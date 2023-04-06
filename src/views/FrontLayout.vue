<template>
  <NavbarComponent></NavbarComponent>
  <RouterView></RouterView>
  <FooterComponent></FooterComponent>
</template>

<script>

import { RouterView } from 'vue-router'
import NavbarComponent from '../components/front/navbarComponent.vue'
import FooterComponent from '../components/front/footerComponent.vue'

export default {
  components: {
    RouterView, NavbarComponent, FooterComponent
  }
}
</script>
