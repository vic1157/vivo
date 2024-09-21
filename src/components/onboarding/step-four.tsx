"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { StepFourSchema, StepFourSchemaType } from "@/lib/validators/step-four";
import { RadioGroup } from "@headlessui/react";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";

interface Props {
    nextStep: () => void;
}

const StepFour = ({ nextStep }: Props) => {

    const form = useForm<StepFourSchemaType>({
        resolver: zodResolver(StepFourSchema),
        defaultValues: {
            happiness: 5, // Set a default value
        },
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["step-four"],
        mutationFn: async (data: StepFourSchemaType) => {
            console.log("Submitting Data:", data); // Debugging log
            const response = await axios.post("/api/onboarding/step-four", data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Data saved!");
            nextStep(); // Call the next step after mutation is successful
        },
        onError: (error: any) => {
            console.log("Submission error:", error.response?.data || error.message); // Debugging log
            toast.error((error as any).response?.data || "Something went wrong");
        },
    });

    const onSubmit = (data: StepFourSchemaType) => {
        console.log("Form Data Before Submit:", data); // Debugging log
        mutate(data); // Call mutation on form submit
    };

    return (
        <FormProvider {...form}>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-center mb-6">Mental Wellbeing</h2>

                    {/* Happiness Scale */}
                    <FormField
                        control={form.control}
                        name="happiness"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="happiness" className="text-white text-lg">
                                    How happy are you today?
                                </FormLabel>
                                <RadioGroup
                                    value={field.value}
                                    onChange={(value) => field.onChange(value)} // Correct value assignment
                                    className="grid grid-cols-5 gap-3 mt-4"
                                >
                                    {[...Array(10)].map((_, index) => (
                                        <RadioGroup.Option
                                            key={index + 1}
                                            value={index + 1}
                                            className={({ checked }) =>
                                                `cursor-pointer rounded-md border border-gray-600 text-center py-2 transition duration-300 ease-in-out hover:bg-blue-600 ${
                                                    checked ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"
                                                }`
                                            }
                                        >
                                            <span className="text-lg font-semibold">{index + 1}</span>
                                        </RadioGroup.Option>
                                    ))}
                                </RadioGroup>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full mt-8 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
                    >
                        {isPending ? (
                            <LoaderIcon className="animate-spin h-4 w-4" />
                        ) : (
                            <>
                                Next
                                <ArrowRightIcon className="h-4 w-4 ml-2" />
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </FormProvider>
    );
};

export default StepFour;
