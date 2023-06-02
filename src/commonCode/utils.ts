export const dateToParams = (date: string) => { //fast workaround. change to dayjs
  //return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  return date.split('T')[0];
}