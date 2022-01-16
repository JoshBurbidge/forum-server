import axios from 'axios';
import { getUserIdCookie } from '../../util/cookie';


export default async function handler(req, res) {

    const apiResponse = await axios.post(process.env.NEXT_PUBLIC_serverDomain + '/users/logout', {}, {
        withCredentials: true,
        headers: {
            cookie: getUserIdCookie(req)
        }
    });
    console.log(req.cookies.userId);

    res.setHeader("Set-Cookie", ["userId="]);
    res.redirect("/");
}