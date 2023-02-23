module.exports = {
  businessName: 'Mr A Farmer',
  sbi: 123456789,
  frn: 1234567890,
  email: 'farmer@farms.com',
  address: {
    line1: 'A Farm',
    line2: '',
    line3: 'Near a field',
    line4: 'Newcastle Upon Tyne',
    line5: 'Tyne & Wear',
    postcode: 'NE1 1AA'
  },
  scheme: {
    name: 'Sustainable Farming Incentive',
    shortName: 'SFI',
    year: '2022',
    frequency: 'Quarterly',
    agreementNumber: 'SFI1234567'
  },
  payments: [{
    invoiceNumber: 'S0000001C000001V001',
    reference: 'PY1234567',
    dueDate: '1 July 2022',
    settled: '1 July 2022',
    calculated: '16 June 2022',
    value: '242.15',
    period: 'July to September 2022'
  }],
  funding: [{
    name: 'Arable and horticultural soils',
    level: 'Introductory',
    area: '5.00',
    rate: '22.00',
    annualValue: '110.00',
    quarterlyValue: '27.50',
    quarterlyReduction: '0.00',
    quarterlyPayment: '27.50',
    reductions: []
  }, {
    name: 'Arable and horticultural soils',
    level: 'Intermediate',
    area: '10.00',
    rate: '40.00',
    annualValue: '400.00',
    quarterlyValue: '100.00',
    quarterlyReduction: '75.00',
    quarterlyPayment: '25.00',
    reductions: [{
      reason: 'Late claim submission',
      value: '25.00'
    }, {
      reason: 'Over declaration reduction',
      value: '50.00'
    }]
  }, {
    name: 'Improved grassland soils',
    level: 'Introductory',
    area: '15.00',
    rate: '28.00',
    annualValue: '420.00',
    quarterlyValue: '105.00',
    quarterlyReduction: '50.00',
    quarterlyPayment: '45.00',
    reductions: [{
      reason: 'Over declaration reduction',
      value: '50.00'
    }]
  }, {
    name: 'Moorland',
    level: 'Introductory',
    area: '12.00',
    rate: '32.38',
    annualValue: '388.60',
    quarterlyValue: '97.15',
    quarterlyReduction: '0.00',
    quarterlyPayment: '97.15',
    reductions: []
  }, {
    name: 'Total',
    level: '',
    area: '42.00',
    rate: '',
    annualValue: '1318.60',
    quarterlyValue: '329.65',
    quarterlyReduction: '125.00',
    quarterlyPayment: '242.15'
  }]
}
