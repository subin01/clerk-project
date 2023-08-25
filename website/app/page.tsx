import Image from 'next/image'
import styles from './page.module.css'
import { UserButton } from "@clerk/nextjs";
import Clicker from './Clicker';

export default function Home() {
  return (
    <main className={styles.main}>
      <UserButton afterSignOutUrl="/"/>
      <Clicker />
      <h1>Home page</h1>        
    </main>
  )
}
