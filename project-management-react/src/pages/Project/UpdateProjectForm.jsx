import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { tags } from "../ProjectList/ProjectList";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";
import {fetchProjects,  updateProjects} from "@/Redux/Project/Action.js"; // <-- Action update
const UpdateProjectForm = ({ project, setOpen }) => {
    const dispatch = useDispatch();
    const form = useForm({
        defaultValues: {
            name: project?.name || "",
            description: project?.description || "",
            category: project?.category || "",
            tags: project?.tags || [],
        },
    });

    // Cập nhật lại form nếu project thay đổi
    useEffect(() => {
        if (project) {
            form.reset({
                name: project.name,
                description: project.description,
                category: project.category,
                tags: project.tags || [],
            });
        }
    }, [project, form]);

    const handleTagsChange = (newValue) => {
        const currentTags = form.getValues("tags");
        const updatedTags = currentTags.includes(newValue)
            ? currentTags.filter((tag) => tag !== newValue)
            : [...currentTags, newValue];
        form.setValue("tags", updatedTags);
    };

    const onSubmit = (data) => {
        dispatch(updateProjects(project.id,data )).then(() => {
            setOpen(false);
            dispatch(fetchProjects());
        });
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Update Project
            </h2>

            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    {/* Project Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="w-full border border-gray-300 rounded-xl py-3 px-5 text-gray-700 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                                        placeholder="Project name..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="w-full border border-gray-300 rounded-xl py-3 px-5 text-gray-700 placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                                        placeholder="Project description..."
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select
                                        value={field.value}
                                        onValueChange={(value) => field.onChange(value)}
                                    >
                                        <SelectTrigger className="w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200">
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border border-gray-200 shadow-md rounded-xl">
                                            <SelectItem value="fullstack">Full Stack</SelectItem>
                                            <SelectItem value="frontend">Frontend</SelectItem>
                                            <SelectItem value="backend">Backend</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={(value) => handleTagsChange(value)}>
                                        <SelectTrigger className="w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-200">
                                            <SelectValue placeholder="Tags" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border border-gray-200 shadow-md rounded-xl">
                                            {tags.map((item) => (
                                                <SelectItem key={item} value={item}>
                                                    {item}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>

                                {/* Selected Tags */}
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {field.value.map((item) => (
                                        <div
                                            key={item}
                                            onClick={() => handleTagsChange(item)}
                                            className="cursor-pointer flex items-center gap-2 bg-blue-100 border border-blue-200 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition"
                                        >
                                            <span>{item}</span>
                                            <Cross1Icon className="h-3 w-3" />
                                        </div>
                                    ))}
                                </div>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                        <Button
                            type="submit"
                            className="w-full mt-5 bg-blue-500 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md transition"
                        >
                            Update Project
                        </Button>
                </form>
            </Form>
        </div>
    );
};

export default UpdateProjectForm;
