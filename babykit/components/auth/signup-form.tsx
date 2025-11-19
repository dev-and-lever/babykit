'use client'
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
import { Input } from "@/components/ui/input"

import {sendOtp} from "@/app/actions/signup"
import { useSignUpStore } from "@/utils/stores/signup"
import { toast } from "sonner"
import { useActionState, useEffect } from 'react'

const initialState = {
  message: '',
  error: null,
}

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
   const increaseStep = useSignUpStore((state) => (state as any).increaseStep)
   const setEmail = useSignUpStore((state) => (state as any).setEmail)
   const [state, formAction, pending] = useActionState(sendOtp as any, initialState)

   useEffect(() => {
    if (!pending && state) {
      if (state.error) {
        toast.error(state.error)
      } else if (state.message) {
        toast.success(state.message)
        setEmail(state.message)
        increaseStep()
      }
    }
  }, [state, pending])

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Cria uma conta</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@exemplo.com"
                required
              />
              <FieldDescription>
                Iremos utilizar este email para enviar o código temporário de acesso.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button disabled={pending} type="submit">Continuar</Button>
                <FieldDescription className="px-6 text-center">
                  Já tem uma conta? <a href="/auth/sign-in">Entrar!</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
