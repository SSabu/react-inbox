import { MESSAGES_RECEIVED, TOGGLE_SELECTED, TOGGLE_STARRED, MARK_READ, MARK_UNREAD, APPLY_LABEL, REMOVE_LABEL, TOGGLE_SELECT_ON, TOGGLE_SELECT_OFF, DELETE_MESSAGE, SEND_MESSAGE, GET_BODY } from '../actions'

function messages(state = { messages:[] }, action) {

  const { messages, messageId } = action;

  switch(action.type){

    case MESSAGES_RECEIVED:
      return {
        messages: [...messages]
      };

    case TOGGLE_SELECTED:
    return {messages: state.messages.map(message => {
      if (messageId === message.id){
        return {
          ...message,
          selected: !message.selected
        }
      }
      return message;
    })}

    case TOGGLE_STARRED:
    return {messages: state.messages.map(message => {
      if (messageId === message.id){
        return {
          ...message,
          starred: !message.starred
        }
      }
      return message;
    })}

    case MARK_READ:
    return {messages: state.messages.map(message => {
      if (messageId.includes(message.id)) {
        return {
          ...message,
          read: true
        }
      }
      return message;
    })}

    case MARK_UNREAD:
    return {messages: state.messages.map(message => {
      if (messageId.includes(message.id)) {
        return {
          ...message,
          read: false
        }
      }
      return message;
    })}

    case APPLY_LABEL:

    return {messages: state.messages.map(message => {

      if (messageId.includes(message.id) && message.labels.indexOf(action.newLabel)===-1 ){
          return {
            ...message,
            labels: [...message.labels, action.newLabel]
          }
      }
      return message;
    })}

    case REMOVE_LABEL:
    return {messages: state.messages.map(message => {
      if(messageId.includes(message.id) && message.labels.indexOf(action.oldLabel) !==-1) {

        message.labels.splice(message.labels.indexOf(action.oldLabel),1)

          return {
            ...message,
            labels:  message.labels
          }

      }
      return message;
    })}

    case TOGGLE_SELECT_ON:
    return {messages: state.messages.map(message => {
        return {
          ...message,
          selected:true
        }
    })}

    case TOGGLE_SELECT_OFF:
    return {messages: state.messages.map(message => {
        return {
          ...message,
          selected:false
        }
    })}

    case DELETE_MESSAGE:
    return {messages: state.messages.filter(message => {

      if (messageId.includes(message.id)){
          return false;
      }
      return true;
    })}

    case SEND_MESSAGE:

    let newMessage = {
      id: action.msg.id,
      subject: action.subject,
      body: action.body,
      starred: false,
      read: false,
      labels: []
    }

    return {
      messages: [...state.messages, newMessage]
    };

    case GET_BODY:
    return {...state, message:
      action.messageBody};

    default:
      return state
  }
}

export default messages;
