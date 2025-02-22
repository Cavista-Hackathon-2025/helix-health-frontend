import axios, { AxiosError } from "axios"

export async function Post(url, formData, state = undefined) {
  try {
    state && state(true)
    const { data } = await axios.post(url, formData, {
      withCredentials: true,
      headers: {
        'token': localStorage.getItem('token')
      }
    })
    if (data && !("err" in data)) {
      return { data, err: null }
    } else {
      return { data: null, err: data.err }
    }
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError) {
      if (error.response && error.response.data.err) {
        return { data: null, err: error.response.data.err }
      }
      return { data: null, err: error.message }
    } else {
      return { data: null, err: "Something went wrong" }
    }
  } finally {
    state && state(false)
  }
}

export async function Get(url, state = undefined) {
  try {
    state && state(true)
    const { data } = await axios.get(url, {
      withCredentials: true,
      headers: {
        'token': localStorage.getItem('token')
      }
    })
    if (data && !("err" in data)) {
      return { data, err: null }
    } else {
      return { data: null, err: data.err }
    }
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError) {
      if (error.response && error.response.data.err) {
        return { data: null, err: error.response.data.err }
      }
      return { data: null, err: error.message }
    } else {
      return { data: null, err: "Something went wrong" }
    }
  } finally {
    state && state(false)
  }
}

export async function Patch(url, formData, state = undefined) {
  try {
    state && state(true)
    const { data } = await axios.patch(url, formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      }
    })
    if (data && !("err" in data)) {
      return { data, err: null }
    } else {
      return { data: null, err: data.err }
    }
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError) {
      if (error.response && error.response.data.err) {
        return { data: null, err: error.response.data.err }
      }
      return { data: null, err: error.message }
    } else {
      return { data: null, err: "Something went wrong" }
    }
  } finally {
    state && state(false)
  }
}