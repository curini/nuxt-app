/**
 * getTodayDateFormatted
 * example "20260409T100936"
 * @returns string
 */
export function getTodayDateFormatted(): string {
  const now = new Date();
  const year = now.getFullYear().toString();
  const day = setNumberTo2Digit(now.getUTCDate());
  const month = setNumberTo2Digit(now.getMonth() + 1);
  const hours = setNumberTo2Digit(now.getUTCHours());
  const minutes = setNumberTo2Digit(now.getUTCMinutes());
  const seconds = setNumberTo2Digit(now.getUTCSeconds());

  return year + month + day + "T" + hours + minutes + seconds;
}

/**
 * getDateTime
 * @param datetimeFormatted  example "20260409T100936"
 * @returns string 09/04/2026 10:09:36
 */
export function getDateTime(datetimeFormatted: string): string {
  const datetime = datetimeFormatted.split("T");
  const time = getTime(datetime[1] ?? "");
  const date = getDate(datetime[0] ?? "");
  return date + " " + time;
}

/**
 * getDate
 * @param dateFormatted example "20260409T100936" or "20260409"
 * @returns string 09/04/2026
 */
export function getDate(dateFormatted: string): string {
  dateFormatted = splitDateTimeFormated(dateFormatted, 0);
  const sizeDateFormatted = dateFormatted.length;
  const day = dateFormatted.slice(sizeDateFormatted - 2, sizeDateFormatted);
  const month = dateFormatted.slice(
    sizeDateFormatted - 4,
    sizeDateFormatted - 2,
  );
  const year = dateFormatted.slice(0, sizeDateFormatted - 4);

  return day + "/" + month + "/" + year;
}

/**
 * getTime
 * @param timeFormatted example "20260409T100936" or "100936"
 * @returns string 10:09:36
 */
export function getTime(timeFormatted: string): string {
  timeFormatted = splitDateTimeFormated(timeFormatted, 1);
  const hours = timeFormatted.slice(0, 2);
  const minutes = timeFormatted.slice(2, 4);
  const seconds = timeFormatted.slice(4, 6);

  return hours + ":" + minutes + ":" + seconds;
}

function splitDateTimeFormated(
  datetimeFormatted: string,
  index: number,
): string {
  if (datetimeFormatted.indexOf("T") > -1) {
    datetimeFormatted = datetimeFormatted.split("T")[index] ?? "";
  }
  return datetimeFormatted;
}

/**
 * getCssClassBackground
 * @param type "best" |
 * "rapid" |
 * "comfort" |
 * "car" |
 * "less_fallback_walk" |
 * "less_fallback_bike" |
 * "less_fallback_bss" |
 * "fastest" |
 * "ecologic" |
 * "reliable" |
 * "bike_in_pt" |
 * "non_pt_walk" |
 * "non_pt_bike" |
 * "non_pt_bss"
 * @returns string css class
 */
export function getCssClassBackground(type: string): string {
  if (type == "best") {
    return "bg-green txt-white";
  }
  return "bg-grey txt-black";
}

export function getTransportModeIcon() {
  return "";
}

function setNumberTo2Digit(myNumber: number): string {
  if (myNumber > 9) {
    return myNumber.toString();
  }
  return "0" + myNumber;
}
