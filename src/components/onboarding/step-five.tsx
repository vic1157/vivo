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
import { Checkbox } from "@/components/ui/checkbox";
import { StepFiveSchema, StepFiveSchemaType } from "@/lib/validators/step-five";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";

interface Props {
    nextStep: () => void;
}

const StepFive = ({ nextStep }: Props) => {
    const form = useForm<StepFiveSchemaType>({
        resolver: zodResolver(StepFiveSchema),
        defaultValues: {
            healthGoals: [], // Initialize as an empty array to ensure no undefined issues
        },
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["step-five"],
        mutationFn: async (data: StepFiveSchemaType) => {
            const response = await axios.post("/api/onboarding/step-five", data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Data saved!");
            nextStep(); // Proceed to the next step after successful submission
        },
        onError: (error: any) => {
            console.log("Submission error:", error.response?.data || error.message);
            toast.error(error.response?.data || "Something went wrong");
        },
    });

    const onSubmit = (data: StepFiveSchemaType) => {
        if (data.healthGoals.length > 3) {
            toast.error("Please select up to 3 goals");
            return;
        }
        mutate(data);
    };

    const healthGoals = [
        "Weight management",
        "Improving energy levels",
        "Managing a chronic condition",
        "Reducing risk of heart disease",
        "Improving sleep",
        "Reducing stress",
        "Other"
    ];

    return (
        <FormProvider {...form}>
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
                <form 
                    onSubmit={form.handleSubmit(onSubmit)} 
                    className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md border border-gray-200"
                >
                    <FormField
                        control={form.control}
                        name="healthGoals"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black text-lg font-semibold mb-4">
                                    What are your primary health concerns or goals? (Select up to 3)
                                </FormLabel>
                                <div className="grid grid-cols-1 gap-4">
                                    {healthGoals.map((goal) => (
                                        <div key={goal} className="flex items-center">
                                            <Checkbox
                                                value={goal}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        field.onChange([...field.value, goal]);
                                                    } else {
                                                        field.onChange(field.value.filter((g: string) => g !== goal));
                                                    }
                                                }}
                                                checked={field.value?.includes(goal) || false}
                                            />
                                            <FormLabel className="ml-2 text-gray-800 text-sm font-medium">{goal}</FormLabel>
                                        </div>
                                    ))}
                                </div>
                                <FormMessage className="text-red-500 mt-2" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full mt-6 bg-blue-600 text-white rounded-lg py-3 font-semibold hover:bg-blue-700 transition-all"
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

export default StepFive;

