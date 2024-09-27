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
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { StepOneSchema, StepOneSchemaType } from "@/lib/validators/step-one";
import { ArrowRightIcon, LoaderIcon } from "lucide-react";

interface Props {
    nextStep: () => void;
}

const StepOne = ({ nextStep }: Props) => {

    const form = useForm<StepOneSchemaType>({
        resolver: zodResolver(StepOneSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["step-one"],
        mutationFn: async (data: StepOneSchemaType) => {
            const response = await axios.post("/api/onboarding/step-one", data);
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
    
    const onSubmit = (data: StepOneSchemaType) => {
        mutate(data);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto h-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-6 w-full h-full relative">
                    
                    {/* Date of Birth */}
                    <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-200">Date of Birth</FormLabel>
                                <Input
                                    {...field}
                                    className="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:ring-primary focus:border-primary"
                                    placeholder="YYYY-MM-DD"
                                />
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />

                    {/* Weight */}
                    <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-200">Weight (kg)</FormLabel>
                                <Input
                                    {...field}
                                    className="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:ring-primary focus:border-primary"
                                    placeholder="e.g., 70"
                                    type="number"
                                />
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />

                    {/* Height */}
                    <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-200">Height (cm)</FormLabel>
                                <Input
                                    {...field}
                                    className="bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:ring-primary focus:border-primary"
                                    placeholder="e.g., 170"
                                    type="number"
                                />
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />

                    {/* Gender */}
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-200">Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="bg-gray-800 text-white border border-gray-600 focus:ring-primary focus:border-primary">
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Non-binary">Non-binary</SelectItem>
                                        <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="mt-6 w-full bg-primary text-white hover:bg-primary-dark transition-colors"
                    >
                        Next
                        {isPending ? (
                            <LoaderIcon className="animate-spin h-4 w-4" />
                        ) : (
                            <ArrowRightIcon className="h-4 w-4" />
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default StepOne;