'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signInWithGoogle(next?: string) {
  const supabase = await createClient()
  const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback${next ? `?next=${next}` : ''}`

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo },
  })

  if (error || !data.url) redirect('/auth/error')
  redirect(data.url)
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/')
}
