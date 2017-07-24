// import { connect } from 'redux'

export default class Api {
  static fetchMessages() {
    return fetch('http://localhost:8181/api/messages')
    .then(response => response.json())
    .then(json => {
      return json._embedded;
    })
    .catch(err => {
      throw err;
    });
  }

  static updateApiState(method, updateObj) {
    return fetch ('http://localhost:8181/api/messages', {
      method: method,
      headers: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify(updateObj)
    })
  .then(response => {
    return response;
  })
  .catch(err => {
    throw err;
  })
  }

  static fetchMessageBody(id) {
    return fetch(`http://localhost:8181/api/messages/${id}`)
      .then(response => response.json())
      .then(json => json);
  }
}
