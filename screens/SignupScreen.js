import { Alert } from 'react-native';
import { useContext, useState } from 'react';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { createUser } from '../util/auth';
import { AuthContext} from '../store/auth-context'

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const tokenResult= await createUser(email, password);
      const token = tokenResult.token;
      const refreshToken = tokenResult.refreshToken;
      const userID = tokenResult.userID;
      authCtx.authenticate(token, refreshToken, userID);
    } catch (error) {
      Alert.alert('oops, try again ');
      setIsAuthenticating(false);
    }
    
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating users" />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
