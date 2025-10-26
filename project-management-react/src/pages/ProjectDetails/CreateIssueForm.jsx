import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import {useDispatch} from "react-redux";
import {createIssues} from "@/Redux/Issue/Action.js";
import {useParams} from "react-router-dom";
import {PlusIcon} from "@radix-ui/react-icons";

const CreateIssueForm = ({status}) => {
    const dispatch=useDispatch();
    const {id}=useParams();
    const closeButtonRef = useRef(null);

    const form=useForm({
        defaultValues:{
            issueName:"",
            description:""
        }
    })

    const onSubmit = async (data) => {
        try {
            await dispatch(createIssues({
                title: data.issueName,
                description: data.description,
                projectId: id,
                status,
            })).unwrap(); // unwrap() để handle Promise

            console.log("created issue data", data);
            form.reset();

            // Tự động đóng dialog sau khi submit thành công
            if (closeButtonRef.current) {
                closeButtonRef.current.click();
            }
        } catch (error) {
            console.error("Failed to create issue:", error);
        }
    }

    return (
        <div>
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="issueName"
                        render={({field})=>
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="border w-full border-gray-300 py-3 px-4 bg-white text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary rounded-md"
                                        placeholder="Issue name..."
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        }
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({field})=>
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className="border w-full border-gray-300 py-3 px-4 bg-white text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary rounded-md"
                                        placeholder="Description..."
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        }
                    />

                    <div className="flex gap-3 pt-4">
                        <DialogClose asChild ref={closeButtonRef}>
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition-colors"
                        >
                            <PlusIcon className="mr-2"/>
                            Create Issue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
export default CreateIssueForm