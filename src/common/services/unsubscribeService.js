import {validateEmail} from '../utils/emailUtils'
import {postApi} from '../middlewares/postAPI'

export class UnsubscribeService {
    // TODO: replace with proper path of the backend.
    static basePath = 'https://jsonplaceholder.typicode.com/posts';

    // method to unsubscribe with email as input parameter.
    static unsubscribeWithEmail = (email) => {
        // Check if email id is a valid regex.
        if (!validateEmail(email)) {
            return Promise.reject({reason: 'in-valid email id'});
        } else {
            // make an api call to unsubscribe.
            return (postApi(UnsubscribeService.createPostMethodRequest(email)));
        }
    }

    // to create postApi request payload.
    static createPostMethodRequest = (email) => {
        return {
            endpoint: UnsubscribeService.basePath,
            payload: UnsubscribeService.createUnsubscribePayload(email),
            payloadAsIs: true,
            skipCsrfToken: true,
        }
    }
    // TODO: replace bottom payload with required payload.
    static createUnsubscribePayload = (email) => {
        return {
            email,
            unsubscribe: 'true',
        }
    }


    
}