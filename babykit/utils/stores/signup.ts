import { create } from 'zustand'

export const useSignUpStore = create((set) => ({
  step: 0,
  email: '',
  otpCode: '',
  increaseStep: () => set((state:any) => ({ step: state.step + 1 })),
  setEmail: (email : string) => set(() => ({ email: email })),
  setOtpCode: (otpCode : string) => set(() => ({ email: otpCode })),
}))