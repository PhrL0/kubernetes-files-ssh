const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'my-nodejs-app',
    brokers: ['kafka-service:9092']
})

const consumer = kafka.consumer({groupId: 'my-group'});

const consumeMessages = async ()=>{
    
    try {
        
        await consumer.connect();
        console.log("Successfully connected to the broker")
        await consumer.subscribe({ topic: 'test-topic', fromBeginning: true});
        await consumer.run({
            eachMessage: async({topic, partition, message}) => {
                console.log({
                    topic,
                    partition,
                    offset: message.offset,
                    value: message.value.toString(),
                });
            },
        });
    } catch (error) {
        console.error("error on consume message")    
    }
}
consumeMessages()