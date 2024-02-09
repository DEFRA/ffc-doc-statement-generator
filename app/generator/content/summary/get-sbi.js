const getSBI = (sbi) => {
  return {
    columns: [
      { width: 200, text: 'Single Business Identifier (SBI):' },
      { width: '*', text: sbi }
    ],
    style: 'column',
    columnGap: 10
  }
}

module.exports = getSBI
