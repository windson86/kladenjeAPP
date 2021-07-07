import { userKonstante } from '../konstante/korisnicke.konstante';

export function registration(state = {}, action) {
  switch (action.type) {
    case userKonstante.REGISTER_REQUEST:
      return { registering: true };
    case userKonstante.REGISTER_SUCCESS:
      return {};
    case userKonstante.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}