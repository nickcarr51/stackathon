export const truncateSong = (name) => {
  let str = ''
  for (let i = 0; i < name.length; i++) {
    if (name[i] === '(') {
      break;
    } else {
      str += name[i]
    }
  }
  return str;
}