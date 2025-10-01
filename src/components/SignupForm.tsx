"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useId, useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const id = useId()
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const toggleVisibility = () => setIsVisible((prevState) => !prevState)


  const formSchema = z.object({
    name:z.string(),
    email:z.email({error:"please provide a valid email eg:abc@gmail.com"}),
    password:z.string().min(8,{error:"password must be in 8 character"}),
    avatar:z.string()
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    name:'',
    email: "",
    password:'',
    avatar:''
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-black/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription className="sr-only">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter Your Email Here" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
              <div className="relative">
        <Input
          id={id}
          {...field}
          className="pe-9"
          placeholder="enter your password"
          type={isVisible ? "text" : "password"}
        />
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          aria-controls="password"
        >
          {isVisible ? (
            <EyeOffIcon size={16} aria-hidden="true" />
          ) : (
            <EyeIcon size={16} aria-hidden="true" />
          )}
        </button>
      </div>
              </FormControl>
              <FormDescription className="sr-only">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
                  <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input placeholder="Enter your photo url" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full text-white bg-primary/10 backdrop-blur-sm">
                  Signup
                </Button>
                <Button variant="outline" className="w-full">
                  Signup with Google
                </Button>
              </div>
          
            <div className="mt-4 text-center text-sm">
             Already  have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
               Login
              </Link>
            </div>
          </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
