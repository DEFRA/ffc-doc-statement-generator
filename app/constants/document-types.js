module.exports = {
  STATEMENT: {
    id: 'statement',
    type: 'uk.gov.doc.statement',
    name: 'Payment statement'
  },
  SCHEDULE: {
    id: 'schedule',
    type: 'uk.gov.doc.payment.schedule',
    name: 'Payment schedule'
  },
  SFI23QUARTERLYSTATEMENT: {
    id: 'sfi-23-quarterly-statement',
    type: 'uk.gov.doc.sfi-23-quarterly-statement',
    name: 'SFI 23 quarterly statement',
    showCalculation: false
  },
  SFI23ADVANCEDSTATEMENT: {
    id: 'sfi-23-advanced-statement',
    type: 'uk.gov.doc.sfi-23-advanced-statement',
    name: 'SFI 23 advanced statement',
    showCalculation: false
  },
  DELINKED: {
    id: 'delinked-statement',
    type: 'uk.gov.doc.delinked-statement',
    name: 'Delinked Statement',
    showCalculation: true
  }
}
