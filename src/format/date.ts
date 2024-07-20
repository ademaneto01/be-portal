export default class FormatDate {
  public static fromIso(date: string): string {
    return FormatDate.toString(new Date(date));
  }

  public static toString(date: Date): string {
    const day = FormatDate.pad(date.getDate());
    const month = FormatDate.pad(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private static pad(num: number): string {
    return num.toString().padStart(2, "0");
  }
}
