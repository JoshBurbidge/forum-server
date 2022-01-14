

export function getUserIdCookie(ctx) {
    const req = ctx.req;
    if (!req.cookies.userId) return null;
    return "userId=" + req.cookies.userId;
}