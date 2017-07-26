export const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED'
export const TOGGLE_SELECTED = 'TOGGLE_SELECTED'
export const TOGGLE_STARRED = 'TOGGLE_STARRED'
export const MARK_READ = 'MARK_READ'
export const MARK_UNREAD = 'MARK_UNREAD'
export const APPLY_LABEL = 'APPLY_LABEL'
export const REMOVE_LABEL = 'REMOVE_LABEL'
export const TOGGLE_SELECT_ON = 'TOGGLE_SELECT_ON'
export const TOGGLE_SELECT_OFF = 'TOGGLE_SELECT_OFF'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const GET_BODY = 'GET_BODY'

export function getMessages(message) {
  return (dispatch, getState, { Api }) => {
    return Api.fetchMessages()
      .then(msgObj => msgObj.messages)
      .then(messages => dispatch({
        type: MESSAGES_RECEIVED,
        messages
      }))
    }
  }

export function toggleSelected(messageId) {
  return (dispatch, getState) => {
    return(dispatch({
      type: TOGGLE_SELECTED,
      messageId
    }))
  }
}

export function toggleStarred(messageId, starStatus){

  let updateObj = {
    "messageIds": [messageId],
    "command":"star",
    "star":!starStatus
  }

  return (dispatch, getState, { Api }) => {
    return Api.updateApiState('PATCH', updateObj)
      .then(messages => dispatch({
        type: TOGGLE_STARRED,
        messageId
      }))
  }
}

export function markRead(messageId){

  let updateObj = {
      "messageIds": messageId,
      "command":"read",
      "read": true
  }

  return (dispatch, getState, { Api }) => {
    return Api.updateApiState('PATCH', updateObj)
      .then(messages => dispatch({
        type: MARK_READ,
        messageId
      }))
  }
}

export function markUnread(messageId){

  let updateObj = {
    "messageIds": messageId,
    "command":"read",
    "read":false
  }

  return (dispatch, getState, { Api }) => {
    return Api.updateApiState('PATCH', updateObj)
      .then(messages => dispatch({
        type: MARK_UNREAD,
        messageId
      }))
  }
}

export function applyLabel(messageId, newLabel) {

    let updateObj = {
      "messageIds": messageId,
      "command":"addLabel",
      "label": newLabel
    }

    return (dispatch, getState, { Api }) => {
      return Api.updateApiState('PATCH', updateObj)
      .then(messages => dispatch({
        type: APPLY_LABEL,
        messageId,
        newLabel
      }))
  }
}

export function removeLabel(messageId, oldLabel) {

  let updateObj = {
    "messageIds": messageId,
    "command":"removeLabel",
    "label": oldLabel
  }

  return (dispatch, getState, { Api }) => {
    return Api.updateApiState('PATCH', updateObj)
      .then(messages => dispatch({
        type: REMOVE_LABEL,
        messageId,
        oldLabel
      }))
  }
}

export function toggleSelectOn() {
  return (dispatch, getState) => {
    return(dispatch({
      type: TOGGLE_SELECT_ON
    }))
  }
}

export function toggleSelectOff() {
  return (dispatch, getState) => {
    return(dispatch({
      type: TOGGLE_SELECT_OFF
    }))
  }
}

export function deleteMessages(messageId){

  let updateObj = {
    "messageIds":messageId,
    "command":"delete"
  }

  return (dispatch, getState, { Api }) => {
    return Api.updateApiState('PATCH', updateObj)
      .then(messages => dispatch({
      type: DELETE_MESSAGE,
      messageId
    }))
  }
}

export function sendMessage(subject, body) {
  let updateObj = {
    "body": body,
    "subject": subject
  }

  return (dispatch, getState, { Api }) => {
    return Api.updateApiState('POST', updateObj)
      .then(response => response.json())
      .then(msg => {
        dispatch({
          type: SEND_MESSAGE,
          subject,
          body,
          msg
        })
      })
  }
}

export function getMessageBody(path) {
  return (dispatch, getState, { Api }) => {
    return Api.fetchMessageBody(path)
      .then(messageBody => {
        return dispatch({
          type: GET_BODY,
          messageBody
        })
      })
  }
}
