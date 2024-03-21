const part1 = (sfi23QuarterlyStatement) => {
  return {
    stack: [
      { text: `${sfi23QuarterlyStatement.scheme.name} (${sfi23QuarterlyStatement.scheme.shortName}) agreement: quarterly payment statement `, style: 'header3' },
      { text: 'This statement explains your quarterly payment for your SFI 2023 agreement.' }
    ],
    unbreakable: true
  }
}

module.exports = part1
