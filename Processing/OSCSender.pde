import oscP5.*;
import netP5.*;

OscP5 oscP5Sender;
NetAddress destination;

int currentState = 0;

void sendOsc(int[] data) {
  OscMessage message = new OscMessage("/wek/inputs");
  for (int i = 0; i < data.length; i++) {
    message.add(float(data[i]));
  }
  oscP5Sender.send(message, destination);
}
