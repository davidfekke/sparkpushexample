// constants won't change. They're used here to 
// set pin numbers:
int buttonPin = D2;     // the number of the pushbutton pin
int ledPin =  D1;      // the number of the LED pin

// Variables will change:
boolean lastButton = LOW;
boolean ledOn = false;

void setup()
{
  pinMode(buttonPin, INPUT);
  pinMode(ledPin, OUTPUT);
}

void loop()
{
  if (digitalRead(buttonPin) == HIGH && lastButton == LOW)
  {
    ledOn = !ledOn;
    lastButton = HIGH;
    if (ledOn == true) {
	    Spark.publish("apns");
	} 
  }
  else
  {
    //lastButton = LOW;
    lastButton = digitalRead(buttonPin);
  }
  
  digitalWrite(ledPin, ledOn);
  delay(1000);

}
