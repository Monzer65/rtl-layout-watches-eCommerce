export function formatIranianDateTime(date: Date): string {
  // Persian numbers map
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  // Convert a number to Persian numerals
  function toPersianNumber(num: number): string {
    return num
      .toString()
      .split("")
      .map((digit) => persianNumbers[parseInt(digit, 10)])
      .join("");
  }

  // Get the weekday in Persian
  const weekdayOptions: Intl.DateTimeFormatOptions = { weekday: "long" };
  const dayOfWeek = date.toLocaleDateString("fa-IR", weekdayOptions);

  // Get the date in Persian calendar
  const dateOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const persianDate = date.toLocaleDateString("fa-IR", dateOptions);

  // Format the time
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const suffix = hours >= 12 ? "عصر" : "صبح";
  hours = hours % 12 || 12; // Convert to 12-hour format

  // Convert hours and minutes to Persian numerals
  const formattedHours = toPersianNumber(hours);
  const formattedMinutes = toPersianNumber(minutes).padStart(
    2,
    persianNumbers[0]
  );

  return `${dayOfWeek} ${persianDate} ساعت ${formattedHours}:${formattedMinutes} ${suffix}`;
}
