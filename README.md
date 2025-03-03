# VenueFlow

## Overview
VenueFlow is an **AI-powered crowd flow monitoring system** designed to enhance **safety, efficiency, and situational awareness** in high-traffic venues. Leveraging **real-time video analytics**, VenueFlow detects congestion, generates alerts, and integrates seamlessly with NX Meta and related services.

## Key Features
- **Real-Time Crowd Monitoring** – Tracks foot traffic and movement patterns using AI-powered analytics.
- **Intuitive Node-Based UI** – Provides a **venue-specific overview**, improving situational awareness over traditional grid layouts.
- **Automated Alerts & Faster Response** – Notifies staff instantly of congestion or safety concerns, enabling quicker decision-making.
- **Seamless NX Integration** – Works with **NX Toolkit, NX AI Manager Plugin**, and NX Cloud for easy deployment.
- **Scalability & Flexibility** – Adaptable to venues of any size, with support for additional cameras and AI models.
- **Future-Ready Safety Features** – Can integrate **fire and smoke detection (YOLOv8-Fire-and-Smoke-Detection)** and historical playback for improved risk management.

## How It Works
VenueFlow follows a **three-step process**:
1. **Monitor** – Uses NX Toolkit API for authentication, retrieves camera feeds, and displays them in an **interactive node-based UI**.
2. **Detect** – AI-powered analysis via **NX AI Manager Plugin** and YOLO v11 model detects crowd congestion, sending real-time alerts.
3. **Act** – Alerts are sent via **Sentry App** through mobile QR code integration, enabling rapid on-site response.

## Future Enhancements
- **Fire & Smoke Detection** – Integrate YOLOv8-Fire-and-Smoke-Detection for early hazard warnings.
- **Playback Viewer** – Analyze historical crowd data to optimize venue layouts and evacuation plans.
- **Predictive Analytics** – Leverage AI for proactive congestion and emergency planning.

## Installation
Pre-requisties : Nx Meta server and client installed. Nx AI Manager plugin installed and running.

1. Follow the instructions in the VenueFlow-webapp folder to install and run the NextJS app locally in a browser
2. Follow the instructions in the VenueFlow-Postprocessor to install the VenueFlow-Postprocessor
3. The Postprocessor also works with the demo object detector, but you can install the YoloV11 model provided if so desired
4. If setup was successful, assigning the appropriate model and postprocessor will show bounding boxes in NxMeta and start streaming the data to VenueFlow as well

   Known Issues:
   - The API calls to the Server API seem to sporadically return a CORS error. This seems to fix itself over time, no other specific fix is known.
   - If the postprocessor doesn't work, delete the build folder created during it's installation and try again. Check the log files for further details if needed.
     

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss improvements.

## License
[MIT License](LICENSE)

