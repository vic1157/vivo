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
                    
                    {/* Diet */}
                    <FormField
                        control={form.control}
                        name="diet"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black text-lg font-semibold mb-2">How would you describe your diet?</FormLabel>
                                <select {...field} className="w-full p-4 bg-gray-100 text-black border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
                                    <option value="Omnivore">Omnivore</option>
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Vegan">Vegan</option>
                                    <option value="Other">Other</option>
                                </select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Servings of fruits and vegetables */}
                    <FormField
                        control={form.control}
                        name="fruitsAndVegetables"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black text-lg font-semibold mb-2">Servings of fruits and vegetables per day</FormLabel>
                                <Input {...field} type="number" placeholder="0" className="w-full p-4 bg-gray-100 text-black border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"/>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Days of physical activity */}
                    <FormField
                        control={form.control}
                        name="physicalActivityDays"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black text-lg font-semibold mb-2">Days of physical activity per week</FormLabel>
                                <Input {...field} type="number" placeholder="0" className="w-full p-4 bg-gray-100 text-black border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"/>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Hours of sleep per night */}
                    <FormField
                        control={form.control}
                        name="sleepHours"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black text-lg font-semibold mb-2">Hours of sleep per night</FormLabel>
                                <Input {...field} type="number" placeholder="0" className="w-full p-4 bg-gray-100 text-black border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"/>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Smoking status */}
                    <FormField
                        control={form.control}
                        name="smokingStatus"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black text-lg font-semibold mb-2">Do you smoke?</FormLabel>
                                <select {...field} className="w-full p-4 bg-gray-100 text-black border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
                                    <option value="Never">Never</option>
                                    <option value="Former smoker">Former smoker</option>
                                    <option value="Current smoker">Current smoker</option>
                                </select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Smoking frequency */}
                    <FormField
                        control={form.control}
                        name="smokingFrequency"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black text-lg font-semibold mb-2">How often do you smoke?</FormLabel>
                                <Input {...field} placeholder="If applicable" className="w-full p-4 bg-gray-100 text-black border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"/>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Alcohol frequency */}
                    <FormField
                        control={form.control}
                        name="alcoholFrequency"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black text-lg font-semibold mb-2">How often do you consume alcohol?</FormLabel>
                                <select {...field} className="w-full p-4 bg-gray-100 text-black border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
                                    <option value="Never">Never</option>
                                    <option value="Occasionally">Occasionally</option>
                                    <option value="Weekly">Weekly</option>
                                    <option value="Daily">Daily</option>
                                </select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Stress level */}
                    <FormField
                        control={form.control}
                        name="stressLevel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black text-lg font-semibold mb-2">On a scale of 1-10, how stressed are you?</FormLabel>
                                <Input {...field} type="number" placeholder="0" className="w-full p-4 bg-gray-100 text-black border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"/>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end gap-x-4 mt-8">
                        <Button type="submit" disabled={isPending} className="p-4 w-full bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all">
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

