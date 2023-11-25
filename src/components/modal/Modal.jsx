/* eslint-disable react/prop-types */
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import myContext from '../../context/data/myContext';


export default function Modal({totalPay , inCart}) {
    let [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState("")
    const [email, setemail] = useState("")
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [showStripe, setShowStripe] = useState(false)
    const inputElement = useRef();


    const context = useContext(myContext)
    const { inCartPage , setinCartPage } = context;

    function closeModal() {
        setName('')
        setemail('')
        setAddress('')
        setPincode('')
        setPhoneNumber('')
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const onToken = async (token)=>{
        
        const addressInfo = {
            name,
            email,
            address,
            pincode,
            phoneNumber,
            date: new Date().toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            )
          }
       
        const paymentId = token.id

        const orderInfo = {
            inCart,
            addressInfo,
            date: new Date().toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            ),
            email: JSON.parse(localStorage.getItem("user")).user.email,
            userid: JSON.parse(localStorage.getItem("user")).user.uid,
            paymentId
          }
          try {
            const result =  addDoc(collection(fireDB, "orders"), orderInfo)
            console.log(result);
          } catch (error) {
            console.log(error)
          }
          localStorage.removeItem('cart');
          setinCartPage(!inCartPage);
          toast.success('Payment Successful')
         
          
        console.log(addressInfo , paymentId  )
      }

      const openStripe= ()=>{

        if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
            return toast.error("All fields are required", {
              position: "top-center",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            })
          }else{
            setShowStripe(!showStripe);
          }

        
     
      }
      useEffect(() => {
        if (showStripe && inputElement.current) {
            inputElement.current.click();
        }
      }, [showStripe]);
    return (
        <>
            <div className="  text-center rounded-lg text-white font-bold">
                <button
                    type="button"
                    onClick={openModal}
                    className="w-full  bg-violet-600 py-2 text-center rounded-lg text-white font-bold bg-green-600"
                >
                    Buy Now
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-2  text-left align-middle shadow-xl transition-all bg-gray-50">

                                    <section className="">
                                        <div className="flex flex-col items-center justify-center py-8 mx-auto  lg:py-0">
                                          
                                            <div className="w-full  rounded-lg md:mt-0 sm:max-w-md xl:p-0 ">
                                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

                                                    <form className="space-y-4 md:space-y-6" action="#">
                                                        <div>
                                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Enter Full Name</label>
                                                            <input  type="name" name="name" id="name" value={name} onChange={e=>setName(e.target.value)} className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Enter Email Address</label>
                                                            <input  type="email" name="email" id="email" value={email} onChange={e=>setemail(e.target.value)} className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Enter Full Address</label>
                                                            <input type="text" name="address" id="address" value={address} onChange={e=>setAddress(e.target.value)} className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-900">Enter Pincode</label>
                                                            <input type="text" name="pincode" id="pincode" value={pincode} onChange={e=>setPincode(e.target.value)} className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-gray-900">Enter Mobile Number</label>
                                                            <input type="text" name="mobileNumber" id="mobileNumber" value={phoneNumber} onChange={e=>setPhoneNumber(e.target.value)} className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
                                                        </div>

                                                    </form>
                                              
                                              {showStripe && <StripeCheckout
                                                name="E-Bangladesh" 
                                                description="A Ecommerce website" 
                                                image="https://bangladeshpost.net/webroot/uploads/featureimage/2021-11/61814f2d78ae5.jpg" 
                                                ComponentClass="div"
                                                panelLabel="Pay" 
                                                amount={totalPay * 100} 
                                                currency="BDT"
                                                locale="en"
                                                email={email}
                                                closed={closeModal}                                                  
                                                opened={openStripe}                                                  
                                                token={onToken}
                                                stripeKey="pk_test_51IdwZlIdMy8IpjTNGyH3A8efiqZK178nJ2D8Q5xL72GaepghPoox7IA78MbBqt3TgR7JLbb09V6pjHCZSOxgfPWr00qdqQ1Yvm"
                                                >
                                                    <button ref={inputElement}></button>
                                                </StripeCheckout>
                                              }
                                               <button onClick={openStripe} type="button" className="focus:outline-none w-full text-white bg-violet-600 bg-green-600 hover:bg-violet-800  outline-0 font-medium rounded-lg text-sm px-5 py-2.5 ">Order Now</button>
                                                        
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}