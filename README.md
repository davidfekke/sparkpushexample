# Spark Core APNS Push Example
### David Fekke, 2014
#### For the Demo at JSConf 2014

I was at the JSConf this year, and everyone at the conference got a Spark Core. If you are not familiar with [Spark.io](http://spark.io "Spark.io"), they make a micro-controller about the size of the end of your thumb that connects to a WiFi network. They also have a cloud service and an IDE that allows you to communicate with the Spark Core over the internet.

On the hack day, I decided to try to write firmware for the core that would allow you to push a message through Apple's Push Notification Service using a webhook on the Spark cloud and a Node.js application I wrote using the APNS module. 

After creating the webhook, I added a call to the spark firmware using their cloud API. The call to the webhook looks like this example;

```c
Spark.publish("apns"); 
```

In my node app I created a post method that corresponded to the route I used in my webhook. In the case of this example http://exampledomain.com/apns. The route looks like this in the example;

```javascript
app.post('/apns', function(req, res) {
	res.send("sending apns");
	connection = new apns.Connection(options);

	notification = new apns.Notification();
	notification.device = new apns.Device(deviceToken);
	notification.alert = "I just pushed my spark button!";
	notification.sound = "dong.aiff";

	connection.sendNotification(notification);
});
```

