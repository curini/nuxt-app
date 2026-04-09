import { getTodayDateFormatted } from "@@/shared/helpers";

type URL = "journeys" | "places";
type JourneysParameters = { from: string; to: string; datetime?: string };
type PlacesParameters = { q: string };

async function navitia(
  url: URL,
  parameters: PlacesParameters | JourneysParameters,
) {
  const { data, error } = await useFetch(
    `/api/${url}?${new URLSearchParams(parameters)}`,
  );
  if (error.value) {
    throw error.value;
  }
  return data.value;
}

function defaultJourneysParameters() {
  const params = new URLSearchParams();
  params.append("from", "admin:fr:75056");
  params.append("to", "admin:fr:69123");
  params.append("datetime", getTodayDateFormatted());
  return params;
}

export function callJourneys() {
  const journeys = ref(null);

  async function setJourneys(payload: JourneysParameters) {
    if (typeof payload.datetime == "undefined") {
      payload.datetime = getTodayDateFormatted();
    }
    journeys.value = await navitia("journeys", payload);
  }

  return { journeys, setJourneys };
}

export function callPlaces() {
  const places = ref(null);

  async function setPlaces(payload: PlacesParameters) {
    places.value = await navitia("places", payload);
  }

  return { places, setPlaces };
}
