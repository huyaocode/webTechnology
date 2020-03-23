import toFinite from './toFinite'

function toInteger(value) {
  const result = toFinite(value)

  // 1.4 % 1 => 0.4
  const remainder = result % 1

  return remainder ? result - remainder : result
}

export default toInteger