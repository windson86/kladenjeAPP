import { userKonstante } from '../konstante/korisnicke.konstante';

export function users(state = {}, action) {
  switch (action.type) {
    case userKonstante.GETALL_REQUEST:
      return {
        loading: true
      };
    case userKonstante.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userKonstante.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case userKonstante.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userKonstante.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userKonstante.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}