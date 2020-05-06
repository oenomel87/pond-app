import Cookie from 'js-cookie';
import { TOKEN_NAME } from '../env';

function getToken() {
  return Cookie.get(TOKEN_NAME);
}

export default getToken;