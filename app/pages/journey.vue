<script setup>
import { callJourneys, callPlaces } from "~/composables/navitia";
import { getCssClassBackground, getTime, getDateTime } from "@@/shared/helpers";

const form = ref({ from: "", to: "", fromLabel: "", toLabel: "" });
const { journeys: result, setJourneys } = callJourneys();
const {
  places: fromProposals,
  setPlaces: setFromProposals,
  reinitPlaces: reinitFromProposals,
} = callPlaces();
const {
  places: toProposals,
  setPlaces: setToProposals,
  reinitPlaces: reinitToProposals,
} = callPlaces();
let timeout = null;

async function submitForm() {
  await setJourneys(form.value);
}

function searchPlaces(input) {
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    if (input === "from") {
      await setFromProposals({ q: form.value.fromLabel });
    } else {
      await setToProposals({ q: form.value.toLabel });
    }
  }, 300);
}

function updateInput($event, input, id) {
  const valueSelected = $event.target.innerText;
  if (input === "from") {
    reinitFromProposals();
    form.value.fromLabel = valueSelected;
    form.value.from = id;
  } else {
    reinitToProposals();
    form.value.toLabel = valueSelected;
    form.value.to = id;
  }
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
      class="d-flex row x-center mt-2 gap-2 y-top"
    >
      <div class="d-flex column">
        <label for="from" class="label">Départ</label>
        <input
          class="input"
          type="text"
          id="from"
          placeholder="Gare, station, lieu, adresse"
          v-model="form.fromLabel"
          @keydown="searchPlaces('from')"
        />
        <ul v-if="fromProposals" class="list-proposals">
          <li
            class="proposal"
            v-for="place in fromProposals.places"
            @click="updateInput($event, 'from', place.id)"
          >
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
          v-model="form.toLabel"
          @keydown="searchPlaces('to')"
        />
        <ul v-if="toProposals" class="list-proposals">
          <li
            class="proposal"
            v-for="place in toProposals.places"
            @click="updateInput($event, 'to', place.id)"
          >
            {{ place.name }}
          </li>
        </ul>
      </div>
      <button type="submit" class="btn mt-20px">Rechercher</button>
    </form>
    <!-- Journey Detail -->
    <div v-if="result && result.journeys" class="mt-20px">
      <div
        v-for="journey in result.journeys"
        :key="journey"
        :class="getCssClassBackground(journey.type)"
      >
        <div :class="getCssClassBackground(journey.type)">
          <span>{{ getTime(journey.departure_date_time) }}</span>
          <span v-for="section in journey.sections" :key="section">
            {{ section.to ? section.to.name : "" }}
          </span>
          <span>{{ getTime(journey.arrival_date_time) }}</span>
          <span>Delai: {{ journey.duration }}</span>
        </div>

        <div>
          <ul v-for="section in journey.sections" :key="section">
            <li>
              <span>{{ section.from ? section.from.label : "" }}</span>
              <span>{{ getDateTime(section.departure_date_time) }}</span>
              <span>{{ section.to ? section.to.label : "" }}</span>
              <span>{{ getDateTime(section.arrival_date_time) }}</span>
              <span>Delai: {{ section.duration }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
