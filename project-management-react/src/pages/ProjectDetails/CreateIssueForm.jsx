import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import {useDispatch} from "react-redux";
import {createIssues} from "@/Redux/Issue/Action.js";
import {useParams} from "react-router-dom";

const CreateIssueForm = ({status}) => {
    const dispatch=useDispatch();
    const {id}=useParams();

    const form=useForm({
        //resolver:zod
        defaultValues:{
            issueName:"",
            description:""
        }
    })

    const onSubmit=(data)=>{
        data.projectId=id;
        dispatch(createIssues({
            title:data.issueName,
            description : data.description,
            projectId : id,
            status,
        }));
        console.log("created issue data", data)
    }
    return (
        <div>
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control}
                               name="issueName"
                               render={({field})=><FormItem>
                                   <FormControl>
                                       <Input {...field}
                                              type="text"
                                           // Thay đổi: Nền trắng (bg-white), chữ tối (text-gray-900), border nhạt (border-gray-300)
                                              className="border w-full border-gray-300 py-5 px-5 bg-white text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary"
                                              placeholder="issueName..."/>
                                   </FormControl>
                                   <FormMessage/>
                               </FormItem>}
                    />

                    <FormField control={form.control}
                               name="description"
                               render={({field})=>
                                   <FormItem>
                                       <FormControl>
                                           <Input {...field}
                                                  type="text"
                                               // Thay đổi: Nền trắng (bg-white), chữ tối (text-gray-900), border nhạt (border-gray-300)
                                                  className="border w-full border-gray-300 py-5 px-5 bg-white text-gray-900 placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary"
                                                  placeholder="description..."/>
                                       </FormControl>
                                       <FormMessage/>
                                   </FormItem>}
                    />


                    <DialogClose>
                        {/* Button mặc định (default) sẽ dùng màu primary nổi bật trên nền trắng */}
                        <Button type="submit" className="w-full mt-5" variant="default">
                            Create Issue
                        </Button>

                    </DialogClose>
                </form>
            </Form>
        </div>
    )
}

export default CreateIssueForm