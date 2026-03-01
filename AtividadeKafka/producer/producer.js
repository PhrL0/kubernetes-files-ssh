const { Kafka } = require('kafkajs');
const express = require('express')

const kafka = new Kafka({
    clientId: 'my-nodejs-app',
    brokers: ['kafka-service:9092'] //<--- Trocar pelo SERVICE no producer  e consumer e subir o pod do consumer, eles vao falar internamente com o cluster Kafka.
});

const producer = kafka.producer();
const app = express()
const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sendMessageKafka = async (userMessage) => {
    try {
        await producer.connect();
        await producer.send({
            topic: 'test-topic',
            messages: [{ value: userMessage }]
        });
    } catch (error) {
        console.error(error);
    }
};

app.get('/health', (req, res) => {
  res.send('Hello World!')
})

app.post('/send-message-kafka', (req, res)=>{
    const response = req.body
    console.log(response)
    sendMessageKafka(JSON.stringify(response));
    res.send({
        message: 'Mensagem enviada com sucesso!'
    });
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
