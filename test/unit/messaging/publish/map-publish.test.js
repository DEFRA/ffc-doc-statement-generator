const { SFI23QUARTERLYSTATEMENT: SFI23QUARTERLYSTATEMENT_TYPE, DELINKED: DELINKED_TYPE } = require('../../../../app/constants/document-types')
const { SFI23QUARTERLYSTATEMENT_MESSAGE, DELINKEDSTATEMENT_MESSAGE } = require('../../../mocks/messages/mock-process-message')
const { SFI23QUARTERLYSTATEMENT_MESSAGE: SFI23QUARTERLYSTATEMENT_MESSAGE_MAPPED, DELINKEDSTATEMENT_MESSAGE: DELINKEDSTATEMENT_MESSAGE_MAPPED } = require('../../../mocks/messages/publish')
const { SFI23QUARTERLYSTATEMENT: SFI23QUARTERLYSTATEMENT_FILENAME, DELINKED_STATEMENT: DELINKEDSTATEMENT_FILENAME } = require('../../../mocks/components/filename')

const mapPublish = require('../../../../app/messaging/publish/map-publish')

describe('mapPublish', () => {
  const testCases = [
    {
      desc: 'sfi23 valid document',
      type: SFI23QUARTERLYSTATEMENT_TYPE.id,
      document: SFI23QUARTERLYSTATEMENT_MESSAGE.body,
      mappedMessage: { ...SFI23QUARTERLYSTATEMENT_MESSAGE_MAPPED, body: { ...SFI23QUARTERLYSTATEMENT_MESSAGE_MAPPED.body, filename: SFI23QUARTERLYSTATEMENT_FILENAME } },
      filename: SFI23QUARTERLYSTATEMENT_FILENAME
    },
    {
      desc: 'sfi23 null documentReference',
      type: SFI23QUARTERLYSTATEMENT_TYPE.id,
      document: { ...SFI23QUARTERLYSTATEMENT_MESSAGE.body, documentReference: null },
      mappedMessage: { ...SFI23QUARTERLYSTATEMENT_MESSAGE_MAPPED, body: { ...SFI23QUARTERLYSTATEMENT_MESSAGE_MAPPED.body, documentReference: null, filename: SFI23QUARTERLYSTATEMENT_FILENAME } },
      filename: SFI23QUARTERLYSTATEMENT_FILENAME
    },
    {
      desc: 'delinked valid document',
      type: DELINKED_TYPE.id,
      document: DELINKEDSTATEMENT_MESSAGE.body,
      mappedMessage: { ...DELINKEDSTATEMENT_MESSAGE_MAPPED, body: { ...DELINKEDSTATEMENT_MESSAGE_MAPPED.body, filename: DELINKEDSTATEMENT_FILENAME } },
      filename: DELINKEDSTATEMENT_FILENAME
    },
    {
      desc: 'delinked null documentReference',
      type: DELINKED_TYPE.id,
      document: { ...DELINKEDSTATEMENT_MESSAGE.body, documentReference: null },
      mappedMessage: { ...DELINKEDSTATEMENT_MESSAGE_MAPPED, body: { ...DELINKEDSTATEMENT_MESSAGE_MAPPED.body, documentReference: null, filename: DELINKEDSTATEMENT_FILENAME } },
      filename: DELINKEDSTATEMENT_FILENAME
    }
  ]

  test.each(testCases)('$desc', ({ type, document, mappedMessage, filename }) => {
    // remove agreementNumber if present in mappedMessage.body
    const expected = { ...mappedMessage, body: { ...mappedMessage.body } }
    delete expected.body.agreementNumber

    const result = mapPublish(document, filename, type)
    expect(result).toEqual(expected)
    expect(Object.keys(result)).toHaveLength(3)
  })
})
