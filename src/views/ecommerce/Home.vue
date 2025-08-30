<template>
  <div class="relative w-full overflow-hidden flex gap-4">
    <img class="slide w-32" :src="img" alt="slide1" />
    <img class="slide w-32" :src="img" alt="slide2" />
    <img class="slide w-32" :src="img" alt="slide3" />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { gsap } from "gsap";
import img from "@/assets/vue.svg";

onMounted(() => {
  // Sélectionner toutes les slides avec GSAP
  gsap.to(".slide", {
    x: 400,
    rotate: 360,
    duration: 3,
    stagger: 0.5, // décalage entre chaque image
    repeat: -1,   // boucle infinie
    yoyo: true    // animation aller-retour
  });
});
</script>

<style scoped>
.slide {
  min-width: 100px;
}
</style>
