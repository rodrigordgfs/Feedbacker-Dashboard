const defaultPagination = {
  limit: 5,
  offset: 0
}

export default (httpClientt) => ({
  getAll: async ({ type, limit, offset } = defaultPagination) => {
    const query = { limit, offset }
    if (type) {
      query.type = type
    }
    const response = await httpClientt.get('/feedbacks', { params: query })
    return {
      data: response.data
    }
  },

  getSummary: async () => {
    const response = await httpClientt.get('/feedbacks/summary')
    return {
      data: response.data
    }
  }
})
