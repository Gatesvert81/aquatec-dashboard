import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from 'next/router'
import { auth, db } from '../Firebase/firebaseConfig'
import { getUserCookie, removeUserCookie, setUserCookie } from '../Firebase/setUserCookie'

export const NavContext = createContext()
export const AnimationContext = createContext()
export const AuthContext = createContext()
export const SectionsContext = createContext()
export const NotificationContext = createContext()
function Context({ children }) {

    const [page, setPage] = useState("Home")
    const [user, setUser] = useState(false)
    const [sections, setSections] = useState([])

    const router = useRouter()

    // Notifications

    const notify = (type, message, options) => {
        toast[type](message, {
            position: toast.POSITION.TOP_CENTER,
            ...options
        });
    };


    // Get Page Sections 
    useEffect(() => {
        if (user) {
            // const id = toast.loading("Please wait...", {
            //     autoClose: 3000
            // })
            const colRef = collection(db, page);
            const docSnap = getDocs(colRef)
            docSnap.then((snapshot) => {
                let home = []
                snapshot.docs.forEach((doc) => (
                    home.push(doc.id)
                ))
                setSections([...home])
                // toast.update(id, { 
                //     render: "Successfully Retrieved Sections", 
                //     type: "success", 
                //     isLoading: false,
                //     autoClose: 1500 
                // })
            })
                .catch((error) => {
                    // toast.update(id, {
                    //     render: error.message,
                    //     type: "error",
                    //     isLoading: false,
                    //     autoClose: 1500
                    // })
                });
        }
    }, [page, user])



    // Animation 
    const textAnimate = {
        initial: { opacity: 0, y: "8%" },
        whileInView: { opacity: 1, y: "0%" },
        transition: {
            default: {
                duration: 0.5
            }
        }
    }


    const imageAnimate = {
        initial: {
            opacity: 0,
            scale: 1.1
        },
        whileInView: {
            opacity: 1,
            scale: 1
        },
        transition: {
            default: {
                duration: 0.5
            }
        },
        whileHover: {
            scale: 1.05
        }
    }

    // Firebase Authentication 

    useEffect(() => {
        const cookie = getUserCookie()
        if (cookie) {
            setUser(cookie)
            notify('success', "Succesfully signed in")
        }
    }, [])

    const signIn = (email, password, cb) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user)
                setUserCookie(userCredential.user)
                notify("success", "Succesfully signed in")
                cb()
                router.push('/')
            })
            .catch((error) => {
                notify("error", error.message)
                cb()
            })
    }

    const logOut = () => {
        signOut(auth).then(() => {
            setUser(null)
            removeUserCookie()
            notify("success", "Succesfully logged out")
            router.push('/')
        }).catch((error) => (
            notify("error", error.message)
        ))
    }

    return (
        <AuthContext.Provider value={{ user, signIn, logOut }}>
            <NavContext.Provider value={[page, setPage]} >
                <AnimationContext.Provider value={{ textAnimate, imageAnimate }}>
                    <SectionsContext.Provider value={[sections, setSections]}>
                        <NotificationContext.Provider value={{ notify }}>
                            <ToastContainer
                                position="top-right"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick={true}
                                rtl={false}
                                transition={Slide}
                                pauseOnFocusLoss
                                draggable
                                limit={2}
                            />
                            {children}
                            {/* </ToastContainer> */}
                        </NotificationContext.Provider>
                    </SectionsContext.Provider>
                </AnimationContext.Provider>
            </NavContext.Provider>
        </AuthContext.Provider>
    )
}

export default Context