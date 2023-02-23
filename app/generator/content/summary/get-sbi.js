const getSBI = (sbi) => {
  return {
    columns: [
      { width: 200, text: 'Single business identifier (SBI):' },
      { width: '*', text: sbi }
    ],
    style: 'column',
    columnGap: 10
  }
}

module.exports = getSBI
