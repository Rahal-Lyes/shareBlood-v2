<template>
  <v-container class="scroll-container">
    <v-row>
      <v-col
        sm="6"
        md="4"
        lg="6"
        v-for="product in products"
        :key="product.id"
      >
        <v-card rounded="xl">
          <v-img :src="product.image" height="200px" aspect-ratio="16/9"></v-img>

          <v-card-title class="text-subtitle-1 text-blue-darken-4">
            {{ product.product_name }}
          </v-card-title>

          <v-card-text>{{ product.description }}</v-card-text>

          <v-card-subtitle class="text-yellow-darken-4 text-body-1">
            Price : {{ product.price }} $
          </v-card-subtitle>

          <v-card-actions class="justify-center">
            <!-- Bouton voir détails -->
            <v-btn color="primary" @click="showDetails(product)">
              <v-icon icon="mdi-eye-circle-outline" start></v-icon>
            </v-btn>

            <!-- Catégorie -->
            <v-chip class="ma-2" color="success" variant="outlined">
              <v-icon icon="mdi-shape-plus" start></v-icon>
              {{ product.category.name }}
            </v-chip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialogue détails produit -->
    <v-dialog v-model="dialog" max-width="70%" rounded="xl">
      <v-card v-if="selectedProduct">
        <v-img :src="selectedProduct.image" height="250px" cover></v-img>

        <v-card-title class="text-h6 text-blue-darken-4">
          {{ selectedProduct.product_name }}
        </v-card-title>

      <v-card-text>
  <p class="text-grey-darken-3 text-body-1">{{ selectedProduct.description }}</p>

  <p>
    <strong class="text-deep-purple-accent-4">Prix :</strong>
    <span class="text-teal-darken-2">{{ selectedProduct.price }} $</span>
  </p>

  <p>
    <strong class="text-deep-purple-accent-4">Stock :</strong>
    <span class="text-orange-darken-2">{{ selectedProduct.stock }}</span>
  </p>

  <p>
    <strong class="text-deep-purple-accent-4">Disponible :</strong>
    <span v-if="selectedProduct.is_available" class="text-green-darken-2">Oui</span>
    <span v-else class="text-red-darken-2">Non</span>
  </p>

  <p>
    <strong class="text-deep-purple-accent-4">Catégorie :</strong>
    <span class="text-indigo-darken-2">{{ selectedProduct.category.name }}</span>
  </p>

  <p class="text-body-2 text-blue-grey-darken-1">
    {{ selectedProduct.category.description }}
  </p>
</v-card-text>


        <v-card-actions>
          <v-btn text="Fermer" color="red" @click="dialog = false"></v-btn>
          <v-btn text="Ajouter au panier" color="primary"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import api from "@/http";
import { onMounted, ref } from "vue";

const products = ref([]);
const dialog = ref(false);
const selectedProduct = ref(null);

onMounted(async () => {
  try {
    const response = await api.get("shop/products/");
    products.value = response.data.results;
  } catch (error) {
    console.error("Erreur lors du chargement des produits :", error);
  }
});

function showDetails(product) {
  selectedProduct.value = product; // on stocke le produit cliqué
  dialog.value = true; // on ouvre le dialogue
}
</script>

<style>
.scroll-container {
  max-height: 80vh;
  overflow-y: auto;
}
</style>
