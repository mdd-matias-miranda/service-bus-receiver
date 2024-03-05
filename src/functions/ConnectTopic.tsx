import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getServiceBusTopicReceiver, getServiceBusTopicSender } from "../ServiceBusClient";


const topicReceiver = getServiceBusTopicReceiver();
console.log(topicReceiver);

// Subscribe to messages of the topic
topicReceiver.subscribe({
    processMessage: async (message) => {
        console.log(`Received message: ${message.body}`);


        // Complete the message to remove it from the topic
        await topicReceiver.completeMessage(message);
    },
    processError: async (err) => {
        console.error("Error occurred:", err);
    }
});


//This will be used in the other app, but here is how it is done in typescript to send to a topic from a request to /sendToTopic
// export async function sendToTopic(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
//     context.log(`Http function processed request for url "${request.url}"`);
//     const topicSender = getServiceBusTopicSender();
//     const message = {
//         body: request.body
//     };
//     await topicSender.sendMessages(message)
//     return { body: `Hello, ${name}!` };
// };

// app.http('sendToTopic', {
//     methods: ['GET', 'POST'],
//     authLevel: 'anonymous',
//     handler: sendToTopic
// });
