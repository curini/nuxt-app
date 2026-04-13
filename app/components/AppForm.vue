<script setup>
import { callJourneys, callPlaces } from "~/composables/navitia";

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
const emit = defineEmits(["updateResult"]);

async function submitForm() {
  await setJourneys(form.value);
  emit("updateResult", result.value);
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
  </div>
</template>
