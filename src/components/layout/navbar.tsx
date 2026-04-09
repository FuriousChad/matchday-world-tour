import { getCities, getTeams } from '@/lib/queries'
import { NavbarClient } from '@/components/layout/navbar-client'

export async function Navbar() {
  const [teams, cities] = await Promise.all([getTeams(), getCities()])

  return <NavbarClient teams={teams} cities={cities} />
}
