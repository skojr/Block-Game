import { signInWithGoogle } from "@/app/actions"
import { LogIn } from "lucide-react"

export default function SignIn() {
  return (
    <form action={signInWithGoogle} className="w-full flex justify-center">
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-600 dark:hover:to-amber-700 transition-all text-white text-base font-semibold shadow-lg shadow-amber-500/20 dark:shadow-amber-500/30 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-amber-500 dark:focus:ring-amber-400"
      >
        <LogIn className="w-5 h-5" />
        Sign in with Google
      </button>
    </form>
  )
}
