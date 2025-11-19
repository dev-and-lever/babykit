import { SignupForm } from "@/components/auth/signup-form"
import SignUpWrapper from "@/components/auth/signup-wrapper"

export default function SignUp() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignUpWrapper />
      </div>
    </div>
  )
}
