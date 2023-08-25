import { SignIn } from "@clerk/nextjs";
import Clicker from '../Clicker';

export default function Page() {
  return <><SignIn /><Clicker /></>;
}