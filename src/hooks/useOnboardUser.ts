import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { onboardUser, updateProfile } from "@/services/user.service"

type OnboardingInput = {
  name: string
  phoneNumber: string
  location: string
}

export const useOnboardUser = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (input: OnboardingInput) => {
      await updateProfile(input)
      return onboardUser()
    },
    onSuccess: ({ user: updatedUser }) => {
      // don't touch isOnboarding here, the success page does it
      navigate("/onboarding/success", {
        replace: true,
        state: { fromOnboarding: true, updatedUser },
      })
    },
    onError: (err) => {
      toast.error(
        err instanceof AxiosError
          ? err.response?.data?.message ||
              "Submission failed. Please try again."
          : "Submission failed. Please try again."
      )
    },
  })
}
