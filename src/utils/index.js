export const makeConstant = (branchOfState, actionType) => `${branchOfState}-${actionType}`;

export const standardizePhoneNumber = (hotlineNumber) => {
  // returns the input as is if the field value includes notes (ie, multiple phone numbers)
  if (hotlineNumber.length > 14) return hotlineNumber
  let cleaned = ('' + hotlineNumber).replace(/\D/g, '')
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : ''
}
