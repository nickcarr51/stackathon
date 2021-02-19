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

export const tempoSorter = (allSimilar, allSimilarInfo, harmonicKeys, mainTrackInfo, tabNum) => {
  return allSimilar.filter(track => {
    const audioFeatures = allSimilarInfo.find(feat => feat.id === track.id);
    const key = harmonicKeys[tabNum];
    if (audioFeatures && key) {
      if (audioFeatures.key === key.pitchClass && audioFeatures.mode === key.mode) {
        return track;
      }
    }
    }).sort((a, b) => {
      const aInfo = allSimilarInfo.find(feat => feat.id === a.id)
      const bInfo = allSimilarInfo.find(feat => feat.id === b.id);
      const aDiff = Math.abs(aInfo.tempo - mainTrackInfo.tempo)
      const bDiff = Math.abs(bInfo.tempo - mainTrackInfo.tempo)
      return aDiff > bDiff ? 1 : -1;
    })
}

export const infoFilter = (allSimilarInfo, harmonicKeys, tabNum) => {
  return allSimilarInfo.filter(info => {
    const key = harmonicKeys[tabNum];
    if (info.key === key.pitchClass && info.mode === key.mode) {
      return info;
    }
  })
}