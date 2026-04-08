import { getTodayDateFormatted } from "@@/shared/helpers";

export async function navitia() {
  const params = new URLSearchParams();

  params.append("from", "admin:fr:75056");
  params.append("to", "admin:fr:69123");
  params.append("datetime", getTodayDateFormatted());

  const { data, error } = await useFetch(`/api/navitia?${params}`);

  if (error.value) {
    throw error.value;
  }

  return data.value;
}
