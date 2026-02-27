const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-nodejs-app',
    brokers: ['localhost:9092']
});

const producer = kafka.producer();

const sendMessage = async ()=>{
    
    try {
        
        await producer.connect();
        console.log("Successfully connected to the broker")
        await producer.send({
            topic: 'test-topic',
            messages: [
                {value: 'Hello Kafka from Node.jsssss!'}
            ]
        })
        console.log("Send message ok!")
    } catch (error) {
        console.error(error)
    } finally {
        await producer.disconnect();
    }
}
sendMessage()