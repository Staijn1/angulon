SocketIOclient socketIO;

void setupWebsocketClient() {
  int port =  preferences.getInt("serverport");
  Serial.print("[WSc SETUP] Connecting to server with IP: ");
  Serial.println(preferences.getString("serverip") + ":" + port);
  // Start connection
  socketIO.begin(preferences.getString("serverip"), port, "/socket.io/?EIO=4");
  // event handler
  socketIO.onEvent(webSocketClientEvent);

  // try ever 5000 again if connection has failed
  socketIO.setReconnectInterval(5000);
}

void runWebsocketClient() {
  socketIO.loop();
}


void webSocketClientEvent(socketIOmessageType_t type, uint8_t * payload, size_t length) {
  switch (type) {
    case sIOtype_DISCONNECT:
      Serial.printf("[WSc] Disconnected from server!\n");
      break;
    case sIOtype_CONNECT:
      Serial.printf("[WSc]Connected to url: %s\n", payload);
      socketIO.send(sIOtype_CONNECT, "/");
      break;
    case sIOtype_EVENT: {
        Serial.printf("[WSc] Got text from server: %s\n", payload);
        checkpayloadclient(payload, length);
        break;
      }
    case sIOtype_ERROR:
      Serial.printf("[WSc] Error occured: %s", payload);
      break;
    case sIOtype_ACK:
    case sIOtype_BINARY_EVENT:
    case sIOtype_BINARY_ACK:
      Serial.printf("[WSc] Unhandled event on websocket: " + type);
  }
}

void checkpayloadclient(uint8_t* payload, size_t inputLength) {
  StaticJsonDocument<64> doc;

  DeserializationError error = deserializeJson(doc, payload);

  if (error) {
    Serial.print("deserializeJson() failed: ");
    Serial.println(error.c_str());
    return;
  }

  const char* event = doc[0]; // The first element holds the code corrosponding to the action (set color, mode, fft etc)
  // # ==> Set main color
  if (*event == '#') {
    uint32_t rgb = doc[1]; // "#ff00ff"
    handleSetMainColor(rgb);
    Serial.printf("Set main color to: R: [%u] G: [%u] B: [%u]\n",  main_color.red, main_color.green, main_color.blue);
    return;

  }

  // ? ==> Set speed
  if (*event == '?') {
    ws2812fx_speed = constrain(doc[1], 0, 255);
    updateSpeed();

    Serial.printf("Set speed to: [%u]\n", ws2812fx_speed);
    return;
  }

  // % ==> Set brightness
  if (*event == '%') {
    ws2812fx_brightness = constrain(doc[1], 0, 255);
    updateBrightness();

    Serial.printf("WS: Set brightness to: [%u]\n", ws2812fx_brightness);
    return;
  }

  // / ==> Set WS2812 mode.
  if (*event == '/') {
    ws2812fx_mode = constrain(doc[1], 0, strip->getModeCount() - 1);
    updateMode();
    Serial.printf("Set WS2812 mode: [%s]\n", payload);
    return;
  }

  // . ==> (CUSTOM) Set FFT value, to display in music mode
  if (*event == '.') {
    fftValue = constrain(doc[1], 0, 255);
    return;
  }

  Serial.print("[WSc] Command not found: ");
  Serial.println((char*)payload);
}
/*void checkpayloadserver(uint8_t* payload, uint8_t num = 0) {
  bool recognizedCommand = checkpayloadclient(payload);

  // $ ==> Get status Info.
  if (payload[0] == '$') {
    String json = listStatusJSON();
    //    webSocketClient.sendTXT(num, "OK");
    //    webSocketClient.sendTXT(num, json);
    Serial.println("Get status info: " + json);
    return;
  }

  // ~ ==> Get WS2812 modes.
  if (payload[0] == '~') {
    String json = listModesJSON();

    Serial.print("WS: ");
    //    webSocketClient.sendTXT(num, "OK");
    //    webSocketClient.sendTXT(num, json);
    Serial.println("Get WS2812 modes.");
    Serial.println(json);
    return;
  }

  if (!recognizedCommand) {
    //    webSocketClient.sendTXT(num, "COMMAND NOT FOUND");
  }
  }*/