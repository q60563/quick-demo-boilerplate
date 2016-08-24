import ioClient from '../helpers/ioClient';

const clientMiddleware = store => next => action => {
    switch (action.type) {
        case GETDEVS:
            ioClient.sendReq('getDevs', {}, function (status, data) {
                if (status === 1) 
                    action.data = data;
            });
            break;
        default:
            break;
    }
};

export default clientMiddleware;