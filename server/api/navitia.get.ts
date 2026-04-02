import { JourneysResponse } from "@@/shared/types/journeys";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const params = new URLSearchParams(query as Record<string, string>);
  const config = useRuntimeConfig();
  const key = config.public.navitiaToken;
  const url = config.public.navitiaUrl;

  try {
    const request = await fetch(`${url}coverage/sncf/journeys?${params}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(`${key}:`).toString("base64")}`,
      },
    });

    const response = await request.json();

    return response;
  } catch (error) {
    throw createError({
      status: 500,
      statusMessage: "Service not available",
    });
  }
});
