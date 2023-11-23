"use client"
import { useState, useEffect } from "react";
import { unsplash } from "@/lib/unsplash";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface FormPickerProps{
    id: string;
    errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({id, errors}:FormPickerProps) =>{
    const {pending} = useFormStatus();

    const [images, setImages] = useState<Array<Record<string, any>>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedImageId, setSelectedImageId] = useState(null);


    useEffect(()=>{
        async function fetchImages(){
            try{
                const result = await unsplash.photos.getRandom({
                    collectionIds:["317099"],
                    count:9,
                });

                if(result && result.response)
                {
                    const newImages = (result.response as Array<Record<string, any>>);
                    setImages(newImages);
                }else{
                    console.error("Failed to get images fron Unsplash.");
                }

            }catch(err){
                console.log(err);
            }finally{
                setIsLoading(false);
            }
        }

        fetchImages();
    },[]);  

    if(isLoading)
        return <div className="flex items-center justify-center p-6"><Loader2 className="w-6 h-6 text-sky-700 animate-spin"/></div> 

    return(
        <div className="relative">
            <div className="grid grid-col-3 gap-2 mb-2">
                {images.map((image)=>(
                    <div key={image.id} className={cn("cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
                    pending && "opacity-50 hover:opacity-50 cursor-auto")} onClick={()=>{
                        if(pending) return;
                        setSelectedImageId(image.id)
                    }}>
                        <Image fill alt="unsplash-image" className="object-cover rounded-sm" src={image.urls.thumb}/>
                    </div>
                ))}
            </div>
        </div>
    )
}