
import { createServerSupabaseClient } from '@/app/supabase-server';


import NavComp from './NavComponent';

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();


  return (
    <NavComp user={user}/>
   
  );
}
