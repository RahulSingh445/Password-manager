import React, { useEffect } from 'react'
import { use } from 'react'
import { useRef, useState } from 'react'

const Manager = () => {
    const ref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem('passwords')
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const showPassword = () => {
        alert("show pass")
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
        }
        else {
            ref.current.src = "icons/eyecross.png"
        }
    }

    const savePassword = () => {
        setpasswordArray([...passwordArray, form])
        localStorage.setItem("password", JSON.stringify([...passwordArray, form]))
        console.log(([...passwordArray, form]))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }





    return (
        <>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

            <div className='container mx-auto  max-w-4xl py-7 '>

                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-purple-900'>&lt;</span>
                    <span>Pass</span><span className='text-purple-900'> Manager/&gt;</span>
                </h1>
                <p className='text-lg text-purple-900 text-center'>Your own password manager</p>

                <div className='text-black flex flex-col p-4 gap-8 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' type="text" name='site' className='rounded-full border border-purple-900 w-full p-4 py-1' />

                    <div className="flex w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter uesrname' type="text" name='username' className='rounded-full border border-purple-900 w-full p-4 py-1' />

                        <div className="relative">
                            <input value={form.password} onChange={handleChange} placeholder='Enter password' type="text" name='password' className='rounded-full border border-purple-900 w-full p-4 py-1' />
                            <span className='absolute right-1 top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={28} src="icons/eye.png" alt="" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center font-bold gap-1 items-center rounded-full bg-purple-600 py-2 px-4 w-fit hover:bg-purple-500'>
                        <lord-icon
                            src="https://cdn.lordicon.com/gzqofmcx.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Add Password</button>
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
                            </tr>
                        </thead>
                        <tbody className='bg-linear-to-r from-blue-100 to-purple-200'>
                            {passwordArray.map((item,index)=>{
                                return<tr key={index}>
                                <td className='py-2 border border-white text-center w-32'><a href={item.site} target='_blank'>{item.site}</a></td>
                                <td className='py-2 border border-white text-center w-32'>{item.username}</td>
                                <td className='py-2 border border-white text-center w-32'>{item.password}</td>
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
