 <template>
  <DefaultLayout>

    <template #default>
    
      <RouterView />
    </template>
  </DefaultLayout>
</template>





<script setup>
import { onMounted } from 'vue'
import { usePreferencesStore } from '@/stores/preferenceStore'
import { useTheme } from 'vuetify'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

onMounted(() => {
  const preferences = usePreferencesStore()
  const theme = useTheme()

  theme.global.name.value = preferences.theme
})
</script>
