"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form as UIForm,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

// Schéma de validation Zod
const formSchema = z.object({
  email: z.string().email({ message: "Adresse email invalide ou champ vide" }),
})

export default function EmailForm() {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  // Fonction appelée uniquement si la validation est réussie
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email } = values
    setIsLoading(true)

    try {
      const res = await fetch("/api/subscribe", {
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      })

      if (res.ok) {
        toast.success("Vous êtes abonné !")
      } else {
        const data = await res.json()
        toast.error(data.error || "Une erreur est survenue")
      }
    } catch (error) {
      toast.error("Erreur réseau ou serveur")
      console.error("Erreur : ", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <ToastContainer />
      <UIForm {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 border p-8 rounded-lg shadow-md bg-white w-full max-w-md"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email@example.com"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>
                  Entrez une adresse email valide pour continuer.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Envoi..." : "Soumettre"}
          </Button>
        </form>
      </UIForm>
    </>
  )
}
