import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <div className="container mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-4xl mb-4">⚠️</p>
      <h1 className="text-xl font-semibold mb-2">Sign-in failed</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Something went wrong during sign-in. Please try again.
      </p>
      <Link href="/" className="text-green-600 font-medium hover:underline">
        Back to home
      </Link>
    </div>
  )
}
