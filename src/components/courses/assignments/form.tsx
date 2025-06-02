"use client";

import {
    createAssignment,
    CreateAssignmentDTO,
} from "@/actions/courses/assignments/create-assignment";
import { useAuth } from "@/components/providers/auth-provider";
import { Form } from "@/components/ui/form";
import { FormButton } from "@/components/ui/form-button";
import { FormInput } from "@/components/ui/form-input";
import { FormTextarea } from "@/components/ui/form-textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import Markdown from "react-markdown";

export const CreateAssignmentForm = () => {
    const { id: courseId } = useParams();
    const { user } = useAuth();
    const [description, setDescription] = useState("");

    const action = useCallback(
        (formData: FormData, description: string) => {
            const data: CreateAssignmentDTO = {
                title: formData.get("title") as string,
                description: description,
                startTime: formData.get("startTime")
                    ? new Date(
                          formData.get("startTime") as string
                      ).toISOString()
                    : "",
                endTime: formData.get("endTime")
                    ? new Date(formData.get("endTime") as string).toISOString()
                    : "",
                maxGrade: parseInt(formData.get("maxGrade") as string),
                teacherId: user?.id || "",
            };

            return createAssignment(courseId as string, data);
        },
        [courseId, user]
    );

    return (
        <Form
            action={(formData: FormData) => {
                return action(formData, description);
            }}
            redirectURL={`/courses/${courseId}/assignments`}
        >
            <FormInput placeholder="Title" name="title" errorFieldPath="title">
                Title
            </FormInput>
            <Tabs defaultValue="markdown">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="markdown">Markdown</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="markdown">
                    <FormTextarea
                        placeholder="Description"
                        name="description"
                        errorFieldPath="description"
                        value={description}
                        onChange={(v) => setDescription(v.currentTarget.value)}
                        className="resize-y"
                        rows={24}
                    ></FormTextarea>
                </TabsContent>
                <TabsContent value="preview">
                    <div className="rounded-md border w-full h-fit px-3 py-2 text-base shadow-sm md:text-sm mt-1.5">
                        <Markdown
                            components={{
                                ul(props) {
                                    return (
                                        <ul
                                            className="ml-6 list-disc mb-4"
                                            {...props}
                                        />
                                    );
                                },
                            }}
                        >
                            {description}
                        </Markdown>
                    </div>
                </TabsContent>
            </Tabs>

            <div className="w-full flex flex-col lg:flex-row gap-1.5">
                <FormInput
                    type="datetime-local"
                    name="startTime"
                    errorFieldPath="startTime"
                >
                    Start time
                </FormInput>
                <FormInput
                    type="datetime-local"
                    name="endTime"
                    errorFieldPath="endTime"
                >
                    Due date
                </FormInput>
            </div>
            <FormInput
                type="number"
                name="maxGrade"
                defaultValue="100"
                errorFieldPath="maxGrade"
            >
                Maximum grade
            </FormInput>

            <FormButton className="ml-auto">Submit</FormButton>
        </Form>
    );
};
