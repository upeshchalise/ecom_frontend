"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProfileSchema } from "@/lib/schema/user";
import { zodResolver } from "@hookform/resolvers/zod";
import useFileUpload from "@/hooks/useFileUpload";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/lib/api/api";

const AdminProfile = () => {
  const [url, setUrl] = useState<string>("");
  const [imageChanged, setImageChanged] = useState(false);

  const { mutate } = useFileUpload();

  const {
      register,
      handleSubmit,
      setValue,
      reset,
      formState: { errors, isDirty },
    } = useForm<z.infer<typeof ProfileSchema>>({
      resolver: zodResolver(ProfileSchema),
      defaultValues: {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        image: "",
      },
    });
  
    const { data: userProfile } = useQuery({
      queryKey: ['userProfile'],
      queryFn: getUserProfile,
    });
  
    useEffect(() => {
      if (userProfile?.data) {
        reset({
          first_name: userProfile.data.firstName || "",
          last_name: userProfile.data.lastName || "",
          email: userProfile.data.email || "",
          phone: userProfile.data.phone || "",
          address: userProfile.data.address || "",
          image: userProfile.data.image || "",
        });
        
        if (userProfile.data.image) {
          setUrl(userProfile.data.image);
        }
      }
    }, [userProfile, reset]);

  const onSubmit = (data: z.infer<typeof ProfileSchema>) => {
    toast.success("Profile updated");
    reset(data);
    setImageChanged(false);
  };

  const handleDiscard = () => {
    reset(); 
    setImageChanged(false); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      mutate(file, {
        onSuccess: (data) => {
          setUrl(data?.url);
          setValue("image", data?.url);
          setImageChanged(true);
        },
        onError: (error) => {
          toast.error("File upload failed");
          console.error("Upload error:", error);
        },
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg border shadow-sm">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-300">
            {url ? (
              <Image src={url} alt="Profile" fill className="object-cover" />
            ) : (
              <Avatar className="w-full h-full">
                <AvatarImage src="" />
                <AvatarFallback>UC</AvatarFallback>
              </Avatar>
            )}
          </div>
          <Input type="file" name="image" onChange={handleChange} />
        </div>

        <div>
          <Input {...register("first_name")} placeholder="First Name" />
          {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
        </div>

        <div>
          <Input {...register("last_name")} placeholder="Last Name" />
          {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
        </div>

        <div>
          <Input {...register("email")} disabled placeholder="Email" />
        </div>

        <div>
          <Input {...register("phone")} placeholder="Phone" />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <div>
          <textarea
            {...register("address")}
            rows={3}
            className="w-full p-2 border rounded-md"
            placeholder="Address"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        <div className="flex gap-4 justify-end pt-4">
          <Button type="button" variant="outline" onClick={handleDiscard} disabled={!isDirty && !imageChanged}>
            Discard
          </Button>
          <Button type="submit" disabled={!isDirty && !imageChanged}>
            Update Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
