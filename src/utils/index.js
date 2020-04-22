export const makeConstant = (branchOfState, actionType) => `${branchOfState}-${actionType}`;

export const standardizePhoneNumber = (hotlineNumber) => {
  let cleaned = ('' + hotlineNumber).replace(/\D/g, '')
  let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : ''
}

