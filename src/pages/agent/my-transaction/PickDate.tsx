import { Clock2Icon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"

type PickDateProps = {
  selectedDate: Date | undefined
  onSelectDate: (date: Date | undefined) => void
  selectedTime: string
  onSelectTime: (time: string) => void
}

export default function PickDate({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
}: PickDateProps) {
  return (
    <Card className="mx-auto w-full">
      <CardContent className="mx-auto w-full">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelectDate}
          className="w-full p-0 [&_table]:w-full"
        />
      </CardContent>
      <CardFooter className="border-t bg-card">
        <FieldGroup className="w-full">
          <Field>
            <FieldLabel htmlFor="time-from">Start Time</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="time-from"
                type="time"
                step="1"
                value={selectedTime}
                onChange={(e) => onSelectTime(e.target.value)}
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <InputGroupAddon>
                <Clock2Icon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardFooter>
    </Card>
  )
}
