"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Camera, Loader2, User } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePicture() {
  const { user } = useUser();
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    try {
      // Upload the image to Clerk
      await user.setProfileImage({ file });
      toast.success("Profile picture updated");
    } catch (error) {
      toast.error("Failed to update profile picture");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative mx-auto w-32 h-32 mb-6">
      <div className="w-32 h-32 rounded-full overflow-hidden bg-contrast-100">
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.fullName || "Profile"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-contrast-100">
            <User className="h-12 w-12 text-contrast-300" />
          </div>
        )}
      </div>

      <label
        htmlFor="profile-upload"
        className="absolute bottom-0 right-0 bg-primary-shadow hover:bg-primary-shadow text-white p-2 rounded-full cursor-pointer shadow-md transition"
      >
        {isUploading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Camera className="h-5 w-5" />
        )}
      </label>

      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
        disabled={isUploading}
      />
    </div>
  );
}
