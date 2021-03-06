

// const BASE_URL = 'http://localhost:5000/'
// const proxyurl = 'https://evening-fjord-30645.herokuapp.com/'
const BASE_URL = 'https://immense-river-92713.herokuapp.com/'


const get = async (url, token = null) => {
  const res = await fetch(BASE_URL + url, {
    method: "GET",
    headers: {
      "Authorization": token ? `Bearer ${token}` : '',
      "Content-Type": "application/json"
    },
  })
  const response = res.json();
  if (response.error) {
    alert(response.error)
  }
  return response;
}


const post = async (url, data, token = null) => {
  try {

    const res = await fetch(BASE_URL + url, {
      method: "POST",
      headers: {
        "Authorization": token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json"

      },
      body: JSON.stringify(data),
    })
    const response = res.json();
    if (response.error) {
      alert(response.error)
    }
    return response
  }

  catch (err) {
    console.log("post -> err", err)
  }
}


const _delete = async (url, data, token = null) => {
  const res = await fetch(BASE_URL + url, {
    method: "DELETE",
    headers: {
      "Authorization": token ? `Bearer ${token}` : '',
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  })
  if (res.error) {
    alert(res.error)
  }
  return res
}


export default { post, get, _delete };