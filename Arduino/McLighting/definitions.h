// Neopixel
#define LED_PIN 14       // LED_PIN (14 / D5) where neopixel / WS2811 strip is attached
#define NUMLEDS 60       // Number of leds in the strip
#define BUILTIN_LED 2    // ESP-12F has the built in LED on GPIO2, see https://github.com/esp8266/Arduino/issues/2192
#define BUTTON 4         // Input pin (4 / D2) for switching the LED strip on / off, connect this PIN to ground to trigger button.

#define HOSTNAME "bureau"   // Friendly hostname


//#define ENABLE_BUTTON        // If defined, enable button handling code, see: https://github.com/toblum/McLighting/wiki/Button-control
#define USE_HTML_MIN_GZ             //comment for using index.htm & edit.htm from SPIFFs instead of PROGMEM
#define CUSTOM_WS2812FX_ANIMATIONS  //uncomment and put animations in "custom_ws2812fx_animations.h" 

//#define WIFIMGR_PORTAL_TIMEOUT 180
//#define WIFIMGR_SET_MANUAL_IP

#ifdef WIFIMGR_SET_MANUAL_IP
uint8_t _ip[4] = {192, 168, 172, 4};
uint8_t _gw[4] = {192, 168, 172, 1};
uint8_t _sn[4] = {255, 255, 255, 0};
#endif

// parameters for automatically cycling favorite patterns
uint32_t autoParams[][4] = {  // color, speed, mode, duration (milliseconds)
  {0xff0000, 200,  1,  5000}, // blink red for 5 seconds
  {0x00ff00, 200,  3, 10000}, // wipe green for 10 seconds
  {0x0000ff, 200, 14,  5000}, // dual scan blue for 5 seconds
  {0x0000ff, 200, 45, 15000}  // fireworks for 15 seconds
};


// ***************************************************************************
// Global variables / definitions
// ***************************************************************************
#define DBG_OUTPUT_PORT Serial  // Set debug output port

// List of all color modes

enum MODE { SET_MODE, HOLD, OFF, SETCOLOR, SETSPEED, BRIGHTNESS, CUSTOM };
MODE mode = SET_MODE;        // Standard mode that is active when software starts

MODE prevmode = mode;

int ws2812fx_speed = 196;   // Global variable for storing the delay between color changes --> smaller == faster
int brightness = 196;       // Global variable for storing the brightness (255 == 100%)

int ws2812fx_mode = 0;      // Helper variable to set WS2812FX modes

bool shouldSaveConfig = false;  // For WiFiManger custom config

struct ledstate             // Data structure to store a state of a single led
{
  uint8_t red;
  uint8_t green;
  uint8_t blue;
};

typedef struct ledstate LEDState;     // Define the datatype LEDState
LEDState ledstates[NUMLEDS];          // Get an array of led states to store the state of the whole strip
LEDState main_color = { 255, 0, 0 };  // Store the "main color" of the strip used in single color modes

#define ENABLE_STATE_SAVE_SPIFFS        // If defined, saves state on SPIFFS
//#define ENABLE_STATE_SAVE_EEPROM        // If defined, save state on reboot
#ifdef ENABLE_STATE_SAVE_EEPROM
char current_state[32];               // Keeps the current state representation
char last_state[32];                  // Save the last state as string representation
unsigned long time_statechange = 0;   // Time when the state last changed
int timeout_statechange_save = 5000;  // Timeout in ms to wait before state is saved
bool state_save_requested = false;    // State has to be saved after timeout
#endif
#ifdef ENABLE_STATE_SAVE_SPIFFS
bool updateStateFS = false;
#endif

// Button handling
#ifdef ENABLE_BUTTON
#define BTN_MODE_SHORT "STA| 1|  0|245|196|255|255|255"   // Static white
#define BTN_MODE_MEDIUM "STA| 1| 48|245|196|255|102|  0"    // Fire flicker
#define BTN_MODE_LONG "STA| 1| 46|253|196|255|102|  0"  // Fireworks random

unsigned long keyPrevMillis = 0;
const unsigned long keySampleIntervalMs = 25;
byte longKeyPressCountMax = 80;       // 80 * 25 = 2000 ms
byte mediumKeyPressCountMin = 20;     // 20 * 25 = 500 ms
byte KeyPressCount = 0;
byte prevKeyState = HIGH;             // button is active low
boolean buttonState = false;
#endif
