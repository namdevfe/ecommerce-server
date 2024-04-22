const calcExperyCoupon = (time) => {
  if (!time) return
  return Date.now() + Number(time * 24 * 60 * 60 * 1000)
}

export {
  calcExperyCoupon
}
