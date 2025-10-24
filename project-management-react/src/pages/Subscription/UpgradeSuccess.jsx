//
// import {Card} from "@/components/ui/card.jsx";
// import {CheckCircledIcon} from "@radix-ui/react-icons";
// import {Button} from "@/components/ui/button.jsx";
// import {useNavigate} from "react-router-dom";
// import {useSelector} from "react-redux";
// const UpgradeSuccess=()=>{
//     const navigate=useNavigate();
//     const  queryParams= new URLSearchParams(location.search);
//     const paymentId=queryParams.get("payment_id");
//     const planType=queryParams.get("planType");
//     return(
//         <div className='flex justify-center'>
//             <Card className="mt-20 p-5 space-y-5 flex flex-col items-center">
//                 <div className='flex items-center gap-4'>
//                     <CheckCircledIcon className='h-9 w-9 text-green-500'>
//                         <p className='text-xl'>Plan Upgraded SuccessFully</p>
//                     </CheckCircledIcon>
//
//                 </div>
//                 <div className='space-y-3'>
//                     <p className='text-green-500'>State date : </p>
//                     <p className='text-red-500'>end date : </p>
//                     <p className='text-red-500'>plan type : </p>
//
//                 </div>
//                 <Button onClick={()=>navigate("/")}>Go to home</Button>
//
//             </Card>
//
//         </div>
//     )
// }
// export default UpgradeSuccess;