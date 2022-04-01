const axios = require('axios')

const fetchPostings = async () => {
  try {
    const response = await axios.get('https://api.lever.co/v0/postings/ursamajortech')
    if (response.data) return response.data
    return null
  } catch (e) {
    console.log('ERROR FETCHING POSTINGS DATA', e)
    return null
  }
}

const fetchPosting = async (id) => {
  try {
    const response = await axios.get(`https://api.lever.co/v0/postings/ursamajortech/${id}`)
    if (response.data) return response.data
    return null
  } catch (e) {
    console.log('ERROR FETCHING SINGLE POSTING DATA', e)
    return null
  }
}

module.exports = { fetchPosting, fetchPostings }
