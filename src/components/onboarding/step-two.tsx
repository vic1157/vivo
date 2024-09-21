"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { StepTwoSchema, StepTwoSchemaType } from "@/lib/validators/step-two";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";

interface Props {
    nextStep: () => void;
}

const StepTwo = ({ nextStep }: Props) => {
    const form = useForm<StepTwoSchemaType>({
        resolver: zodResolver(StepTwoSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["step-two"],
        mutationFn: async (data: StepTwoSchemaType) => {
            const { data: responseData } = await axios.post("/api/onboarding/step-two", data);
            return responseData;
        },
        onSuccess: () => {
            toast.success("Step 2 data saved!");
            nextStep(); // Go to the next step
        },
        onError: () => {
            toast.error("An error occurred while saving step 2 data.");
        },
    });

    const onSubmit = (data: StepTwoSchemaType) => {
        mutate(data);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-6 w-full">
                    <FormField
                        control={form.control}
                        name="diet"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>How would you describe your diet?</FormLabel>
                                <select {...field} className="input">
                                    <option value="Omnivore">Omnivore</option>
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Vegan">Vegan</option>
                                    <option value="Other">Other</option>
                                </select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="fruitsAndVegetables"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Servings of fruits and vegetables per day</FormLabel>
                                <Input {...field} type="number" placeholder="0" />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="physicalActivityDays"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Days of physical activity per week</FormLabel>
                                <Input {...field} type="number" placeholder="0" />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="sleepHours"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Hours of sleep per night</FormLabel>
                                <Input {...field} type="number" placeholder="0" />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="smokingStatus"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Do you smoke?</FormLabel>
                                <select {...field} className="input">
                                    <option value="Never">Never</option>
                                    <option value="Former smoker">Former smoker</option>
                                    <option value="Current smoker">Current smoker</option>
                                </select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="smokingFrequency"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>How often do you smoke?</FormLabel>
                                <Input {...field} placeholder="If applicable" />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="alcoholFrequency"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>How often do you consume alcohol?</FormLabel>
                                <select {...field} className="input">
                                    <option value="Never">Never</option>
                                    <option value="Occasionally">Occasionally</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Daily">Daily</option>
                                </select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="stressLevel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>On a scale of 1-10, how stressed are you?</FormLabel>
                                <Input {...field} type="number" placeholder="0" />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end gap-x-4 mt-8">
                        <Button type="submit" disabled={isPending}>
                            Next
                            {isPending ? <LoaderIcon className="animate-spin ml-2" /> : <ArrowRightIcon className="ml-2" />}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default StepTwo;
