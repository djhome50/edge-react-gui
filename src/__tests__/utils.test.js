// @flow
/* globals describe test expect */
import { bns } from 'biggystring'

import { sanitizeDecimalAmount } from '../modules/UI/components/FlipInput/FlipInput2.ui.js'
import {
  autoCorrectDate,
  convertDisplayToNative,
  convertNativeToDenomination,
  convertNativeToDisplay,
  convertNativeToExchange,
  daysBetween,
  getNewArrayWithItem,
  getNewArrayWithoutItem,
  getObjectDiff,
  getSupportedFiats,
  isCompleteExchangeData,
  isTooFarAhead,
  isTooFarBehind,
  isValidInput,
  maxPrimaryCurrencyConversionDecimals,
  mergeTokens,
  MILLISECONDS_PER_DAY,
  precisionAdjust,
  truncateDecimals
} from '../util/utils.js'

describe('isValidInput', function () {
  describe('when input is valid', function () {
    test('1 => true', function () {
      const validInput = '1'
      const expected = true
      const actual = isValidInput(validInput)
      expect(actual).toBe(expected)
    })

    test('. => true', function () {
      const validInput = '.'
      const expected = true
      const actual = isValidInput(validInput)
      expect(actual).toBe(expected)
    })

    test('.0 => true', function () {
      const validInput = '.'
      const expected = true
      const actual = isValidInput(validInput)
      expect(actual).toBe(expected)
    })

    test('0.0 => true', function () {
      const validInput = '.'
      const expected = true
      const actual = isValidInput(validInput)
      expect(actual).toBe(expected)
    })

    test('0.01 => true', function () {
      const validInput = '.'
      const expected = true
      const actual = isValidInput(validInput)
      expect(actual).toBe(expected)
    })

    test('0 => true', function () {
      const validInput = '.'
      const expected = true
      const actual = isValidInput(validInput)
      expect(actual).toBe(expected)
    })
  })

  describe('when input is invalid', function () {
    test('R => false', function () {
      const invalidInput = 'R'
      const expected = false
      const actual = isValidInput(invalidInput)
      expect(actual).toBe(expected)
    })

    test('0R => false', function () {
      const invalidInput = '0R'
      const expected = false
      const actual = isValidInput(invalidInput)
      expect(actual).toBe(expected)
    })

    test('0.R => false', function () {
      const invalidInput = '0.R'
      const expected = false
      const actual = isValidInput(invalidInput)
      expect(actual).toBe(expected)
    })

    test('0.0. => false', function () {
      const invalidInput = '0.0.'
      const expected = false
      const actual = isValidInput(invalidInput)
      expect(actual).toBe(expected)
    })

    test('0.123q => false', function () {
      const invalidInput = '0.123q'
      const expected = false
      const actual = isValidInput(invalidInput)
      expect(actual).toBe(expected)
    })
  })
})

describe('convertNativeToDenomination', function () {
  test('100000000 => 1', function () {
    const nativeToDisplayRatio = '100000000'
    const nativeAmount = '100000000'
    const expected = '1'
    const actual = convertNativeToDenomination(nativeToDisplayRatio)(nativeAmount)
    expect(actual).toBe(expected)
  })
})

describe('convertNativeToDisplay', function () {
  test('100000000 => 1', function () {
    const nativeToDisplayRatio = '100000000'
    const nativeAmount = '100000000'
    const expected = '1'
    const actual = convertNativeToDisplay(nativeToDisplayRatio)(nativeAmount)
    expect(actual).toBe(expected)
  })
})

describe('convertNativeToExchange', function () {
  test('100000000 => 1', function () {
    const nativeToDisplayRatio = '100000000'
    const nativeAmount = '100000000'
    const expected = '1'
    const actual = convertNativeToExchange(nativeToDisplayRatio)(nativeAmount)
    expect(actual).toBe(expected)
  })
})

describe('convertDisplayToNative', function () {
  test('100000000 => 1', function () {
    const nativeToDisplayRatio = '100000000'
    const displayAmount = '1'
    const expected = '100000000'
    const actual = convertDisplayToNative(nativeToDisplayRatio)(displayAmount)
    expect(actual).toBe(expected)
  })
})

describe('truncateDecimals', function () {
  test('1 => 1', function () {
    const input = '1'
    const precision = 0
    const expected = '1'
    const actual = truncateDecimals(input, precision)
    expect(actual).toBe(expected)
  })

  test('1 => 1', function () {
    const input = '1'
    const precision = 8
    const expected = '1'
    const actual = truncateDecimals(input, precision)
    expect(actual).toBe(expected)
  })

  test('1.0 => 1', function () {
    const input = '1.0'
    const precision = 1
    const expected = '1.0'
    const actual = truncateDecimals(input, precision)
    expect(actual).toBe(expected)
  })

  test('1.123456789 => 1.0', function () {
    const input = '1.123456789'
    const precision = 1
    const expected = '1.1'
    const actual = truncateDecimals(input, precision)
    expect(actual).toBe(expected)
  })

  test('1.19 => 1.0', function () {
    const input = '1.19'
    const precision = 1
    const expected = '1.1'
    const actual = truncateDecimals(input, precision)
    expect(actual).toBe(expected)
  })

  test('1.123456789 to 0 => 1', function () {
    const input = '1.123456789'
    const precision = 0
    const expected = '1'
    const actual = truncateDecimals(input, precision)
    expect(actual).toBe(expected)
  })
})

describe('getNewArrayWithItem', function () {
  describe('returns new array', function () {
    test('input !== output', function () {
      const array = [1, 2, 3]
      const input = 4
      const expected = array
      const actual = getNewArrayWithItem(array, input)
      expect(actual).not.toBe(expected)
    })
  })

  describe('when array includes item', function () {
    test('[1, 2, 3] => [1, 2, 3]', function () {
      const array = [1, 2, 3]
      const input = 1
      const expected = [1, 2, 3]
      const actual = getNewArrayWithItem(array, input)
      expect(actual).toEqual(expected)
    })
  })

  describe('when array does not include item', function () {
    test('[1, 2, 3] => [1, 2, 3, 4]', function () {
      const array = [1, 2, 3]
      const input = 4
      const expected = [1, 2, 3, 4]
      const actual = getNewArrayWithItem(array, input)
      expect(actual).toEqual(expected)
    })
  })
})

describe('getNewArrayWithoutItem', function () {
  describe('returns new array', function () {
    test('input !== output', function () {
      const array = [1, 2, 3]
      const input = 1
      const expected = array
      const actual = getNewArrayWithoutItem(array, input)
      expect(actual).not.toBe(expected)
    })
  })

  describe('when array includes item', function () {
    test('[1, 2, 3] => [1, 2, 3]', function () {
      const array = [1, 2, 3]
      const input = 1
      const expected = [2, 3]
      const actual = getNewArrayWithoutItem(array, input)
      expect(actual).toEqual(expected)
    })
  })

  describe('when array does not include item', function () {
    test('[1, 2, 3] => [1, 2, 3, 4]', function () {
      const array = [1, 2, 3]
      const input = 4
      const expected = [1, 2, 3]
      const actual = getNewArrayWithoutItem(array, input)
      expect(actual).toEqual(expected)
    })
  })
})

describe('getSupportedFiats', function () {
  test('resolves to array of object {value, label}', function () {
    const supportedFiats = getSupportedFiats()
    supportedFiats.forEach(fiat => {
      expect(fiat).toEqual(expect.objectContaining({ label: expect.any(String), value: expect.any(String) }))
    })
  })
})

describe('isCompleteExchangeData', function () {
  describe('primaryDisplayAmount: undefined', function () {
    test('incomplete => false', function () {
      const incompleteExchangeData = {
        primaryDisplayAmount: undefined,
        primaryDisplayName: 'BTC',
        secondaryDisplaySymbol: '$',
        secondaryDisplayAmount: '4000',
        secondaryCurrencyCode: 'USD'
      }
      const expected = false
      // $FlowExpectedError
      const actual = isCompleteExchangeData(incompleteExchangeData)
      expect(actual).toBe(expected)
    })
  })

  describe('primaryDisplayName: undefined', function () {
    test('incomplete => false', function () {
      const incompleteExchangeData = {
        primaryDisplayAmount: '1',
        primaryDisplayName: undefined,
        secondaryDisplaySymbol: '$',
        secondaryDisplayAmount: '4000',
        secondaryCurrencyCode: 'USD'
      }
      const expected = false
      // $FlowExpectedError
      const actual = isCompleteExchangeData(incompleteExchangeData)
      expect(actual).toBe(expected)
    })
  })

  describe('secondaryDisplaySymbol: undefined', function () {
    test('incomplete => false', function () {
      const incompleteExchangeData = {
        primaryDisplayAmount: '1',
        primaryDisplayName: 'BTC',
        secondaryDisplaySymbol: undefined,
        secondaryDisplayAmount: '4000',
        secondaryCurrencyCode: 'USD'
      }
      const expected = false
      // $FlowExpectedError
      const actual = isCompleteExchangeData(incompleteExchangeData)
      expect(actual).toBe(expected)
    })
  })

  describe('secondaryDisplayAmount: undefined', function () {
    test('incomplete => false', function () {
      const incompleteExchangeData = {
        primaryDisplayAmount: '1',
        primaryDisplayName: 'BTC',
        secondaryDisplaySymbol: '$',
        secondaryDisplayAmount: undefined,
        secondaryCurrencyCode: 'USD'
      }
      const expected = false
      // $FlowExpectedError
      const actual = isCompleteExchangeData(incompleteExchangeData)
      expect(actual).toBe(expected)
    })
  })

  describe('secondaryCurrencyCode: undefined', function () {
    test('incomplete => false', function () {
      const incompleteExchangeData = {
        primaryDisplayAmount: '1',
        primaryDisplayName: 'BTC',
        secondaryDisplaySymbol: '$',
        secondaryDisplayAmount: '4000',
        secondaryCurrencyCode: undefined
      }
      const expected = false
      // $FlowExpectedError
      const actual = isCompleteExchangeData(incompleteExchangeData)
      expect(actual).toBe(expected)
    })
  })

  test('complete => true', function () {
    const completeExchangeData = {
      primaryDisplayAmount: '1',
      primaryDisplayName: 'BTC',
      secondaryDisplaySymbol: '$',
      secondaryDisplayAmount: '4000',
      secondaryCurrencyCode: 'USD'
    }
    const expected = true
    const actual = isCompleteExchangeData(completeExchangeData)
    expect(actual).toBe(expected)
  })
})

describe('mergeTokens', function () {
  test('Preferred tokens take precendence', function () {
    const preferredTokenA = { currencyCode: 'TA', currencyName: 'TA', preferred: true }
    const preferredTokenB = { currencyCode: 'TB', currencyName: 'TB', preferred: true }

    const tokenA = { currencyCode: 'TA', currencyName: 'TA' }
    const tokenD = { currencyCode: 'TD', currencyName: 'TD' }

    const preferredEdgeMetaTokens = [preferredTokenA, preferredTokenB]
    const edgeMetaTokens = [tokenA, tokenD]

    const expected = [
      preferredTokenA, // from preferredEdgeTokens
      preferredTokenB, // from preferredEdgeTokens
      tokenD
    ]
    // $FlowExpectedError
    const actual = mergeTokens(preferredEdgeMetaTokens, edgeMetaTokens)
    expect(actual).toEqual(expected)
  })

  test('Empty preferredTokens', function () {
    const tokenA = { currencyCode: 'TA', currencyName: 'TA' }
    const tokenD = { currencyCode: 'TD', currencyName: 'TD' }

    const preferredEdgeMetaTokens = []
    const edgeMetaTokens = [tokenA, tokenD]

    const expected = [tokenA, tokenD]
    // $FlowExpectedError
    const actual = mergeTokens(preferredEdgeMetaTokens, edgeMetaTokens)
    expect(actual).toEqual(expected)
  })

  test('Empty tokens', function () {
    const preferredTokenA = { currencyCode: 'TA', currencyName: 'TA', preferred: true }
    const preferredTokenB = { currencyCode: 'TB', currencyName: 'TB', preferred: true }

    const preferredEdgeMetaTokens = [preferredTokenA, preferredTokenB]
    const edgeMetaTokens = []

    const expected = [preferredTokenA, preferredTokenB]
    // $FlowExpectedError
    const actual = mergeTokens(preferredEdgeMetaTokens, edgeMetaTokens)
    expect(actual).toEqual(expected)
  })
})

describe('daysBetween', () => {
  test('1 day', () => {
    const start = 0
    const end = 1
    const days = end - start
    const a = new Date(MILLISECONDS_PER_DAY * start)
    const b = new Date(MILLISECONDS_PER_DAY * end)
    expect(daysBetween(a, b)).toEqual(days)
  })

  test('5 days', () => {
    const start = 0
    const end = 5
    const days = end - start
    const a = MILLISECONDS_PER_DAY * start
    const b = MILLISECONDS_PER_DAY * end
    expect(daysBetween(a, b)).toEqual(days)
  })

  test('15.75 days', () => {
    const start = 10
    const end = 25.75
    const days = end - start
    const a = MILLISECONDS_PER_DAY * start
    const b = MILLISECONDS_PER_DAY * end
    expect(daysBetween(a, b)).toEqual(days)
  })
})

describe('getObjectDiff', () => {
  test('simple equal', () => {
    const obj1 = {
      a: '1',
      b: '2'
    }
    const obj2 = {
      a: '1',
      b: '2'
    }
    expect(getObjectDiff(obj1, obj2)).toEqual('')
  })

  test('simple unequal', () => {
    const obj1 = {
      a: '1',
      b: '3'
    }
    const obj2 = {
      a: '1',
      b: '2'
    }
    expect(getObjectDiff(obj1, obj2)).toEqual('b')
  })

  test('nested unequal no traverse', () => {
    const obj1 = {
      a: '1',
      b: {
        c: 1
      }
    }
    const obj2 = {
      a: '1',
      b: {
        c: 1
      }
    }
    expect(getObjectDiff(obj1, obj2)).toEqual('b')
  })

  test('nested unequal w/traverse', () => {
    const obj1 = {
      a: '1',
      b: {
        c: 1
      }
    }
    const obj2 = {
      a: '1',
      b: {
        c: 2
      }
    }
    expect(getObjectDiff(obj1, obj2, { b: true })).toEqual('b')
  })

  test('nested equal w/traverse', () => {
    const obj1 = {
      a: '1',
      b: {
        c: 2
      }
    }
    const obj2 = {
      a: '1',
      b: {
        c: 2
      }
    }
    expect(getObjectDiff(obj1, obj2, { b: true })).toEqual('')
  })

  test('missing element obj2', () => {
    const obj1 = {
      a: '1',
      b: {
        c: 2
      },
      d: false
    }
    const obj2 = {
      a: '1',
      b: {
        c: 2
      }
    }
    expect(getObjectDiff(obj1, obj2, { b: true })).toEqual('d')
  })

  test('missing element obj1', () => {
    const obj1 = {
      a: '1',
      b: {
        c: 2
      }
    }
    const obj2 = {
      a: '1',
      b: {
        c: 2
      },
      d: false
    }
    expect(getObjectDiff(obj1, obj2, { b: true })).toEqual('d')
  })

  test('missing nested element obj2', () => {
    const obj1 = {
      a: '1',
      b: {
        c: 2,
        d: 3
      }
    }
    const obj2 = {
      a: '1',
      b: {
        c: 2
      }
    }
    expect(getObjectDiff(obj1, obj2, { b: true })).toEqual('b')
  })

  test('missing nested element obj1', () => {
    const obj1 = {
      a: '1',
      b: {
        c: 2
      }
    }
    const obj2 = {
      a: '1',
      b: {
        c: 2,
        d: true
      }
    }
    expect(getObjectDiff(obj1, obj2, { b: true })).toEqual('b')
  })
})

describe('isTooFarAhead', () => {
  const currentDateInSeconds = 1535739631.095 // 2018-08-31T18:20:31.095Z
  const invalidFutureDateInSeconds = 1535739631.095 * 1000 // +050635-08-27T05:58:15.000Z
  const validFutureDateInSeconds = 1535739631.095 + 1000 // 2018-08-31T18:20:32.095Z

  test('if given invalid future date', () => {
    expect(isTooFarAhead(invalidFutureDateInSeconds, currentDateInSeconds)).toBe(true)
  })

  test('if given valid future date', () => {
    expect(isTooFarAhead(validFutureDateInSeconds, currentDateInSeconds)).toBe(false)
  })
})

describe('isTooFarBehind', () => {
  const invalidPastDateInSeconds = 1535739631.095 / 1000 // 1970-01-18T18:35:39.631Z
  const validPastDateInSeconds = 1535739631.095 - 1000 // 2018-08-31T18:20:30.095Z

  test('if given invalid past date', () => {
    expect(isTooFarBehind(invalidPastDateInSeconds)).toBe(true)
  })

  test('if given valid past date', () => {
    expect(isTooFarBehind(validPastDateInSeconds)).toBe(false)
  })
})

describe('autoCorrectDate', () => {
  const currentDateInSeconds = 1535739631.095 // 2018-08-31T18:20:31.095Z

  const invalidFutureDateInSeconds = 1535739631.095 * 1000 // +050635-08-27T05:58:15.000Z
  const validFutureDateInSeconds = 1535739631.095 + 1000 // 2018-08-31T18:20:32.095Z

  const invalidPastDateInSeconds = 1535739631.095 / 1000 // 1970-01-18T18:35:39.631Z
  const validPastDateInSeconds = 1535739631.095 - 1000 // 2018-08-31T18:20:30.095Z

  test('if given invalid future date', () => {
    expect(autoCorrectDate(invalidFutureDateInSeconds, currentDateInSeconds)).toEqual(currentDateInSeconds)
  })

  test('if given valid future date', () => {
    expect(autoCorrectDate(validFutureDateInSeconds, currentDateInSeconds)).toEqual(validFutureDateInSeconds)
  })

  test('if given invalid past date', () => {
    expect(autoCorrectDate(invalidPastDateInSeconds, currentDateInSeconds)).toEqual(currentDateInSeconds)
  })

  test('if given valid past date', () => {
    expect(autoCorrectDate(validPastDateInSeconds, currentDateInSeconds)).toEqual(validPastDateInSeconds)
  })
})

describe('Sanitize Decimal Amount', function () {
  const maxEntryDecimals = 2
  test('Replace all commas into periods', function () {
    const input = ','
    const expected = '.'
    expect(sanitizeDecimalAmount(input, maxEntryDecimals)).toBe(expected)
  })
  test('Remove characters except numbers and decimal separator', function () {
    const input = 'qwertyuiopasdfghjklzxcvbnm1234567890,.'
    const expected = '1234567890.'
    expect(sanitizeDecimalAmount(input, maxEntryDecimals)).toBe(expected)
  })

  test('Trunctuate Decimals', function () {
    const input = '.13213'
    const expected = '.13'
    expect(sanitizeDecimalAmount(input, maxEntryDecimals)).toBe(expected)
  })

  test('Remove additional decimal separator', function () {
    const input = '123.456.789'
    const expected = '123.45'
    expect(sanitizeDecimalAmount(input, maxEntryDecimals)).toBe(expected)
  })
})

describe('Precision Adjustment Value and max primary currency conversion decimals', function () {
  test('BTC for precision adjustment and max conversion decimal', function () {
    const btcDisplayDenominationMultiplier = '100000000'
    const btcCurrencyInfo = {
      primaryExchangeMultiplier: '100000000',
      secondaryExchangeMultiplier: '100',
      exchangeSecondaryToPrimaryRatio: 32533.217120011082
    }
    const precisionAdjustmentValue = precisionAdjust(btcCurrencyInfo)
    expect(precisionAdjustmentValue).toBe(0)
    expect(maxPrimaryCurrencyConversionDecimals(bns.log10(btcDisplayDenominationMultiplier), precisionAdjustmentValue)).toBe(8)
  })

  test('ETH precision adjustment value', function () {
    const ethDisplayDenominationMultiplier = '1000000000000000000'
    const ethCurrencyInfo = {
      primaryExchangeMultiplier: '1000000000000000000',
      secondaryExchangeMultiplier: '100',
      exchangeSecondaryToPrimaryRatio: 1359.8708229894155
    }
    const precisionAdjustmentValue = precisionAdjust(ethCurrencyInfo)
    expect(precisionAdjustmentValue).toBe(11)
    expect(maxPrimaryCurrencyConversionDecimals(bns.log10(ethDisplayDenominationMultiplier), precisionAdjustmentValue)).toBe(7)
  })
})
