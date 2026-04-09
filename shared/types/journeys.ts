import type { FeedPublisher } from "./feed-publisher";

export type JourneysResponse = {
  feed_publisher: Array<FeedPublisher>;
  links: Array<Links>;
  journeys: Array<Journey>;
  tickets: Array<any>;
  disruptions: Array<any>;
  terminus: Array<Terminus>;
  context: {
    car_direct_path: {
      co2_emission: Co2Emission;
      air_pollutants: {
        unit: string;
        values: { nox: number; pm: number };
      };
    };
    current_datetime: UTCDateTime;
    timezone: string;
  };
  notes: Array<any>;
  exceptions: Array<any>;
};

type Links = {
  href: string;
  templated: boolean;
  rel: string;
  type: string;
};

/**
 * Exemple: 20260401T100936
 */
type UTCDateTime = string;

/**
 * Exemple: 20260401
 */
type DateWithoutTime = string;

type Journey = {
  duration: number;
  nb_transfers: number;
  departure_date_time: UTCDateTime;
  arrival_date_time: UTCDateTime;
  requested_date_time: UTCDateTime;
  type: string;
  status: string;
  tags: Array<string>;
  co2_emission: Co2Emission;
  air_pollutants: { unit: string; values: { nox: number; pm: number } };
  durations: {
    total: number;
    walking: number;
    bike: number;
    car: number;
    ridesharing: number;
    taxi: number;
  };
  distances: {
    walking: number;
    bike: number;
    car: number;
    ridesharing: number;
    taxi: number;
  };
  fare: { found: boolean; total: { value: string }; links: Array<any> };
  calendars: Array<{
    week_pattern: {
      monday: boolean;
      tuesday: boolean;
      wednesday: boolean;
      thursday: boolean;
      friday: boolean;
      saturday: boolean;
      sunday: boolean;
    };
    active_periods: Array<{ begin: DateWithoutTime; end: DateWithoutTime }>;
  }>;
  sections: Array<Sections>;
  links: Array<Links>;
};

type Co2Emission = {
  value: number;
  unit: string;
};

type Coord = {
  lon: string;
  lat: string;
};

type Sections = {
  id: string;
  duration: number;
  co2_emission: Co2Emission;
  departure_date_time: UTCDateTime;
  arrival_date_time: UTCDateTime;
  to: {
    id: string;
    name: string;
    quality: number;
    stop_point: {
      id: string;
      name: string;
      label: string;
      coord: Coord;
      links: Array<any>;
      administrative_regions: [
        {
          id: string;
          name: string;
          level: number;
          zip_code: string;
          label: string;
          insee: string;
          coord: Coord;
        },
      ];
      stop_area: {
        id: string;
        name: string;
        codes: Array<Codes>;
        timezone: string;
        label: string;
        coord: Coord;
        links: Array<any>;
      };
      equipments: Array<any>;
    };
    embedded_type: string;
  };
  from: {
    id: string;
    name: string;
    quality: number;
    administrative_region: {
      id: string;
      name: string;
      level: number;
      zip_code: string;
      label: string;
      insee: string;
      coord: Coord;
    };
    embedded_type: string;
  };
  geojson: {
    type: string;
    coordinates: [number, number];
    properties: Array<{ length: number }>;
  };
  mode: string;
  type: string;
  links: Array<any>;
};

type Codes = {
  type: string;
  value: string;
};

type Terminus = {
  /** stop_area:SNCF:87686006 */
  id: string;
  /** Paris - Gare de Lyon - Hall 1 & 2 */
  name: string;
  codes: Array<Codes>;
  /** Europe\/Paris */
  timezone: string;
  /** Paris - Gare de Lyon - Hall 1 & 2 (Paris) */
  label: string;
  coord: Coord;
  links: Array<any>;
};
