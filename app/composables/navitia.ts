import { getTodayDateFormatted } from "@@/shared/helpers";
import type { JourneysResponse } from "@@/shared/types/journeys";
import type { PlacesResponse } from "@@/shared/types/places";

type URL = "journeys" | "places";
type JourneysParameters = { from: string; to: string; datetime?: string };
type PlacesParameters = { q: string };

async function navitia<T>(
  url: URL,
  parameters: PlacesParameters | JourneysParameters,
): Promise<T> {
  const { data, error } = await useFetch(
    `/api/${url}?${new URLSearchParams(parameters)}`,
  );
  if (error.value) {
    throw error.value;
  }
  return data.value as T;
}

function defaultJourneysParameters() {
  const params = new URLSearchParams();
  params.append("from", "admin:fr:75056");
  params.append("to", "admin:fr:69123");
  params.append("datetime", getTodayDateFormatted());
  return params;
}

export function callJourneys() {
  const journeys = ref<JourneysResponse | null>(null);

  async function setJourneys(payload: JourneysParameters) {
    if (typeof payload.datetime == "undefined") {
      payload.datetime = getTodayDateFormatted();
    }
    journeys.value = await navitia<JourneysResponse>("journeys", payload);
  }

  return { journeys, setJourneys };
}

export function callPlaces() {
  const places = ref<PlacesResponse | null>(null);

  async function setPlaces(payload: PlacesParameters) {
    places.value = await navitia<PlacesResponse>("places", payload);
  }

  return { places, setPlaces };
}
