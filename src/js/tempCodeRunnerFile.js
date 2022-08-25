
    const AncientsData = [
      {
        id: 'azathoth',
        name: 'azathoth',
        firstStage: {
          greenCards: 1,
          blueCards: 1,
          brownCards: 2,
        },
        secondStage: {
          greenCards: 2,
          blueCards: 1,
          brownCards: 3,
        },
        thirdStage: {
          greenCards: 2,
          blueCards: 0,
          brownCards: 4,
        },
      },
      {
        id: 'cthulhu',
        name: 'cthulhu',
        firstStage: {
          greenCards: 0,
          blueCards: 2,
          brownCards: 2,
        },
        secondStage: {
          greenCards: 1,
          blueCards: 0,
          brownCards: 3,
        },
        thirdStage: {
          greenCards: 3,
          blueCards: 0,
          brownCards: 4,
        },
      }
    ]

    ancient = 'cthulhu'

    const getDataKey = (arr, val) => {
      let res
      arr.forEach((el, i) => {
        for (const key in el) {
          if (el[key] == val) res = el
        }
      })
      return res
    }

    console.log(getDataKey(AncientsData, ancient).firstStage.blueCards)