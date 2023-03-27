import {api} from '../env'

async function authenticate(mode, email, password) {
   
  API_KEY = api.key;
  
  const url =
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=` + API_KEY;

  response_fn = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true,
    }),
  });

  response = await response_fn.json();
  console.log('response ', response.localId);
  const userID = response.localId;
  const token = response.idToken;
  const refreshToken = response.refreshToken;
  // return token;
  return { token, refreshToken, userID };
}

// export function createUser(email, password) {
//   return authenticate('signUp', email, password);
// }

export async function login(email, password) {
  return authenticate('signInWithPassword', email, password);
}

export async function createUser(email, password) {
  return authenticate('signUp', email, password);
}

async function refreshIdToken(refreshToken = '') {
  // console.log('refreshtidtoken');
  const API_KEY = api.key;

  const url = `https://securetoken.googleapis.com/v1/token?key=` + API_KEY;

  const response_fn = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
  });

  const response = await response_fn.json();
  const idToken = response.id_token;
  return idToken;
}



// refreshIdToken();

//return promise
export async function get_with_token(token, url = '') {
  if (url === '') {
    url =
      'https://react-native-course-3cceb-default-rtdb.firebaseio.com/message.json?auth=' +
      token;
  } else {
    url = url + '?auth=' + token;
  }

  response_fn = await fetch(url);
  console.log('u work', response_fn);
  return response_fn.json();
}
