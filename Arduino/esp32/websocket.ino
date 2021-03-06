WiFiMulti WiFiMulti;
WebSocketsServer webSocket = WebSocketsServer(81);

void handleEvent(uint8_t *payload, size_t length) {
  char* arguments = (char*) payload + 2;

  switch (((char*) payload)[0]) {
    case 'm':
      {
        uint8_t m = (uint8_t)atoi(arguments);

        switch (m) {
          case 55:
            ws2812fx.setSegment(0, 0, NUM_LEDS - 1, vuMeterEffect, ws2812fx.getColor(), 0, NO_OPTIONS);
            break;

          default: break;//Do nothing
        }
        ws2812fx.setMode(m);
        //        Serial.println(ws2812fx.getModeName(ws2812fx.getMode()));
        break;
      }
    case 'c':
      {
        char * strtokIndx; // this is used by strtok() as an index

        strtokIndx = strtok(arguments, ",");     // get the first color
        uint32_t firstColor = (uint32_t)strtoul(strtokIndx, NULL, 16);

        strtokIndx = strtok(NULL, ","); // this continues where the previous call left off, to get second color
        uint32_t secondColor = (uint32_t)strtoul(strtokIndx, NULL, 16);

        strtokIndx = strtok(NULL, ","); //Repeat to get third color
        uint32_t thirdColor = (uint32_t)strtoul(strtokIndx, NULL, 16);

        uint32_t _colors[] = {firstColor, secondColor, thirdColor};
        ws2812fx.setColors(0, _colors);
        break;
      }
    case 'B':
      {
        ws2812fx.increaseBrightness(25);
        break;
      }
    case 'b':
      {
        Serial.println("Received brightness decrease");
        ws2812fx.decreaseBrightness(25);
        break;
      }
    case 'S':
      {
        //        Serial.println("Received speed increase");
        ws2812fx.setSpeed(ws2812fx.getSpeed() * 0.6);
        StaticJsonDocument<capacity>doc;
        doc["speed"] = ws2812fx.getSpeed();
        serializeJson(doc, Serial);
        break;
      }
    case 's':
      {
        //        Serial.println("Received speed decrease");
        ws2812fx.setSpeed(ws2812fx.getSpeed() * 1.4);
        StaticJsonDocument<capacity>doc;
        doc["speed"] = ws2812fx.getSpeed();
        serializeJson(doc, Serial);
        break;
      }
    case 'v': {
        fftValue = constrain((uint8_t)atoi(arguments), 0, 255);
        break;
      }
    case 'r': {
        fftValue = constrain((uint8_t)atoi(arguments), 0, 255);
        break;
      }
    default:
      Serial.print("Unknown name: "); Serial.println(((char*) payload)[0]);
  }
}


void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length)
{
  switch (type) {
    case WStype_DISCONNECTED:
      setDefaultLedstripValues();
      Serial.printf("[%u] Disconnected!\r\n", num);
      break;
    case WStype_CONNECTED:
      {
        setDefaultLedstripValues();
        Serial.println("Someone connected");
      }
      break;
    case WStype_TEXT:
      handleEvent(payload, length);
      //Send payload to all connected clients
      //webSocket.broadcastTXT(payload, length);
      break;
    case WStype_ERROR:
        Serial.println("Error");
        webSocket.broadcastTXT(payload, length);
      break;
    case WStype_FRAGMENT_TEXT_START:
      break;
    case WStype_FRAGMENT_BIN_START:
      break;
    case WStype_FRAGMENT:
      break;
    case WStype_FRAGMENT_FIN:
      break;
    default:
      Serial.printf("Invalid WStype [%d]\r\n", type);
      break;
  }
}

void websocketSetup() {

  Serial.println();
  Serial.println();
  Serial.println();

  for (uint8_t t = 4; t > 0; t--) {
    Serial.printf("[SETUP] BOOT WAIT %d...\n", t);
    Serial.flush();
    blinkLed(1000);
  }

  WiFiMulti.addAP(ssid, password);
  yield();
  while (WiFiMulti.run() != WL_CONNECTED) {
    Serial.print(".");
    delay(100);
  }

  Serial.println();
  Serial.print("Connect to ws://"); Serial.print(WiFi.localIP()); Serial.println(":81");

  webSocket.begin();
  webSocket.onEvent(webSocketEvent);
}

void websocketRun() {
  webSocket.loop();
}
