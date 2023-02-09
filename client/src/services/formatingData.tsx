export function formatingData(data: string) {
  return data.slice(0, 10).replaceAll('-', '.').split('.').reverse().join('.');
}
