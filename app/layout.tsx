import NavBar from '@/components/navbar/NavBar'
import './globals.css'
import StoreData from './StoreData'
export const metadata = {
  title: 'Gym Fit Lab',
  description: 'nutrientation and fitness app',
  icons:{
    icon:"/favicon.ico"
  }

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang='he'> 
      <body className="bg-background flex flex-col items-center text-t-gl relative">
        <nav className=' z-50 fixed w-screen flex flex-col items-center '>
          <NavBar/>
        </nav>
        <main className='mt-16 h-[calc(100vh-64px)] '>
          <StoreData />
          {children}
          
        </main>
      </body>
    </html>
  )
}
