const MESSAGE_SOURCE = require('../../../app/constants/message-source')
const { STATEMENT: STATEMENT_TYPE, SCHEDULE: SCHEDULE_TYPE, SFI23QUARTERLYSTATEMENT: SFI23QUARTERLYSTATEMENT_TYPE, DELINKED: DELINKED_TYPE } = require('../../../app/constants/document-types')

const { STATEMENT: STATEMENT_FILENAME, SCHEDULE: SCHEDULE_FILENAME, SFI23QUARTERLYSTATEMENT: SFI23QUARTERLYSTATEMENT_FILENAME, DELINKEDSTATEMENT: DELINKEDSTATEMENT_FILENAME } = require('../components/filename')

const STATEMENT = require('../mock-statement')
const SFI23QUARTERLYSTATEMENT = require('../mock-statement-sfi23-quarterly')
const DELINKEDSTATEMENT = require('../mock-delinked-statement')
const { topUpSchedule: SCHEDULE } = require('../mock-schedule')

const BASE_MESSAGE = {
  body: {},
  type: null,
  source: MESSAGE_SOURCE
}

const STATEMENT_MESSAGE = {
  ...BASE_MESSAGE,
  body: {
    businessName: STATEMENT.businessName,
    sbi: STATEMENT.sbi,
    frn: STATEMENT.frn,
    address: STATEMENT.address,
    email: STATEMENT.email,
    filename: STATEMENT_FILENAME,
    scheme: STATEMENT.scheme,
    documentReference: STATEMENT?.documentReference ?? null
  },
  type: `uk.gov.doc.${STATEMENT_TYPE.id}.publish`
}

const SFI23QUARTERLYSTATEMENT_MESSAGE = {
  ...BASE_MESSAGE,
  body: {
    businessName: SFI23QUARTERLYSTATEMENT.businessName,
    sbi: SFI23QUARTERLYSTATEMENT.sbi,
    frn: SFI23QUARTERLYSTATEMENT.frn,
    address: SFI23QUARTERLYSTATEMENT.address,
    email: SFI23QUARTERLYSTATEMENT.email,
    filename: SFI23QUARTERLYSTATEMENT_FILENAME,
    scheme: SFI23QUARTERLYSTATEMENT.scheme,
    documentReference: SFI23QUARTERLYSTATEMENT?.documentReference ?? null,
    paymentPeriod: SFI23QUARTERLYSTATEMENT?.paymentPeriod ?? ''
  },
  type: `uk.gov.doc.${SFI23QUARTERLYSTATEMENT_TYPE.id}.publish`
}

const DELINKEDSTATEMENT_MESSAGE = {
  ...BASE_MESSAGE,
  body: {
    businessName: DELINKEDSTATEMENT.businessName,
    sbi: DELINKEDSTATEMENT.sbi,
    frn: DELINKEDSTATEMENT.frn,
    address: DELINKEDSTATEMENT.address,
    email: DELINKEDSTATEMENT.email,
    filename: DELINKEDSTATEMENT_FILENAME,
    scheme: DELINKEDSTATEMENT.scheme,
    documentReference: DELINKEDSTATEMENT?.documentReference ?? null,
    paymentPeriod: DELINKEDSTATEMENT?.paymentPeriod ?? '',
    paymentBand1: DELINKEDSTATEMENT.paymentBand1,
    paymentBand2: DELINKEDSTATEMENT.paymentBand2,
    paymentBand3: DELINKEDSTATEMENT.paymentBand3,
    paymentBand4: DELINKEDSTATEMENT.paymentBand4,
    percentageReduction1: DELINKEDSTATEMENT.percentageReduction1,
    percentageReduction2: DELINKEDSTATEMENT.percentageReduction2,
    percentageReduction3: DELINKEDSTATEMENT.percentageReduction3,
    percentageReduction4: DELINKEDSTATEMENT.percentageReduction4,
    progressiveReductions1: DELINKEDSTATEMENT.progressiveReductions1,
    progressiveReductions2: DELINKEDSTATEMENT.progressiveReductions2,
    progressiveReductions3: DELINKEDSTATEMENT.progressiveReductions3,
    progressiveReductions4: DELINKEDSTATEMENT.progressiveReductions4,
    referenceAmount: DELINKEDSTATEMENT.referenceAmount,
    totalProgressiveReduction: DELINKEDSTATEMENT.totalProgressiveReduction,
    totalDelinkedPayment: DELINKEDSTATEMENT.totalDelinkedPayment,
    paymentAmountCalculated: DELINKEDSTATEMENT.paymentAmountCalculated
  },
  type: `uk.gov.doc.${DELINKED_TYPE.id}.publish`
}

const SCHEDULE_MESSAGE = {
  ...BASE_MESSAGE,
  body: {
    businessName: SCHEDULE.businessName,
    sbi: SCHEDULE.sbi,
    frn: SCHEDULE.frn,
    address: SCHEDULE.address,
    email: SCHEDULE.email,
    filename: SCHEDULE_FILENAME,
    scheme: SCHEDULE.scheme,
    documentReference: SCHEDULE?.documentReference ?? null
  },
  type: `uk.gov.doc.${SCHEDULE_TYPE.id}.publish`
}

module.exports = {
  STATEMENT_MESSAGE,
  SFI23QUARTERLYSTATEMENT_MESSAGE,
  DELINKEDSTATEMENT_MESSAGE,
  SCHEDULE_MESSAGE
}
