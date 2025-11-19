'use server'
import { supabase } from '@/utils/supabase'
import { redirect } from 'next/navigation';
import { useSignUpStore } from "@/utils/stores/signup"

export async function sendOtp(initialState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
         options: {
         shouldCreateUser: true, //TODO: Set to False
        },
    })
    
    if(error)
    {
        console.log(error)
        return {
            error: error,
            message: null,
        };
    }
    return {
        error: null,
        message: email,
    }
}

export async function verifyOtp(email:string, initialState: any, formData: FormData){
    const otpCode = formData.get('otp') as string;

    const { data: { session }, error } = await supabase.auth.verifyOtp({
        email: email,
        token: otpCode,
        type: 'email',
    })

    if(error)
    {
        console.log(error)
        return {
            error: error,
            message: null,
        };
    }

    redirect("/app/home")
}