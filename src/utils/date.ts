import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function getTokenExpireDate(expireMinutes: number = 10) {
  return dayjs().utc(true).add(expireMinutes, "minute").format();
}

export function getUTCnow() {
  return dayjs().utc(true).format();
}
