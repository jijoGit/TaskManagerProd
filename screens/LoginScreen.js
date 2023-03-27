import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext} from '../store/auth-context'

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext)

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);

    try {
      const tokenResult  = await login(email, password);
      const token = tokenResult.token;
      const refreshToken = tokenResult.refreshToken;
      const userID = tokenResult.userID;
      authCtx.authenticate(token, refreshToken, userID);
      
    } catch (error) {
      Alert.alert('Authentication failed', 'Try again or sign up');
      setIsAuthenticating(false);
    }
    
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
