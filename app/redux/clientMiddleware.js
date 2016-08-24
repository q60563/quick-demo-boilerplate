import ioClient from '../helpers/ioClient';

const GETDEVS = 'app/cardBlock/GETDEVS';
const WRITE = 'app/cardBlock/WRITE';

const clientMiddleware = store => next => action => {
    switch (action.type) {
        case GETDEVS:
            ioClient.sendReq('getDevs', {}, function (status, data) {
                if (status === 1) 
                    action.data = data;

                next(action);
            });
            break;

        case WRITE:
            ioClient.sendReq('write', { permAddr: action.permAddr, auxId: action.auxId, value: action.value }, function (status, data) {

                next(action);
            });
            break;

        default:
            next(action);
            break;
    }
};

export default clientMiddleware;