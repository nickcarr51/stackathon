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

export const truncateSixty = (name) => {
  if (name.length > 60) {
    return name.slice(0, 60) + '...'
  }
  return name;
}

export const truncateThirty = (name) => {
  if (name.length > 30) {
    return name.slice(0, 30) + '...'
  }
  return name;
}