import { signOutAction } from "@/app/(home)/login/actions";

function SignOutButton() {
  return (
    <button onClick={signOutAction} className={`underline-hover text-sm font-medium underline-offset-4`}>
      Logout
    </button>
  );
}

export default SignOutButton;
