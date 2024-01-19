function toISOFormat(dateTimeString: string) {
  const [date, time] = dateTimeString.split(", ");
  const [DD, MM, YYYY] = date.split("/");
  let [HH, mm, ss] = time.split(":");
  HH.length == 1 ? (HH = "0" + HH) : HH;
  mm.length == 1 ? (mm = "0" + mm) : mm;
  ss.length == 1 ? (ss = "0" + ss) : ss;
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
