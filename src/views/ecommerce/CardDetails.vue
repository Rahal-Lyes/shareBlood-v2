<template>
  <v-container>
    <v-row>
      <v-col sm="6" md="4" lg="6" v-for="product in products" :key="product.id">
        <v-card rounded="xl" elevation="4">
          <!-- Image du produit -->
          <v-img
            :src="product.image"
            height="200px"
            aspect-ratio="16/9"
            cover
          ></v-img>

          <!-- Nom -->
          <v-card-title class="text-h6 text-blue-darken-4">
            {{ product.product_name }}
          </v-card-title>

          <!-- Description -->
          <v-card-text>
            {{ product.description }}
          </v-card-text>

          <!-- Prix + Stock + Disponibilité -->
          <v-card-subtitle class="text-yellow-darken-4 text-body-1">
            💰 Prix : {{ product.price }} DA
          </v-card-subtitle>

          <v-card-subtitle class="text-body-2">
            📦 Stock : {{ product.stock }}
          </v-card-subtitle>

          <v-card-subtitle class="text-body-2">
            ✅ Disponible : 
            <span v-if="product.is_available" class="text-green">Oui</span>
            <span v-else class="text-red">Non</span>
          </v-card-subtitle>

          <!-- Catégorie -->
          <v-card-text>
            <v-chip color="primary" class="ma-2" label>
              <v-avatar start>
                <v-img :src="product.category.image"></v-img>
              </v-avatar>
              {{ product.category.name }}
            </v-chip>
            <div class="text-caption">
              {{ product.category.description }}
            </div>
          </v-card-text>

          <!-- Bouton action -->
          <v-card-actions class="justify-center">
            <v-btn color="primary" rounded="pill">
              <v-icon start>mdi-cart-plus</v-icon>
              Ajouter au panier
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/http";

const products = ref([]);

onMounted(async () => {
  try {
    const response = await api.get("shop/products/");
    products.value = response.data.results;
  } catch (error) {
    console.error("Erreur lors du chargement des produits :", error);
  }
});
</script>
