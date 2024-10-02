import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";


const publicRoutes = ['/login']

export default async function middleware(req: NextRequest) {
    // NextResponse.redirect('/')
    // console.log(cookies().get('token'));

    const token = cookies().get('accessToken');
    const path = req.nextUrl.pathname

    const pathIsPublic = publicRoutes.includes(path)

    if (pathIsPublic && token) {
        return NextResponse.redirect(new URL('/', req.url)) 
    }

    if (!token && !pathIsPublic) {

        return NextResponse.redirect(new URL('/login', req.url))
    }

    

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|image|icon|.png$).*)'],
} 