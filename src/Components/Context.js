import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from 'next/router'
import { auth, db } from '../Firebase/firebaseConfig'

export const NavContext = createContext()
export const AnimationContext = createContext()
export const AuthContext = createContext()
export const SectionsContext = createContext()
function Context({ children }) {

    const [page, setPage] = useState("Home")
    const [user, setUser] = useState(false)
    const [sections, setSections] = useState([])

    const router = useRouter()

    // Get Page Sections 
    useEffect(() => {

        console.log('here')
        const colRef = collection(db, page);
        const docSnap = getDocs(colRef)
        docSnap.then((snapshot) => {
            console.log({ snapshot })
            let home = []
            snapshot.docs.forEach((doc) => (
                home.push(doc.id)
            ))
            setSections([...home])
            console.log([...home])
        })
            .catch((error) => {
                console.log("came here 2")
                console.log(error)
            });
    }, [page])


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

    const signIn = (email, password, cb) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user)
                alert("You are signed in")
                cb()
                router.push('/')
            })
            .catch((error) => {
                alert(error.code)
                cb()
            })
    }

    const logOut = () => {
        signOut(auth).then(() => {
            setUser(null)
            router.push('/')
        }).catch((error) => (
            alert(error.message)
        ))
    }

    return (
        <AuthContext.Provider value={{ user, signIn, logOut }}>
            <NavContext.Provider value={[page, setPage]} >
                <AnimationContext.Provider value={{ textAnimate, imageAnimate }}>
                    <SectionsContext.Provider value={[sections, setSections]}>
                        {children}
                    </SectionsContext.Provider>
                </AnimationContext.Provider>
            </NavContext.Provider>
        </AuthContext.Provider>
    )
}

export default Context