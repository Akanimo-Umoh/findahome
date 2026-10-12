import PageHeader from "@/components/shared/PageHeader"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

const FeedbackSchema = z.object({
  topic: z.enum([
    "Product suggestion",
    "Something is not working",
    "Property or agent experience",
    "Other",
  ]),
  message: z
    .string()
    .trim()
    .min(10, "Please enter at least 10 characters.")
    .max(2000, "Feedback must be 2000 characters or fewer."),
})

type FeedbackFormData = z.infer<typeof FeedbackSchema>

export default function Feedback() {
  const navigate = useNavigate()
  const {
    control,
    register,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      topic: "Product suggestion",
      message: "",
    },
  })

  return (
    <div className="mb-10 px-6 text-text-primary md:px-8 md:pt-6">
      <div className="mx-auto max-w-150">
        <PageHeader title="Send Feedback" responsive />

        <p className="mt-4 text-[14px] text-text-secondary">
          Tell us what is working well or what we could improve.
        </p>

        <form className="mt-6 flex flex-col gap-5" noValidate>
          <Field data-invalid={Boolean(errors.topic)}>
            <FieldLabel htmlFor="feedback-topic">
              What is this about?
            </FieldLabel>
            <Controller
              name="topic"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id="feedback-topic"
                    className="h-12 w-full"
                    aria-invalid={Boolean(errors.topic)}
                    onBlur={field.onBlur}
                  >
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Product suggestion">
                      Product suggestion
                    </SelectItem>
                    <SelectItem value="Something is not working">
                      Something is not working
                    </SelectItem>
                    <SelectItem value="Property or agent experience">
                      Property or agent experience
                    </SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.topic]} />
          </Field>

          <Field data-invalid={Boolean(errors.message)}>
            <FieldLabel htmlFor="feedback-message">Your feedback</FieldLabel>
            <Textarea
              id="feedback-message"
              rows={7}
              maxLength={2000}
              placeholder="Share the details with us..."
              aria-invalid={Boolean(errors.message)}
              aria-describedby="feedback-message-hint feedback-message-error"
              {...register("message")}
            />
            <div className="flex items-start justify-between gap-3">
              <FieldDescription id="feedback-message-hint">
                Please enter at least 10 characters.
              </FieldDescription>
              <span className="shrink-0 text-[12px] text-text-secondary">
                Maximum 2000 characters
              </span>
            </div>
            <FieldError id="feedback-message-error" errors={[errors.message]} />
          </Field>

          <div className="flex flex-col gap-3">
            <Button type="button" variant="app-primary" size="full" disabled>
              Send feedback
            </Button>
            <Button
              type="button"
              variant="app-secondary"
              size="full"
              onClick={() => navigate("/profile")}
            >
              Back to profile
            </Button>
          </div>
        </form>

        <p className="mt-5 text-[12px] text-text-secondary">
          Feedback submission will be available here once the service is ready.
        </p>
      </div>
    </div>
  )
}
