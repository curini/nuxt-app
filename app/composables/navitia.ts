export default async function (from: string, to: string) {
  const config = useRuntimeConfig();
  const params = new URLSearchParams();
  params.append("from", from);
  params.append("to", to);
  return await useFetch(
    `https://api.navitia.io/v1/coverage/sandbox/journeys${params}`,
    {
      headers: {
        Authorization: btoa(`${config.navitiaToken}:`),
      },
    },
  );
}
