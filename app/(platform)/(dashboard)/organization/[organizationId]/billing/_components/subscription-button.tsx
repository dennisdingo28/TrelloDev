"use client"

import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "sonner";

interface SubscriptionButtonProps{
    isPro: boolean;
}

export const SubscriptionButton = ({isPro}:SubscriptionButtonProps) =>{
    const proModal = useProModal();

    const {execute, isLoading} = useAction(stripeRedirect,{
        onSuccess:(data)=>{
            window.location.href=data;
        },
        onError:(err)=>{
            toast.error(err);
        }
    })
    return  (
        <Button onClick={()=>{
            if(isPro)
                execute({});
            else proModal.onOpen();

        }
        } disabled={isLoading} variant={"primary"}>{isPro ? "Manage Subscription":"Upgrade to pro"}</Button>
    )
}