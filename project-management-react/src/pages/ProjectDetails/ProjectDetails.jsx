import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import React, { useEffect} from 'react'
import InviteUserForm from './InviteUserForm'
import IssueList from './IssueList'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProjectById } from "@/Redux/Project/Action.js";
import {PlusIcon} from "@radix-ui/react-icons";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { project } = useSelector(store => store);
  const { id } = useParams();

  const handleProjectInvitation = () => {
    // xử lý mời user
  };

  useEffect(() => {
    if (id) dispatch(fetchProjectById(id));
  }, [id, dispatch]);

  const { projectDetails } = project;

  return (
      <>
        <div className='mt-5 lg:px-10'>
          <div className='lg:flex gap-5 justify-between pb-4'>
            {/* LEFT SIDE */}
            <div className='text-gray-700 pb-10 w-full'>
              <h1 className='text-lg font-semibold pb-5'>Create Ecommerce Website Using </h1>
              <div className='space-y-5 pb-10 text-sm'>
                <p className='w-full md:max-w-lg lg:max-w-xl'>Chào mừng bạn đến với thế giới của mình</p>
              </div>
              <div className='flex pb-5'>
                <p className='w-36'>Project name :</p>
                <p>{projectDetails?.name}</p>
              </div>
              <div className='flex pb-5 items-center'>
                <p className='w-36'>Members :</p>
                <div className='flex items-center gap-2'>
                  {projectDetails?.team?.map((item, index) => (
                      <Avatar className="cursor-pointer" key={index}>
                        <AvatarFallback>{item?.fullName?.charAt(0)}</AvatarFallback>
                      </Avatar>
                  ))}
                </div>


                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" className="ml-3">
                      <span>invite</span>
                      <PlusIcon className='w-3 h-3 ml-1' />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white text-gray-900 border border-gray-200 rounded-lg">
                    <DialogHeader className="pb-4">
                      <h3 className="text-lg font-semibold">Invite User</h3>
                    </DialogHeader>
                    <InviteUserForm />
                  </DialogContent>
                </Dialog>
              </div>

              <div className='flex pb-5'>
                <p className='w-36'>Category :</p>
                <p>{projectDetails?.category}</p>
              </div>

              <div className='flex pb-5'>
                <p className='w-36'>Project Lead :</p>
                <Badge>{projectDetails?.owner?.fullName}</Badge>
              </div>

              <section>
                <p className='py-5 border-b text-lg -tracking-wider'>Tasks</p>
                <div className='lg:flex md:flex gap-3 justify-between py-5'>
                  <IssueList status="pending" title="To do list" />
                  <IssueList status="in_progress" title="In progress" />
                  <IssueList status="done" title="Done" />
                </div>
              </section>
            </div>

            <div className='lg:w-[30%] rounded-md sticky right-5 top-10'>
              {/* RIGHT SIDE CONTENT */}
            </div>
          </div>
        </div>
      </>
  )
}

export default ProjectDetails