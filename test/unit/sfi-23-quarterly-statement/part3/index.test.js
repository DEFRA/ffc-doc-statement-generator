const getActionsTable = require('../../../../app/generator/content/sfi23-quarterly-statement/part3/get-actions-table')
const getTotalPaymentTable = require('../../../../app/generator/content/sfi23-quarterly-statement/part3/get-total-payment-table')
const part3 = require('../../../../app/generator/content/sfi23-quarterly-statement/part3')
const { SFI23QUARTERLYSTATEMENT } = require('../../../../app/constants/document-types')

jest.mock('../../../../app/generator/content/sfi23-quarterly-statement/part3/get-actions-table', () => jest.fn())
jest.mock('../../../../app/generator/content/sfi23-quarterly-statement/part3/get-total-payment-table', () => jest.fn())

describe('part3', () => {
  beforeEach(() => {
    getActionsTable.mockClear()
    getTotalPaymentTable.mockClear()
  })

  test('should correctly generate the part3 object when showCalculation is true', () => {
    SFI23QUARTERLYSTATEMENT.showCalculation = true
    const sfi23QuarterlyStatement = {
      actionGroups: [
        { groupName: 'Actions' },
        { groupName: 'Additional payment' },
        { groupName: 'Actions' }
      ],
      totalActionPayments: 1000,
      totalAdditionalPayments: 500,
      totalPayments: 1500
    }

    getActionsTable.mockReturnValueOnce('mockedActionsTable1')
    getActionsTable.mockReturnValueOnce('mockedActionsTable2')
    getTotalPaymentTable.mockReturnValue('mockedTotalPaymentTable')

    const result = part3(sfi23QuarterlyStatement)

    expect(getActionsTable).toHaveBeenCalledTimes(2)
    expect(getActionsTable).toHaveBeenNthCalledWith(1, [sfi23QuarterlyStatement.actionGroups[0], sfi23QuarterlyStatement.actionGroups[2]], 'Actions', true, sfi23QuarterlyStatement.totalActionPayments)
    expect(getActionsTable).toHaveBeenNthCalledWith(2, [sfi23QuarterlyStatement.actionGroups[1]], 'Additional payment', false, sfi23QuarterlyStatement.totalAdditionalPayments)
    expect(getTotalPaymentTable).toHaveBeenCalledWith(sfi23QuarterlyStatement.totalPayments)

    expect(result).toEqual({
      stack: [
        [{
          stack: [{ text: 'How your payment was calculated', style: 'header2' },
            { text: 'We calculated your total payment by adding together:' },
            {
              ul: [{
                text: [
                  'the quarterly payments for your actions '
                ]
              },
              {
                text: [
                  'any additional payments '
                ]
              }],
              listStyle: 'square',
              margin: [15, 2, 10, 20]
            },
            {
              text: [
                'You can check which of your land parcels are part of each action in your SFI 2023 agreement. Find your SFI 2023 agreement by logging into the Rural Payments service at ',
                { text: 'https://www.ruralpayments.service.gov.uk/customer-account/login', link: 'https://www.ruralpayments.service.gov.uk/customer-account/login', decoration: 'underline' }
              ]
            }],
          unbreakable: true
        }
        ],
        'mockedActionsTable1',
        'mockedActionsTable2',
        'mockedTotalPaymentTable'
      ]
    })
  })

  test('should not generate calculation tables when showCalculation is false', () => {
    SFI23QUARTERLYSTATEMENT.showCalculation = false
    const sfi23QuarterlyStatement = {
      actionGroups: [
        { groupName: 'Actions' },
        { groupName: 'Additional payment' },
        { groupName: 'Actions' }
      ],
      totalActionPayments: 1000,
      totalAdditionalPayments: 500,
      totalPayments: 1500
    }

    getActionsTable.mockReturnValueOnce('mockedActionsTable1')
    getActionsTable.mockReturnValueOnce('mockedActionsTable2')
    getTotalPaymentTable.mockReturnValue('mockedTotalPaymentTable')

    const result = part3(sfi23QuarterlyStatement)

    expect(getActionsTable).not.toHaveBeenCalled()
    expect(getTotalPaymentTable).not.toHaveBeenCalled()

    expect(result).toEqual({
      stack: [
        [{
          stack: [{ text: 'How your payment was calculated', style: 'header2' },
            { text: 'We calculated your total payment by adding together:' },
            {
              ul: [{
                text: [
                  'the quarterly payments for your actions '
                ]
              },
              {
                text: [
                  'any additional payments '
                ]
              }],
              listStyle: 'square',
              margin: [15, 2, 10, 20]
            },
            {
              text: [
                'You can check which of your land parcels are part of each action in your SFI 2023 agreement. Find your SFI 2023 agreement by logging into the Rural Payments service at ',
                { text: 'https://www.ruralpayments.service.gov.uk/customer-account/login', link: 'https://www.ruralpayments.service.gov.uk/customer-account/login', decoration: 'underline' }
              ]
            }],
          unbreakable: true
        }
        ]
      ]
    })
  })
})
