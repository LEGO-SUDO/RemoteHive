interface ErrorWithStatus extends Error {
    status?: number

}

export const createError = (status, message) => {
  const err = new Error() as ErrorWithStatus
  err.status = status
  err.message = message

  return err
}
