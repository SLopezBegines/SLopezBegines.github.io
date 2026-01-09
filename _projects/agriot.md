---
layout: project
title: "AgrIoT Smart Motor Control"
excerpt: "ESP32-based IoT system for agricultural automation with web interface and remote monitoring"
tags:
  - IoT
  - ESP32
  - Arduino
  - Home Automation
  - PCB Design
  - Web Development
---

# Project Overview

**AgrIoT** is an ESP32/ESP8266-based IoT system designed for agricultural and home automation. The system provides remote control of motors, pumps, and other devices through a web interface, with real-time monitoring of sensors and environmental conditions.

## Key Features

- 🔌 **Relay Control**: Multiple relay outputs for controlling motors, pumps, and appliances
- 📊 **Sensor Monitoring**: Temperature, humidity, soil moisture, and other environmental sensors
- 🌐 **Web Dashboard**: Real-time control and monitoring through web interface
- 📱 **Mobile Friendly**: Responsive design for smartphone access
- 💾 **Data Logging**: Database storage for historical data analysis
- 🔔 **Alerts**: Notification system for critical conditions
- 🔒 **Security**: Authentication and secure connections

---

# System Architecture

## Hardware Components

### Microcontroller Options
- **ESP32**: Main platform (dual-core, WiFi + Bluetooth)
- **ESP8266**: Budget-friendly alternative (WiFi only)

### Input/Output
- Relay modules (2-8 channels)
- DHT22 temperature/humidity sensors
- Soil moisture sensors
- Current sensors (ACS712)
- Water level sensors
- Optional: DS18B20 temperature probes

### Power Supply
- 5V regulated power supply
- Optional battery backup
- Current protection circuits

### Custom PCB
- Designed for robust field deployment
- Screw terminals for easy wiring
- LED status indicators
- Reset and programming buttons

---

# Software Implementation

## ESP32 Firmware (C/C++)

### Main Control Loop

```cpp
#include <WiFi.h>
#include <WebServer.h>
#include <DHT.h>
#include <ArduinoJson.h>

// Pin definitions
#define RELAY1_PIN 23
#define RELAY2_PIN 22
#define RELAY3_PIN 21
#define DHT_PIN 4
#define SOIL_MOISTURE_PIN 34

// Sensor objects
DHT dht(DHT_PIN, DHT22);
WebServer server(80);

// System state
struct SystemState {
  bool relay1;
  bool relay2;
  bool relay3;
  float temperature;
  float humidity;
  int soilMoisture;
  unsigned long lastUpdate;
} state;

void setup() {
  Serial.begin(115200);
  
  // Initialize pins
  pinMode(RELAY1_PIN, OUTPUT);
  pinMode(RELAY2_PIN, OUTPUT);
  pinMode(RELAY3_PIN, OUTPUT);
  pinMode(SOIL_MOISTURE_PIN, INPUT);
  
  // Initialize sensors
  dht.begin();
  
  // Connect to WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected!");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  
  // Setup web server routes
  setupWebServer();
  server.begin();
}

void loop() {
  server.handleClient();
  
  // Update sensor readings every 2 seconds
  if (millis() - state.lastUpdate > 2000) {
    updateSensors();
    state.lastUpdate = millis();
  }
  
  // Check automatic rules
  checkAutomationRules();
}

void updateSensors() {
  state.temperature = dht.readTemperature();
  state.humidity = dht.readHumidity();
  state.soilMoisture = analogRead(SOIL_MOISTURE_PIN);
  
  // Send to database
  sendToDatabase();
}

void checkAutomationRules() {
  // Example: Auto-irrigation based on soil moisture
  if (state.soilMoisture < MOISTURE_THRESHOLD && !state.relay1) {
    setRelay(1, true);
    Serial.println("Auto-irrigation activated");
  }
  
  // Example: Turn off after watering period
  if (state.relay1 && (millis() - irrigationStartTime > IRRIGATION_DURATION)) {
    setRelay(1, false);
    Serial.println("Auto-irrigation stopped");
  }
}
```

### Web Server Implementation

```cpp
void setupWebServer() {
  // Serve main dashboard
  server.on("/", HTTP_GET, handleRoot);
  
  // API endpoints
  server.on("/api/status", HTTP_GET, handleGetStatus);
  server.on("/api/relay", HTTP_POST, handleSetRelay);
  server.on("/api/data", HTTP_GET, handleGetData);
  
  // Not found handler
  server.onNotFound(handleNotFound);
}

void handleGetStatus() {
  DynamicJsonDocument doc(1024);
  
  doc["relays"]["relay1"] = state.relay1;
  doc["relays"]["relay2"] = state.relay2;
  doc["relays"]["relay3"] = state.relay3;
  
  doc["sensors"]["temperature"] = state.temperature;
  doc["sensors"]["humidity"] = state.humidity;
  doc["sensors"]["soilMoisture"] = state.soilMoisture;
  
  doc["system"]["uptime"] = millis() / 1000;
  doc["system"]["freeHeap"] = ESP.getFreeHeap();
  doc["system"]["rssi"] = WiFi.RSSI();
  
  String response;
  serializeJson(doc, response);
  
  server.send(200, "application/json", response);
}

void handleSetRelay() {
  if (!server.hasArg("plain")) {
    server.send(400, "text/plain", "Body not received");
    return;
  }
  
  DynamicJsonDocument doc(256);
  DeserializationError error = deserializeJson(doc, server.arg("plain"));
  
  if (error) {
    server.send(400, "text/plain", "Invalid JSON");
    return;
  }
  
  int relay = doc["relay"];
  bool state = doc["state"];
  
  setRelay(relay, state);
  
  server.send(200, "application/json", "{\"success\":true}");
}

void setRelay(int relay, bool state) {
  switch(relay) {
    case 1:
      digitalWrite(RELAY1_PIN, state ? HIGH : LOW);
      state.relay1 = state;
      break;
    case 2:
      digitalWrite(RELAY2_PIN, state ? HIGH : LOW);
      state.relay2 = state;
      break;
    case 3:
      digitalWrite(RELAY3_PIN, state ? HIGH : LOW);
      state.relay3 = state;
      break;
  }
  
  logRelayChange(relay, state);
}
```

## Web Dashboard (HTML/CSS/JavaScript)

```html
<!DOCTYPE html>
<html>
<head>
  <title>AgrIoT Dashboard</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    }
    
    .header {
      text-align: center;
      margin-bottom: 30px;
      color: #333;
    }
    
    .sensor-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .sensor-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
    }
    
    .sensor-value {
      font-size: 2.5em;
      font-weight: bold;
      margin: 10px 0;
    }
    
    .relay-controls {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }
    
    .relay-button {
      padding: 15px;
      border: none;
      border-radius: 10px;
      font-size: 1.1em;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .relay-on {
      background: #4CAF50;
      color: white;
    }
    
    .relay-off {
      background: #f44336;
      color: white;
    }
    
    #chart {
      margin-top: 30px;
      height: 300px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌱 AgrIoT Dashboard</h1>
      <p>Smart Agricultural Control System</p>
    </div>
    
    <div class="sensor-grid">
      <div class="sensor-card">
        <h3>🌡️ Temperature</h3>
        <div class="sensor-value" id="temperature">--</div>
        <p>°C</p>
      </div>
      
      <div class="sensor-card">
        <h3>💧 Humidity</h3>
        <div class="sensor-value" id="humidity">--</div>
        <p>%</p>
      </div>
      
      <div class="sensor-card">
        <h3>🌱 Soil Moisture</h3>
        <div class="sensor-value" id="soilMoisture">--</div>
        <p>%</p>
      </div>
    </div>
    
    <h2>Control Relays</h2>
    <div class="relay-controls">
      <button class="relay-button relay-off" id="relay1" onclick="toggleRelay(1)">
        Irrigation Pump: OFF
      </button>
      <button class="relay-button relay-off" id="relay2" onclick="toggleRelay(2)">
        Ventilation: OFF
      </button>
      <button class="relay-button relay-off" id="relay3" onclick="toggleRelay(3)">
        Lighting: OFF
      </button>
    </div>
    
    <div id="chart"></div>
  </div>
  
  <script>
    let relayStates = [false, false, false];
    
    // Fetch status every 2 seconds
    setInterval(updateStatus, 2000);
    updateStatus();
    
    async function updateStatus() {
      try {
        const response = await fetch('/api/status');
        const data = await response.json();
        
        // Update sensor displays
        document.getElementById('temperature').textContent = 
          data.sensors.temperature.toFixed(1);
        document.getElementById('humidity').textContent = 
          data.sensors.humidity.toFixed(0);
        document.getElementById('soilMoisture').textContent = 
          Math.round((data.sensors.soilMoisture / 4095) * 100);
        
        // Update relay buttons
        updateRelayButtons(data.relays);
        
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    }
    
    function updateRelayButtons(relays) {
      for (let i = 1; i <= 3; i++) {
        const button = document.getElementById(`relay${i}`);
        const isOn = relays[`relay${i}`];
        
        button.className = `relay-button ${isOn ? 'relay-on' : 'relay-off'}`;
        button.textContent = button.textContent.replace(/ON|OFF/, isOn ? 'ON' : 'OFF');
        relayStates[i-1] = isOn;
      }
    }
    
    async function toggleRelay(relayNum) {
      const newState = !relayStates[relayNum-1];
      
      try {
        const response = await fetch('/api/relay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ relay: relayNum, state: newState })
        });
        
        if (response.ok) {
          relayStates[relayNum-1] = newState;
          updateStatus();
        }
      } catch (error) {
        console.error('Error toggling relay:', error);
        alert('Failed to toggle relay');
      }
    }
  </script>
</body>
</html>
```

---

# PCB Design

## Schematic Features
- ESP32 DevKit mounting
- 4-channel relay module connection
- Sensor input terminals (analog + digital)
- Power regulation (3.3V, 5V)
- Protection circuits (ESD, overcurrent)
- Status LEDs

## PCB Layout
- 2-layer design for cost efficiency
- Screw terminals for field wiring
- Proper trace width for current handling
- Ground plane for noise reduction

---

# Database Integration

```python
# Python script for data logging
import mysql.connector
from datetime import datetime
import requests

def log_sensor_data(device_id, temperature, humidity, soil_moisture):
    """Log sensor data to MySQL database"""
    conn = mysql.connector.connect(
        host="localhost",
        user="agriot_user",
        password="password",
        database="agriot_db"
    )
    
    cursor = conn.cursor()
    
    query = """
    INSERT INTO sensor_readings 
    (device_id, timestamp, temperature, humidity, soil_moisture)
    VALUES (%s, %s, %s, %s, %s)
    """
    
    values = (device_id, datetime.now(), temperature, humidity, soil_moisture)
    
    cursor.execute(query, values)
    conn.commit()
    
    cursor.close()
    conn.close()

def get_device_status(device_id):
    """Fetch current device status from ESP32"""
    response = requests.get(f"http://{device_ip}/api/status")
    return response.json()
```

---

# Features & Capabilities

## Automation Rules
- Time-based scheduling
- Sensor-triggered actions
- Threshold-based alerts
- Custom logic programming

## Monitoring
- Real-time sensor dashboard
- Historical data visualization
- System health monitoring
- Network connectivity status

## Safety Features
- Automatic shutoff on errors
- Overcurrent protection
- Temperature limits
- Manual override capability

---

# Applications

- 🌾 **Agricultural Irrigation**: Automated watering based on soil moisture
- 🏠 **Home Automation**: Control lights, fans, appliances
- 🌡️ **Greenhouse Management**: Temperature and humidity control
- 💧 **Water Pumping**: Automated water level management
- ⚡ **Energy Management**: Load scheduling and monitoring

---

# Technical Stack

**Hardware**:
- ESP32/ESP8266 microcontrollers
- Relay modules
- Various sensors (DHT22, soil moisture, etc.)
- Custom PCB design

**Software**:
- C/C++ (Arduino framework)
- HTML/CSS/JavaScript (Web interface)
- Python (Data logging)
- MySQL (Database)

**Tools**:
- PlatformIO / Arduino IDE
- KiCad (PCB design)
- Fusion360 (3D enclosure design)
- Git version control

---

# Repository

📦 **GitHub**: [AgrIoT-Smart-Motor-Control](https://github.com/SLopezBegines/AgrIoT-Smart-Motor-Control)

---

# Future Enhancements

- [ ] Mobile app (Android/iOS)
- [ ] Cloud integration (AWS IoT, Google Cloud)
- [ ] Machine learning for predictive irrigation
- [ ] Solar power option
- [ ] LoRaWAN for long-range communication
- [ ] Multi-device management dashboard

---

[← Back to Projects](/index.html#projects)
