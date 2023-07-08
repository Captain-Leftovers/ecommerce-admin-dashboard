import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"




type SetupLayoutProps = {
    children: React.ReactNode,

  }
export default function SetupLayout({children}: SetupLayoutProps) {

    const { userId } = auth()

    if (!userId) {
        redirect('/sign-in')
    }



return (
  <div>
     layout
  </div>
  )
}