
// unused code
import {redisClient} from '../utils/redis/redis';


function rateLimiter({secondsWindow, allowedCount}) {
    return async function rateLimiter(req, res, next) {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress.slice(0,9);
        console.log(ip.slice(0,9));
        let ttl;

        const requestCounts = await redisClient.inc(ip)
        if(requestCounts === 1) {
            await redisClient.expire(ip, secondsWindow)
            ttl = secondsWindow
        } else {
            ttl = await redisClient.ttl(ip)
        }
    
    
    
        if (requestCounts > allowedCount) {
            return res.status(503).json({
                success: false,
                message: 'Too many requests',
                callsInAMinute: requestCounts,
                ttl,
            });
        } else {
            req.requestCounts = requestCounts;
            req.ttl = ttl;
            next();
        }
    
    }
}


export default rateLimiter;
