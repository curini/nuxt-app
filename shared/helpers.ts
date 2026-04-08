/**
 * example "20260409T100936"
 * @returns string
 */
export function getTodayDateFormatted(): string {
  const now = new Date();
  const year = now.getFullYear().toString();
  const day = setNumberTo2Digit(now.getUTCDate());
  const month = setNumberTo2Digit(now.getMonth() + 1);
  const hours = now.getUTCHours();
  const minutes = now.getUTCMinutes();
  const seconds = now.getUTCSeconds();

  return year + month + day + "T" + hours + minutes + seconds;
}

function setNumberTo2Digit(myNumber: number): string {
  if (myNumber > 9) {
    return myNumber.toString();
  }
  return "0" + myNumber;
}
