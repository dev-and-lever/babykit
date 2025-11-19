'use client'
import { SignupForm } from "./signup-form";
import { OTPForm } from "./otp-form";
import { useSignUpStore } from "@/utils/stores/signup";

export default function SignUpWrapper(){
    const step = useSignUpStore((state) => (state as any).step)

return (
    <div>
        {
            step == 0 ?
            <SignupForm/>
            :
            <OTPForm/>
        }
    </div>
)
}