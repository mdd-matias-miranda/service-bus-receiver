import { ServiceBusClient, ServiceBusReceiver, ServiceBusSender } from "@azure/service-bus"


let serviceBusClient: ServiceBusClient;
let serviceBusQueueSender: ServiceBusSender;
let serviceBusQueueReceiver: ServiceBusReceiver;
let serviceBusTopicSender: ServiceBusSender;
let serviceBusTopicReceiver: ServiceBusReceiver;

export function getServiceBusClient(): ServiceBusClient {
    if (!serviceBusClient) {
        const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING;
        serviceBusClient = new ServiceBusClient(connectionString, { 
            // same as in .net with TransportType = ServiceBusTransportType.AmqpWebSockets for ServiceBusClientOptions,
            // in javascript we have to add websocketOptions of ServiceBusClientOptions 
            webSocketOptions: {
              webSocket: require("ws"),
            }
          });
    }
    return serviceBusClient;
}

export function getServiceBusQueueSender(): ServiceBusSender {
    if (!serviceBusQueueSender) {
        const client = getServiceBusClient();
        const queueName = process.env.SERVICE_BUS_QUEUE_NAME;
        serviceBusQueueSender = client.createSender(queueName);
    }
    return serviceBusQueueSender;
}

export function getServiceBusQueueReceiver(): ServiceBusReceiver {
    if (!serviceBusQueueReceiver) {
        const client = getServiceBusClient();
        const queueName = process.env.SERVICE_BUS_QUEUE_NAME;
        serviceBusQueueReceiver = client.createReceiver(queueName);
    }
    return serviceBusQueueReceiver;
}
export function getServiceBusTopicSender(): ServiceBusSender {
    if (!serviceBusTopicSender) {
        const client = getServiceBusClient();
        const topicName = process.env.SERVICE_BUS_TOPIC_NAME;
        serviceBusTopicSender = client.createSender(topicName);
    }
    return serviceBusTopicSender;
}

export function getServiceBusTopicReceiver(): ServiceBusReceiver {
    if (!serviceBusTopicReceiver) {
        const topicName = process.env.SERVICE_BUS_TOPIC_NAME;
        const subscriptionName = process.env.SERVICE_BUS_SUBSCRIPTION_NAME;
        const client = getServiceBusClient();
        serviceBusTopicReceiver = client.createReceiver(topicName, subscriptionName);
    }
    return serviceBusTopicReceiver;
}