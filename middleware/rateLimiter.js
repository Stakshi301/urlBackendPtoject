import rateLimit from "express-rate-limit";

const rateLimiter=rateLimit({
    windowMs:10*60*1000,
    max:3,
    message: "Getting too many req from this User/IP address"
})

export{rateLimiter};