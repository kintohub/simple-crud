exports.logError = (requestId, error) => {
  console.log(
    JSON.stringify({
      kinto_request_id: requestId,
      error: error
    })
  )
}
