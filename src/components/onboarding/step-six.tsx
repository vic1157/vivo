"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { StepSixSchema, StepSixSchemaType } from "@/lib/validators/step-six";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";

interface Props {
  nextStep: () => void;
}

const StepSix = ({ nextStep }: Props) => {
  const form = useForm<StepSixSchemaType>({
    resolver: zodResolver(StepSixSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["step-six"],
    mutationFn: async (data: StepSixSchemaType) => {
      const response = await axios.post("/api/onboarding/step-six", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Data saved!");
      nextStep();
    },
    onError: (error: any) => {
      console.log("Submission error:", error.response?.data || error.message);
      toast.error((error as any).response?.data || "Something went wrong");
    },
  });

  const onSubmit = (data: StepSixSchemaType) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 to-black">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-lg bg-gray-900 p-8 rounded-lg shadow-lg"
        >
          {/* Primary Care Physician */}
          <FormField
            control={form.control}
            name="primaryCarePhysician"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Do you have a primary care physician?</FormLabel>
                <Select onValueChange={(value) => field.onChange(value === "yes")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Other fields */}
          {/* You can add other fields similarly here */}

          <Button
            type="submit"
            className="w-full mt-4 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            {isPending ? (
              <LoaderIcon className="animate-spin h-4 w-4" />
            ) : (
              <>
                Next <ArrowRightIcon className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StepSix;
