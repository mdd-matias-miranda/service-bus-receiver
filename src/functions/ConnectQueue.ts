import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getServiceBusQueueReceiver, getServiceBusQueueSender } from "../ServiceBusClient";

// receive from a queue
const queueReceiver = getServiceBusQueueReceiver();
console.log(queueReceiver);

// Subscribe to messages of the queue
app.serviceBusQueue('serviceBusTopicTrigger1', {
    connection:  'SERVICE_BUS_CONNECTION_STRING',
    queueName:  'mdd-bus-queue',
    handler: (message, context) => {
    context.log('Service bus topic function processed message:', message);
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
