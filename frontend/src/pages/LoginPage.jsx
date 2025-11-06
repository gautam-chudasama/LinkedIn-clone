import AuthContainer from "../components/Auth/AuthContainer";
import LoginForm from "../components/Auth/LoginForm";

const LoginPage = () => {
  return (
    <AuthContainer
      title="Welcome Back"
      subtitle="Sign in to continue"
      footerText="Don't have an account?"
      footerLinkText="Sign up"
      footerLink="/signup"
    >
      <LoginForm />
    </AuthContainer>
  );
};

export default LoginPage;
