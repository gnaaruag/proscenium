"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from 'react-hook-form'
import * as z from "zod";
import { getDocs, serverTimestamp, setDoc} from "firebase/firestore";
import { addChatRef, chatMembersRef } from "@/lib/converters/ChatMembers";
import { useSession } from "next-auth/react";
import { getUserbyEmailRef } from "@/lib/converters/User";
import { useToast } from "@/components/ui/use-toast";
import useAdminId  from "@/hooks/useAdminId";
import { PlusCircleIcon } from "lucide-react";  
// import { ShareLink} from "./ShareLink";
import { useSubscriptionStore } from "@/store/store"; 
import { Toast } from "./ui/toast";
import { useRouter } from "next/navigation";  
import { useState } from "react";
import { ToastAction } from "@radix-ui/react-toast";
import ShareLink from "./ShareLink";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

function InviteUser({chatId}:{chatId:string}) {
  const { data: session} =useSession();
  const { toast } = useToast();
  const adminId = useAdminId({chatId});
  const subscription = useSubscriptionStore(( state ) => state.subscription);
  const router = useRouter();

  const[open, setOpen] = useState(false);
  const [ openInviteLink, setOpenInviteLink] =useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      email:"",
    },
  });

  async function onSubmit ( values: z.infer<typeof formSchema>){
    if(!session?.user.id) return;

    toast({
      title: "Sending Invite",
      description: " Please wait while we send the pigeons with the invite..."
    });

    const noOfUsersInChat = (await getDocs(chatMembersRef(chatId))).docs.map((doc)=>doc.data()).length;

    const isPro = subscription?.role ==='pro' && subscription.status ==="active";

    if(!isPro && noOfUsersInChat >=2) {
      toast({
        title: " Free plan limit exceeded",
        description:"Oopsie-daisy! Looks like you've hit the chat party limit on the Free plan. Time to upgrade to PRO for an exclusive VIP pass to unlimited chat shenanigans!",
        variant: "destructive",
        action:(
         <ToastAction 
          altText="Upgrade"
          onClick={()=> router.push("/register")} 
          > 
          Upgrade to PRO
          </ToastAction>
      ),
    
    });
  return;
    }

    const querySnapshot = await getDocs( getUserbyEmailRef(values.email));

    if(querySnapshot.empty){
      toast({
        title:" User not found",
        description :
          " Please enter an email address of a registered user OR resend the invitation once they have signed up!",
        
        variant:"destructive",
      });
      return;
    }else{
      const user = querySnapshot.docs[0].data();

      await setDoc(addChatRef(chatId, user.id),{
        userId: user.id!,
        email: user.email!,
        timestamp:serverTimestamp(),
        chatId: chatId,
        isAdmin:false,
        image:user.image ||" ",
      }).then(()=>{
        setOpen(false);
        toast({
          title:"Added to chat",
          description:"User added successfully?",
          className:"bg-green-600 text-white",
          duration:3000,
        });
        setOpenInviteLink(true);
      })

      
    }
    form.reset()
}

  return(

    adminId === session?.user.id && (
      <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusCircleIcon className="mr-1"/>
            Add User to Chat 
            </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader >
                <DialogTitle>Add User to Chat</DialogTitle>
                <DialogDescription>
                  Simply enter other users email to send them an invite to be a part of this conversation!{" "}
                  <span className="text-blue-600 font-bold">
                    (Note: they must be registered)

                  </span>
                </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col space-y-2"
                    >
                      <FormField control={form.control}
                        name="email"
                        render={({field})=>(
                          <FormItem>
                            <FormControl>
                              <Input placeholder="phineas@ferb.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                        />
                        <Button className="ml-auto sm:w-fit w-full" type="submit">
                          Add to Chat
                        </Button>
                    </form>
                  </Form>

                  </DialogContent>
                  </Dialog>

                  <ShareLink isOpen={openInviteLink}
                  setIsOpen={setOpenInviteLink}
                  chatId={chatId} />
                  </>
    )
  );
  
}

export default InviteUser