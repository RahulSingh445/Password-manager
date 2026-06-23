import React, { useEffect } from 'react'
import { use } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")

        let passwords = await req.json()

        setpasswordArray(passwords)

    }


    useEffect(() => {
        getPasswords()
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "password"

        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "text"

        }
    }

    const savePassword = async () => {
        if (form.site.length > 1 && form.username.length > 1 && form.password.length > 1) {
            await fetch("http://localhost:3000/", {
                method: "DELETE", headers: { "Content-type": "application/json" },
                body: JSON.stringify({ id: form.id })
            })


            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            // localStorage.setItem("password", JSON.stringify([...passwordArray,{...form, id: uuidv4()}]))
            // console.log(([...passwordArray, form]))
            await fetch("http://localhost:3000/", {
                method: "POST", headers: { "Content-type": "application/json" },
                body: JSON.stringify({ ...form, id: uuidv4() })
            })
            setform({ site: "", username: "", password: "" })
            toast('Password saved', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
        else {
            toast('Password not saved', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }

    }
    const deletePassword = async (id) => {
        console.log(id)
        let c = confirm("Do you want to delete this password")
        if (c) {

            setpasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)))

            let res = await fetch("http://localhost:3000/", {
                method: "DELETE", headers: { "Content-type": "application/json" },
                body: JSON.stringify({ id })
            })

            toast('Password Deleted', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }
    const editPassword = (id) => {
        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setpasswordArray(passwordArray.filter(i => i.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }





    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

            <div className='container p-2 md:px-0 mx-auto  max-w-4xl py-7 '>

                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-purple-900'>&lt;</span>
                    <span>Pass</span><span className='text-purple-900'> Manager/&gt;</span>
                </h1>
                <p className='text-lg text-purple-900 text-center'>Your own password manager</p>

                <div className='text-black flex flex-col p-4 gap-8 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' type="text" name='site' className='rounded-full border border-purple-900 w-full p-4 py-1' />

                    <div className="flex flex-col md:flex-row  w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter uesrname' type="text" name='username' className='rounded-full border border-purple-900 w-full p-4 py-1' />

                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter password' type="password" name='password' className='rounded-full border border-purple-900 w-full p-4 py-1' />
                            <span className='absolute right-1 top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={28} src="icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center text-white font-bold gap-1 items-center rounded-full bg-purple-600 py-2 px-4 w-fit hover:bg-purple-500'>
                        <lord-icon
                            src="https://cdn.lordicon.com/gzqofmcx.json"
                            trigger="hover"

                        >
                        </lord-icon>
                        Save</button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your passwords</h2>
                    {passwordArray.length === 0 && <div>No password to show</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className='bg-linear-to-r from-blue-400 to-purple-600'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody className='bg-linear-to-r from-blue-100 to-purple-200'>
                                {passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className=' py-2 border border-white text-center '>
                                            <div className='flex justify-center items-center'>
                                                <a href={item.site} target='_blank'>{item.site}</a>
                                                <div className='size-5 cursor-pointer ' onClick={() => { copyText(item.site) }}>
                                                    <span className="material-symbols-outlined">
                                                        content_copy
                                                    </span>
                                                </div>
                                            </div>

                                        </td>
                                        <td className=' py-2 border border-white text-center  '>
                                            <div className='flex justify-center items-center'>
                                                {item.username}
                                                <div className='size-5 cursor-pointer ' onClick={() => { copyText(item.username) }}>
                                                    <span className="material-symbols-outlined">
                                                        content_copy
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className=' py-2 border border-white text-center '>
                                            <div className='flex justify-center items-center'>
                                                {item.password}
                                                <div className='size-5 cursor-pointer ' onClick={() => { copyText(item.password) }}>
                                                    <span className="material-symbols-outlined">
                                                        content_copy
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='  py-2 border border-white text-center '>
                                            <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/vwzukuhn.json"
                                                    trigger="hover">

                                                </lord-icon></span>
                                            <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/egqwwrlq.json"
                                                    trigger="hover">

                                                </lord-icon></span>
                                        </td>
                                    </tr>
                                })}


                            </tbody>
                        </table>}
                </div>
            </div>
            
        </>
    )
}


export default Manager
