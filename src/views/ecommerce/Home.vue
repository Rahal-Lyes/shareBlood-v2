<template>
  <v-app>
  

  
    <!-- SECTION PRODUITS -->
    <v-container class="my-8">
      <h2 class="text-h4 font-weight-bold mb-6">Produits populaires</h2>

      <v-row>
        <v-col v-for="(product, i) in products" :key="i" cols="12" sm="6" md="4" lg="3">
          <v-card>
            <v-img :src="product.image" height="200px" cover></v-img>

            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-text>
              <div class="text-subtitle-1 font-weight-medium">{{ product.price }} €</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" block>Ajouter au panier</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- FOOTER -->
    <v-footer color="primary" app padless>
      <v-col class="text-center text-white py-4">
        © 2025 MyEcom CMS - Tous droits réservés
      </v-col>
    </v-footer>
  </v-app>
</template>

<script setup>
const products = [
  { name: "Smartphone", price: 299, image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" },
  { name: "Casque Audio", price: 99, image: "https://cdn.vuetifyjs.com/images/cards/house.jpg" },
  { name: "Montre Connectée", price: 199, image: "https://cdn.vuetifyjs.com/images/cards/docks.jpg" },
  { name: "Ordinateur Portable", price: 899, image: "https://cdn.vuetifyjs.com/images/cards/road.jpg" },
];
</script>
