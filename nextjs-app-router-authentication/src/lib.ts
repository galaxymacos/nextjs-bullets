import {SignJWT, jwtVerify} from "jose";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

const secretKey = process.env.JWT_SECRET
const key = new TextEncoder().encode(secretKey)

// payload: any is the data that we want to encrypt, whether it is a string, or an object, or an array
export async function encrypt(payload: any) {
    return await new SignJWT(payload).setProtectedHeader({alg: "HS256"}).setIssuedAt().setExpirationTime("10 secs").sign(key)
}

export async function decrypt(input: string): Promise<any> {
    const {payload} = await jwtVerify(input, key, {algorithms: ['HS256']})
    return payload
}

export async function login(formData: FormData) {
    // Verify credentials && get the user
    const user = { email: formData.get('email') as string, name: "Lee"}

    // Create the session
    let expires = new Date(Date.now() + 10 * 1000)
    const session = await encrypt({user, expires})

    // Save the session in a cookie
    cookies().set("session", session, { expires: expires, httpOnly: true})
}

export async function logout() {
    cookies().set('session', '', { expires: new Date(0)})
}

export async function getSession() {
    const session = cookies().get('session')?.value
    if (!session) return null
    return await decrypt(session)
}

// the function will be called in the middleware
export async function updateSession(request: NextRequest) {
    const session = request.cookies.get('session')?.value
    if (!session) return null

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session)
    parsed.expires = new Date(Date.now() + 10 * 1000)
    const res = NextResponse.next()
    res.cookies.set('session', await encrypt(parsed), { expires: parsed.expires, httpOnly: true})
    return res
}