import { describe, expect, it, xit } from '@jest/globals'
import { Category, score } from './yacht.ts'

describe('Yacht', () => {
  it('Yacht', () => {
    expect(score([5, 5, 5, 5, 5], Category.YACHT)).toEqual(50)
  })

  it('Not Yacht', () => {
    expect(score([1, 3, 3, 2, 5], Category.YACHT)).toEqual(0)
  })

  it('Ones', () => {
    expect(score([1, 1, 1, 3, 5], Category.ONES)).toEqual(3)
  })

  it('Ones, out of order', () => {
    expect(score([3, 1, 1, 5, 1], Category.ONES)).toEqual(3)
  })

  it('No ones', () => {
    expect(score([4, 3, 6, 5, 5], Category.ONES)).toEqual(0)
  })

  it('Twos', () => {
    expect(score([2, 3, 4, 5, 6], Category.TWOS)).toEqual(2)
  })

  it('Fours', () => {
    expect(score([1, 4, 1, 4, 1], Category.FOURS)).toEqual(8)
  })

  it('Yacht counted as threes', () => {
    expect(score([3, 3, 3, 3, 3], Category.THREES)).toEqual(15)
  })

  it('Yacht of 3s counted as fives', () => {
    expect(score([3, 3, 3, 3, 3], Category.FIVES)).toEqual(0)
  })

  it('Fives', () => {
    expect(score([1, 5, 3, 5, 3], Category.FIVES)).toEqual(10)
  })

  it('Sixes', () => {
    expect(score([2, 3, 4, 5, 6], Category.SIXES)).toEqual(6)
  })

  it('Full house two small, three big', () => {
    expect(score([2, 2, 4, 4, 4], Category.FULL_HOUSE)).toEqual(16)
  })

  it('Full house three small, two big', () => {
    expect(score([5, 3, 3, 5, 3], Category.FULL_HOUSE)).toEqual(19)
  })

  it('Two pair is not a full house', () => {
    expect(score([2, 2, 4, 4, 5], Category.FULL_HOUSE)).toEqual(0)
  })

  it('Four of a kind is not a full house', () => {
    expect(score([1, 4, 4, 4, 4], Category.FULL_HOUSE)).toEqual(0)
  })

  it('Yacht is not a full house', () => {
    expect(score([2, 2, 2, 2, 2], Category.FULL_HOUSE)).toEqual(0)
  })

  it('Four of a Kind', () => {
    expect(score([6, 6, 4, 6, 6], Category.FOUR_OF_A_KIND)).toEqual(24)
  })

  it('Yacht can be scored as Four of a Kind', () => {
    expect(score([3, 3, 3, 3, 3], Category.FOUR_OF_A_KIND)).toEqual(12)
  })

  it('Full house is not Four of a Kind', () => {
    expect(score([3, 3, 3, 5, 5], Category.FOUR_OF_A_KIND)).toEqual(0)
  })

  it('Little Straight', () => {
    expect(score([3, 5, 4, 1, 2], Category.LITTLE_STRAIGHT)).toEqual(30)
  })

  it('Little Straight as Big Straight', () => {
    expect(score([1, 2, 3, 4, 5], Category.BIG_STRAIGHT)).toEqual(0)
  })

  it('Four in order but not a little straight', () => {
    expect(score([1, 1, 2, 3, 4], Category.LITTLE_STRAIGHT)).toEqual(0)
  })

  it('No pairs but not a little straight', () => {
    expect(score([1, 2, 3, 4, 6], Category.LITTLE_STRAIGHT)).toEqual(0)
  })

  it('Minimum is 1, maximum is 5, but not a little straight', () => {
    expect(score([1, 1, 3, 4, 5], Category.LITTLE_STRAIGHT)).toEqual(0)
  })

  it('Big Straight', () => {
    expect(score([4, 6, 2, 5, 3], Category.BIG_STRAIGHT)).toEqual(30)
  })

  it('Big Straight as little straight', () => {
    expect(score([6, 5, 4, 3, 2], Category.LITTLE_STRAIGHT)).toEqual(0)
  })

  it('No pairs but not a big straight', () => {
    expect(score([6, 5, 4, 3, 1], Category.BIG_STRAIGHT)).toEqual(0)
  })

  it('Choice', () => {
    expect(score([3, 3, 5, 6, 6], Category.CHOICE)).toEqual(23)
  })

  it('Yacht as choice', () => {
    expect(score([2, 2, 2, 2, 2], Category.CHOICE)).toEqual(10)
  })
})
