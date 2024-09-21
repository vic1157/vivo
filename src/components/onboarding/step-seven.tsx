"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { StepSevenSchema, StepSevenSchemaType } from "@/lib/validators/step-seven";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface Props {
  nextStep: () => void;
}

const StepSeven = ({ nextStep }: Props) => {
  const form = useForm<StepSevenSchemaType>({
    resolver: zodResolver(StepSevenSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["step-seven"],
    mutationFn: async (data: StepSevenSchemaType) => {
      const response = await fetch("/api/onboarding/step-seven", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
    onSuccess: () => {
      toast.success("Data saved!");
      nextStep();
    },
    onError: (error: any) => {
      console.error("Error submitting data:", error);
      toast.error("Something went wrong.");
    },
  });

  const onSubmit = (data: StepSevenSchemaType) => {
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Uses Fitness Tracking Tech */}
        <FormField
          control={form.control}
          name="usesFitnessTrackingTech"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Do you use any health or fitness tracking apps or devices?</FormLabel>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value ? "yes" : "no"} // Handle boolean values
              >
                <RadioGroupItem value="yes">Yes</RadioGroupItem>
                <RadioGroupItem value="no">No</RadioGroupItem>
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Willing to Connect Health Data */}
        <FormField
          control={form.control}
          name="willingToConnectHealthData"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Are you willing to connect Apple Health or other fitness tracking data to this app?</FormLabel>
              <RadioGroup onValueChange={field.onChange} value={field.value}>
                <RadioGroupItem value="yes">Yes</RadioGroupItem>
                <RadioGroupItem value="no">No</RadioGroupItem>
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Comfort With Health Tech */}
        <FormField
          control={form.control}
          name="comfortWithHealthTech"
          render={({ field }) => (
            <FormItem>
              <FormLabel>On a scale of 1-10, how comfortable are you using technology for health management?</FormLabel>
              <Input
                type="number"
                min={1}
                max={10}
                placeholder="Rate your comfort level (1-10)"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Next"}
        </Button>
      </form>
    </Form>
  );
};

export default StepSeven;
