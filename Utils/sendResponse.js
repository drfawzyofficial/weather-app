const sendResponse = (res, statusCode, msgDev, msgUser, result = 'noResult') => {
    return res.status(statusCode).json({
        statusCode: statusCode,
        msgDev: msgDev,
        msgUser: msgUser,
        result: result
    })
}

module.exports = sendResponse;
