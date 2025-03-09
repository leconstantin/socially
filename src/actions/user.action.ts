"use server"

import { auth, currentUser } from "@clerk/nextjs/server"

export async function syncUser(){
try {
    const {userId} = await auth()
    const user = await currentUser()
    if(!userId || user) return
} catch (error) {
    
}
}