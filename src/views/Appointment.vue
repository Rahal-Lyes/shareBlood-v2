<template>
  <v-container>
    <v-card elevation="3" class="calendar-card">
      <v-card-text class="pa-6">
        <FullCalendar :options="calendarOptions" />
      </v-card-text>
    </v-card>

    <v-dialog
      v-model="showDialog"
      persistent
      max-width="600px"
      transition="dialog-bottom-transition"
    >
      <v-card class="dialog-card" elevation="24">
        <v-card-title class="dialog-header pa-6">
          <div class="d-flex align-center justify-space-between w-100">
            <div class="d-flex align-center ga-3">
              <v-avatar color="primary" size="40">
                <v-icon color="white" size="20">mdi-calendar-plus</v-icon>
              </v-avatar>
              <div>
                <h2 class="text-h5 text-white mb-1">Prendre un Rendez-vous</h2>
                <!-- <p class="text-caption text-white opacity-80 mb-0">Planifiez votre prochaine réunion</p> -->
              </div>
            </div>
          </div>
        </v-card-title>

        <v-card-text class="pa-6">
          <v-form ref="form" v-model="isValid">
            <!-- Nom -->
            <div class="mb-6">
              <v-text-field
                label="Votre nom "
                v-model="calendarStore.selectedEvent.name"
                required
                autofocus
                variant="outlined"
                color="primary"
                :rules="nameRules"
                prepend-inner-icon="mdi-text"
                placeholder="your name"
                class="custom-text-field"
              />
            </div>

            <!-- Téléphone -->
            <div class="mb-6">
              <v-text-field
                label="Numéro de téléphone"
                v-model="calendarStore.selectedEvent.phone_number"
                required
                variant="outlined"
                color="primary"
                prepend-inner-icon="mdi-phone"
                placeholder="0555 55 55 55"
                class="custom-text-field"
              />
            </div>

            <!-- Horaires -->
            <div class="time-section">
              <h3
                class="text-subtitle-1 font-weight-medium mb-4 d-flex align-center ga-2"
              >
                <v-icon color="primary" size="20">mdi-clock-outline</v-icon>
                Horaires
              </h3>

              <v-card variant="outlined" class="time-card pa-4">
                <div class="d-flex align-center justify-center ga-4 flex-wrap">
                  <div class="time-chip-container">
                    <p
                      class="text-caption text-medium-emphasis mb-2 text-center"
                    >
                      Début
                    </p>
                    <RelativeTimeChip
                      :date="calendarStore.selectedEvent.start"
                      color="success"
                      icon="mdi-play"
                    />
                  </div>

                  <v-icon color="primary" size="24" class="arrow-icon">
                    mdi-arrow-right
                  </v-icon>

                  <div class="time-chip-container">
                    <p
                      class="text-caption text-medium-emphasis mb-2 text-center"
                    >
                      Fin
                    </p>
                    <RelativeTimeChip
                      :date="calendarStore.selectedEvent.end"
                      color="error"
                      icon="mdi-stop"
                    />
                  </div>
                </div>

                <v-divider class="my-4" />
                <div class="text-center">
                  <v-chip
                    color="info"
                    variant="tonal"
                    size="small"
                    prepend-icon="mdi-timer-outline"
                  >
                    Durée: {{ calculateDuration() }}
                  </v-chip>
                </div>
              </v-card>
            </div>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-6 pt-0">
          <v-spacer />
          <v-btn
            variant="outlined"
            color="grey"
            @click="closeDialog"
            size="large"
            class="me-3"
          >
            <v-icon start>mdi-close</v-icon>
            Annuler
          </v-btn>

          <v-btn
            color="primary"
            @click="saveEvent"
            :disabled="!isValid"
            :loading="saving"
            size="large"
            variant="elevated"
          >
            <v-icon start>mdi-content-save</v-icon>
            Enregistrer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useCalendarStore } from "@/stores/UseCalendarStore";
import RelativeTimeChip from "@/components/RelativeTimeChip.vue";
const showDialog = ref(false);
const calendarStore = useCalendarStore();

const isValid = computed(() => {
  return (
    calendarStore.selectedEvent.name?.trim().length > 0 &&
    calendarStore.selectedEvent.phone_number?.trim().length >= 10
  );
});

const closeDialog = () => {
  showDialog.value = false;
  calendarStore.resetSelection();
};

const saveEvent = async () => {
  if (isValid.value) {
    await calendarStore.addData();
    showDialog.value = false;
  }
};
// console.log(calendarStore.getUserId,'userid');
const handleSelect = (info) => {

  calendarStore.setSelection({
    start: info.startStr,
    end: info.endStr,
  });
  showDialog.value = true;
};

const calendarOptions = computed(() => ({
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: "timeGridWeek",
  selectable: true,
  editable: false,
  select: handleSelect,
  slotMinTime: "08:00:00",
  slotMaxTime: "17:00:00",
  slotDuration: "00:20:00",

  selectAllow: (selectInfo) => {
    if (!selectInfo) return false;

    const day = new Date(selectInfo.start).getDay();
    if (day === 5) return false; // interdire vendredi

    const durationMinutes =
      (new Date(selectInfo.end) - new Date(selectInfo.start)) / 1000 / 60;
    if (durationMinutes !== 20) return false;

    // Bloquer si déjà réservé
    return !calendarStore.events.some(
      (event) =>
        event.reserved &&
        new Date(event.start) < selectInfo.end &&
        new Date(event.end) > selectInfo.start
    );
  },

  eventClick: ({ event }) => {
    // Ne rien faire si déjà réservé
    if (event.extendedProps.reserved) return false;

    calendarStore.setSelection({
      id: event.id,
      start: event.startStr,
      end: event.endStr,
      name: event.extendedProps.name,
      phone_number: event.extendedProps.phone_number,
    });
    showDialog.value = true;
  },

  eventDidMount: ({ event, el }) => {
    // Si réservé, changer couleur et rendre clic impossible
    if (event.extendedProps.reserved) {
      el.style.backgroundColor = "#FF6B6B";
      el.style.text="Reserved" // rouge par exemple
      el.style.pointerEvents = "none"; // désactive le clic
    }
     const titleEl = el.querySelector(".fc-event-title"); // FullCalendar utilise cette classe
    if (titleEl) {
      titleEl.innerText = "Reserved"; // remplace le titre
    } else {
      el.innerText = "Reserved"; // fallback
    }
  },

  headerToolbar: {
    left:"",
    center: "title",
   right: ""
  },

  locale: "en",
  events: calendarStore.events,
}));

onMounted(() => {
  calendarStore.fetchData();
});

// Données réactives

const saving = ref(false);
const form = ref(null);

// Règles de validation
const titleRules = [
  (v) => !!v || "Le titre est requis",
  (v) => (v && v.length >= 3) || "Le titre doit contenir au moins 3 caractères",
];

// Options de priorité
const priorityItems = [
  { title: "Faible", value: "low" },
  { title: "Normal", value: "normal" },
  { title: "Élevée", value: "high" },
  { title: "Urgente", value: "urgent" },
];

// Calcul de la durée
const calculateDuration = () => {
  const start = new Date(calendarStore.selectedEvent.start);
  const end = new Date(calendarStore.selectedEvent.end);
  const diff = end - start;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`;
  }
  return `${minutes}min`;
};

// Méthodes
</script>

<style scoped>
.calendar-card {
  background-color: rgba(var(--v-theme-background));
  color: rgba(var(--v-theme-on-background));
}

.time-info-card {
  background: rgba(25, 118, 210, 0.05);
  transition: all 0.3s ease;
}

.time-info-card:hover {
  background: rgba(25, 118, 210, 0.1);
}

/* Styles personnalisés pour FullCalendar */
:deep(.fc) {
  font-family: "Roboto", sans-serif;
}

:deep(.fc-toolbar) {
  margin-bottom: 1.5rem;
}

:deep(.fc-button) {
  background: rgba(var(--v-theme-success)) !important;

  border-color: rgba(var(--v-theme-info)) !important;
  text-transform: none !important;
  font-weight: 500 !important;
}
</style>

<!-- 
<template>
  <div class="upload-section">
    <h2>تحويل PDF إلى صورة</h2>
    <input type="file" @change="handleFileUpload" accept="application/pdf" />
    <button @click="submit" :disabled="!file">أرسل</button>

    <div v-if="imageUrl">
      <h3>الصورة الناتجة:</h3>
      <img :src="imageUrl" alt="Converted Image" />
      <a :href="imageUrl" download="converted.jpg">تحميل الصورة</a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      file: null,
      imageUrl: null
    }
  },
  methods: {
    handleFileUpload(e) {
      this.file = e.target.files[0]
    },
    async submit() {
      try {
        const formData = new FormData()
        formData.append('file', this.file)

        const response = await axios.post(
          'http://localhost:8000/api/v1/pdf/pdf-to-jpg/',
          formData,
          { responseType: 'blob' }
        )

        const url = URL.createObjectURL(new Blob([response.data]))
        this.imageUrl = url
      } catch (error) {
        console.error('Erreur lors de la conversion :', error)
        alert('Échec de la conversion. Veuillez réessayer.')
      }
    }
  }
}
</script>

<style scoped>
.upload-section {
  max-width: 500px;
  margin: auto;
  text-align: center;
}
img {
  max-width: 100%;
  margin-top: 20px;
}
</style>
-->
