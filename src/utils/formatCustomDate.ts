function toISOFormat(dateTimeString: string) {
  const [date, time] = dateTimeString.split(", ");
  const [DD, MM, YYYY] = date.split("/");
  const [HH, mm, ss] = time.split(":");
  return `${YYYY}-${MM}-${DD}T${HH}:${mm}:${ss}.040Z`;
}

export class FormatCustomDate {
  dateTimeLocal() {
    const date = new Date().toLocaleString("pt-BR", {
      timeZone: "America/Manaus",
    });
    
    return toISOFormat(date);
  }
}
