//
// Created by stein on 6-12-2022.
//

#ifndef ANGULON_LEDSTRIP_LEDSTRIP_H
#define ANGULON_LEDSTRIP_LEDSTRIP_H


#include "../../../.pio/libdeps/esp32dev/WS2812FX/src/WS2812FX.h"
#include "connections/configuration/ConfigurationManager.h"

class Ledstrip {
private:
    ConfigurationManager configurationManager;
    WS2812FX *strip;
    String colorsHexString[3] = {"#ff0000", "#00ff00", "#0000ff"};

    int brightness = 200;

    uint32_t hexStringToInt(const char* color);
public:
    void setup();

    void run();

    void setColors(int segment, uint32_t colors[3]);

    void setColors(int segment, const char *color_0, const char *color_1, const char *color_2);

    String *getColorsHexString();

    uint8_t getMode();

    String getModeName(uint8_t mode);

    int getBrightness();

    int getSpeed();

    void setMode(int mode);

    void setSpeed(int speed);

    void setBrightness(int brightness);
};


#endif //ANGULON_LEDSTRIP_LEDSTRIP_H
