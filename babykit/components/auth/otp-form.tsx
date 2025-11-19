import { verifyOtp } from "@/app/actions/signup"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useSignUpStore } from "@/utils/stores/signup"
import { useActionState, useEffect } from 'react'
import { toast } from "sonner"

const initialState = {
  message: '',
  error: null,
}

export function OTPForm({ ...props }: React.ComponentProps<typeof Card>) {
  const email = useSignUpStore((state) => (state as any).email)
  const updateVerifyOtpWithEmail = verifyOtp.bind(null, email);
  const [state, formAction, pending] = useActionState(updateVerifyOtpWithEmail as any, initialState)

  useEffect(() => {
    if (!pending && state && state.error) {
      toast.error(state.error)
    }
  }, [state, pending])

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Introduz o código de verificação</CardTitle>
        <CardDescription>Foi enviado um código de 6 digitos para {email}.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="otp">Código de verificação</FieldLabel>
              <InputOTP maxLength={6} id="otp" required name="otp">
                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription>
                Introduz o código de 6 digitos enviado para o teu email.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Button disabled={pending} type="submit">Verificar</Button>
              <FieldDescription className="text-center">
                Não recebeu o código? <a href="#">Enviar novamente</a>
              </FieldDescription>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
