import type { FeedPublisher } from "./feed-publisher";

export type PlacesResponse = {
  feed_publisher: Array<FeedPublisher>;
  disruptions: Array<any>;
  places: Array<Places>;
  context: any;
  links: any;
};

type Places = {
  id: string;
  name: string;
  quality: number;
  administrative_region: any;
  embedded_type: string;
};
