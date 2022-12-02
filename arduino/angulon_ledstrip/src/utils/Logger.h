//
// Created by stein on 2-12-2022.
//

#ifndef ANGULON_LEDSTRIP_LOGGER_H
#define ANGULON_LEDSTRIP_LOGGER_H


class Logger {
public:
    static void setup();
    static void log(const char className[], const char message[]);
    static void log(const char className[], const String& message);
};


#endif //ANGULON_LEDSTRIP_LOGGER_H
