<script setup>
import { callJourneys, callPlaces } from "~/composables/navitia";
import { getCssClassBackground } from "@@/shared/helpers";
import { ref } from "vue";

const form = ref({ from: "", to: "" });
const { journeys: result, setJourneys } = callJourneys();
const { places: fromProposals, setPlaces: setFromProposals } = callPlaces();
const { places: toProposals, setPlaces: setToProposals } = callPlaces();
let timeout = null;

async function submitForm() {
  await setJourneys(form.value);
}

function searchPlacesForDeparture() {
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    await setFromProposals({ q: form.value.from });
  }, 300);
}
</script>

<template>
  <div>
    <!-- Error message -->
    <div v-if="result && result.error" class="alert alert-danger">
      {{ result.error.message }}
    </div>
    <form
      @submit.prevent="submitForm"
      class="d-flex row x-center mt-2 gap-2 y-bottom"
    >
      <div class="d-flex column">
        <label for="from" class="label">Départ</label>
        <input
          class="input"
          type="text"
          id="from"
          placeholder="Gare, station, lieu, adresse"
          v-model="form.from"
          @keydown="searchPlacesForDeparture"
        />
        <ul v-if="fromProposals">
          <li v-for="place in fromProposals.places">
            {{ place.name }}
          </li>
        </ul>
      </div>
      <div class="d-flex column">
        <label for="to" class="label">Arrivée</label>
        <input
          class="input"
          type="text"
          id="to"
          placeholder="Gare, station, lieu, adresse"
          v-model="form.to"
        />
      </div>
      <button type="submit" class="btn">Rechercher</button>
    </form>
    <!-- Journey Detail -->
    <div v-if="result && result.journeys">
      <div
        v-for="journey in result.journeys"
        :key="journey"
        class="{{ getCssClassBackground(journey.type) }}"
      >
        <div class="{{ getCssClassBackground(journey.type) }}">
          <span>{{ journey.departure_date_time }}</span>
          <span v-for="section in journey.sections" :key="section">
            {{ section.to.name }}
          </span>
          <span>{{ journey.arrival_date_time }}</span>
          <span>Delai: {{ journey.duration }}</span>
        </div>

        <div>
          <ul v-for="section in journey.sections" :key="section">
            <li>
              <span>{{ section.from.label }}</span>
              <span>{{ section.departure_date_time }}</span>
              <span>{{ section.to.label }}</span>
              <span>{{ section.arrival_date_time }}</span>
              <span>Delai: {{ section.duration }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
