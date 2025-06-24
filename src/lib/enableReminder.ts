import axios, { isAxiosError } from "axios";
import { toast } from "react-hot-toast";
import { Contest } from "@/types";

export async function enableEmailReminder(contest: Contest, setShowAddReminder: React.Dispatch<React.SetStateAction<boolean>>) {
    try {
      const res = await axios.post("/api/add-reminder", { contest });
      if (res.status === 200) {
        toast("Email reminder added");
      }
    } catch (error) {
      if(isAxiosError(error) && error.response?.status === 409){
        toast("Email reminder for this contest already exists");
      } else {
        toast("Failed to add email reminder");
      }
    } finally {
      setShowAddReminder(false);
    }
}