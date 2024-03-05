import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getServiceBusQueueReceiver, getServiceBusQueueSender } from "../ServiceBusClient";

// receive from a queue
const queueReceiver = getServiceBusQueueReceiver();
console.log(queueReceiver);
// Subscribe to messages of the queue
queueReceiver.subscribe({
    processMessage: async (message) => {
        console.log(`Received message: ${message.body}`);

        //call the topic to send it as locked

        // Complete the message to remove it from the queue
        await queueReceiver.completeMessage(message);
    },
    processError: async (err) => {
        console.error("Error occurred:", err);
    }
});

//Send to a queue
export async function sendToQueue(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const queueSender = getServiceBusQueueSender();
    const message = {
        body: request.body
    };
    await queueSender.sendMessages(message)
    return { body: `Hello, ${name}!` };
};

app.http('sendToQueue', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: sendToQueue
});
