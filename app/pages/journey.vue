<script setup>
import AppForm from "@/components/AppForm.vue";
import {
  getCssClassBackground,
  getTime,
  getDateTime,
  convertSecondsToTime,
  getTransportModeIcon,
} from "@@/shared/helpers";

const result = ref(null);

useSeoMeta({
  title: "Journey",
});

function handleResult(value) {
  result.value = value;
}

function toggleClass($event) {
  const parent = $event.currentTarget.parentElement;
  const detailContent = parent.querySelector("[class~='js-content']");

  if (detailContent && detailContent.className.indexOf("d-none") > -1) {
    detailContent.classList.remove("d-none");
  } else if (detailContent) {
    detailContent.classList.add("d-none");
  }
}
</script>

<template>
  <div>
    <!-- Error message -->
    <div v-if="result && result.error" class="alert alert-danger">
      {{ result.error.message }}
    </div>
    <!-- Form -->
    <AppForm @updateResult="handleResult" />
    <!-- Journey Detail -->
    <div v-if="result && result.journeys" class="mt-20px">
      <div
        v-for="journey in result.journeys"
        :key="journey"
        :class="getCssClassBackground(journey.type)"
      >
        <div
          :class="
            getCssClassBackground(journey.type) + ' p-2px custom-link border'
          "
          @click="toggleClass"
        >
          <div class="d-flex gap-2">
            <div>{{ getTime(journey.departure_date_time) }}</div>
            <div class="d-flex gap-1 overflow-hidden">
              <span
                v-for="section in journey.sections"
                :key="section"
                class="text-ellipsis"
              >
                {{ section?.to?.name }}
              </span>
            </div>
          </div>
          <div class="d-flex gap-2">
            <div>{{ getTime(journey.arrival_date_time) }}</div>
            <div>
              <span
                >Durée du trajet:
                {{ convertSecondsToTime(journey.duration) }}</span
              >
            </div>
          </div>
        </div>

        <div class="pb-2px d-none js-content">
          <ul v-for="section in journey.sections" :key="section">
            <li class="list-item">
              <div class="d-flex gap-2">
                <span class="tags tags-blue">{{
                  getDateTime(section.departure_date_time)
                }}</span>
                <span>{{ section?.from?.name }}</span>
              </div>
              <div class="d-flex gap-2">
                <span>{{ convertSecondsToTime(section.duration) }}</span>
                <div class="d-inline">
                  <span class="d-block">
                    <i :class="getTransportModeIcon(section)"></i>
                    {{ section.type }}</span
                  >
                  <span class="d-block" v-if="section.display_informations"
                    >{{ section.display_informations.network }}
                    {{ section.display_informations.label }}</span
                  >
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
