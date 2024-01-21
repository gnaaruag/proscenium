'use client'

import { useSubscriptionStore } from "@/store/store"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";



function UpgradeBanner() {

    const subscription = useSubscriptionStore((state)=> state.subscription);
    const isPro = subscription?.role === "pro";
    const router =useRouter();
    

  if (subscription === undefined || isPro ) return null;
  return (
    <Button
     onClick={()=> router.push("/register")}
     className=" w-full rounded-none bg-gradient-to-r from-[#ee0c6a] to-[#f1ca3e] text-center text-white px-5 py-2
      hover:from-[#ee0c6a] hover:to-[#f1ca3e] hover:shadow-md hover:opacity-75 transition-all">

        Enhance your experience with PRO membership !
        </Button>
  )
}

export default UpgradeBanner;