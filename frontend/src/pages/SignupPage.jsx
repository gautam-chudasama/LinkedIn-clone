import AuthContainer from "../components/Auth/AuthContainer";
import SignupForm from "../components/Auth/SignupForm";

const SignupPage = () => {
  return (
    <AuthContainer
      title="Create Account"
      subtitle="Join our community today"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLink="/login"
    >
      <SignupForm />
    </AuthContainer>
  );
};

export default SignupPage;
