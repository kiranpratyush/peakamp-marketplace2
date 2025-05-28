"use client";

import { useState, useEffect } from "react";
import { useUser, useAuth, useSignIn, SignOutButton } from "@clerk/nextjs";
import { AlertCircle, Check, Edit, Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";
import ProfilePicture from "../_components/ProfilePicture";
import { Button } from "@/design-system/primitives/button";
import { useRouter } from "next/navigation";

export default function Account() {
  const { user, isLoaded } = useUser();
  const { isSignedIn } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Initialize form with user data when loaded
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="rounded-lg border border-error-highlight bg-error/10 p-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-error" />
          <h2 className="text-lg font-medium">Not signed in</h2>
        </div>
        <p className="mt-2 text-sm text-contrast-500">
          Please sign in to view your account details.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsUpdating(true);
    try {
      await user.update({
        firstName,
        lastName,
      });

      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const cancelEdit = () => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setIsEditing(false);
  };
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">My Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-primary-highlight hover:bg-primary text-foreground transition"
          >
            <Edit className="h-4 w-4" />
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-background rounded-xl border border-contrast-200 p-6 shadow-sm">
        <ProfilePicture />

        <div className="max-w-2xl mx-auto">
          <h2 className="font-medium text-lg mb-4 text-center">
            Account Information
          </h2>

          {isEditing ? (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 max-w-md mx-auto"
            >
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border border-contrast-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-contrast-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Button
                  type="submit"
                  disabled={isUpdating}
                  variant="primary"
                  size="small"
                >
                  {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
                  {!isUpdating && <Check className="h-4 w-4" />}
                  Save Changes
                </Button>
                <Button onClick={cancelEdit} variant="secondary" size="small">
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6 max-w-lg mx-auto">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-contrast-500">First Name</p>
                  <p className="font-medium">
                    {user?.firstName || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-contrast-500">Last Name</p>
                  <p className="font-medium">
                    {user?.lastName || "Not provided"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-contrast-500">Email</p>
                <p className="font-medium">
                  {user?.primaryEmailAddress?.emailAddress || "Not provided"}
                </p>
              </div>{" "}
              <div>
                <p className="text-sm text-contrast-500">Member since</p>
                <p className="font-medium">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-contrast-200">
                <SignOutButton redirectUrl="/">
                  <Button
                    variant="tertiary"
                    size="small"
                    className="flex items-center gap-2 w-full sm:w-auto"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </SignOutButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
