const getSBI = (sbi) => {
  return {
    columns: [
      { width: 23, text: 'SBI:' },
      { width: '*', text: sbi }
    ],
    style: 'column',
    columnGap: 2
  }
}

module.exports = getSBI
